import type { ImgHTMLAttributes } from "react";
import dimensions from "../lib/image-dimensions";

const ASSETS = "/assets/optimized-v1/";
type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; sizes?: string };

/** AVIF responsive images with the original WebP as a fallback. */
export function OptimizedImage({ src, sizes = "(max-width: 520px) 285px, 320px", ...props }: Props) {
  const name = src.replace(ASSETS, "");
  const asset = dimensions[name];
  const mockup = name === "basic-800.webp" ? "basic" : name === "premium-800.webp" ? "premium" : null;
  const srcSet = mockup
    ? [320, 480, 640, 800].map(width => `${ASSETS}${mockup}-${width}.avif ${width}w`).join(", ")
    : asset?.srcSet;
  if (!srcSet) return <img src={src} {...props} />;
  return (
    <picture style={{ display: "contents" }}>
      <source type="image/avif" srcSet={srcSet} sizes={sizes} />
      <img src={src} width={asset?.width ?? 800} height={asset?.height ?? 800} decoding="async" {...props} />
    </picture>
  );
}
