import type { ImgHTMLAttributes } from "react";
import dimensions from "../lib/image-dimensions";

const ASSETS = "/assets/optimized-v1/";
type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; sizes?: string };

/**
 * AVIF responsivo com WebP como fallback.
 * Imagens fora da primeira dobra têm prioridade baixa; o mockup principal
 * continua eager/high para preservar LCP e a aparência do Hero.
 */
export function OptimizedImage({ src, sizes = "(max-width: 520px) 285px, 320px", ...props }: Props) {
  const name = src.startsWith(ASSETS) ? src.slice(ASSETS.length) : "";
  const critical = props.fetchPriority === "high";
  const loading = props.loading ?? (critical ? "eager" : "lazy");
  const fetchPriority = props.fetchPriority ?? (loading === "lazy" ? "low" : "auto");
  const asset = name ? dimensions[name as keyof typeof dimensions] : undefined;
  const mockup = name === "basic-800.webp" ? "basic" : name === "premium-800.webp" ? "premium" : null;
  const srcSet = mockup
    ? [320, 480, 640, 800].map(width => `${ASSETS}${mockup}-${width}.avif ${width}w`).join(", ")
    : asset?.srcSet;
  const image = (
    <img
      src={src}
      width={props.width ?? asset?.width}
      height={props.height ?? asset?.height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      {...props}
    />
  );
  if (!srcSet) return image;
  return (
    <picture style={{ display: "contents" }}>
      <source type="image/avif" srcSet={srcSet} sizes={sizes} />
      {image}
    </picture>
  );
}
