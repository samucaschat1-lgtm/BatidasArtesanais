const STORAGE_KEY = "batidas-checkout-attribution-v1";
let sessionAttribution = "";

function isTrackingParameter(key: string) {
  return key.startsWith("utm_") || [
    "fbclid", "gclid", "gbraid", "wbraid", "ttclid", "msclkid",
    "src", "sck", "xcod", "subid", "subid2", "subid3", "subid4", "subid5",
  ].includes(key);
}

function trackingParameters(search: string) {
  const result = new URLSearchParams();
  new URLSearchParams(search).forEach((value, key) => {
    if (value && isTrackingParameter(key)) result.set(key, value);
  });
  return result;
}

// Never read browser storage during SSR. A new tagged visit replaces the previous
// attribution as a whole, so campaign/ad IDs from different visits cannot mix.
export function captureCheckoutAttribution() {
  if (typeof window === "undefined") return new URLSearchParams();
  const current = trackingParameters(window.location.search);
  if (current.size) {
    sessionAttribution = current.toString();
    try { window.sessionStorage.setItem(STORAGE_KEY, sessionAttribution); } catch { /* Storage may be disabled. */ }
    return current;
  }
  try { sessionAttribution = window.sessionStorage.getItem(STORAGE_KEY) || sessionAttribution; } catch { /* Use in-memory attribution. */ }
  return trackingParameters(sessionAttribution);
}

export function getTrackedCheckoutUrl(checkoutUrl: string, sourceUrl?: string) {
  if (typeof window === "undefined") return checkoutUrl;
  const url = new URL(checkoutUrl);
  // Keep parameters added by the checkout/UTMify. The popup can inherit tracking
  // from the decorated Basic link without inheriting unrelated checkout options.
  if (sourceUrl) {
    trackingParameters(new URL(sourceUrl).search).forEach((value, key) => {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value);
    });
  }
  captureCheckoutAttribution().forEach((value, key) => {
    const existing = url.searchParams.get(key);
    // Preserve UTMify's observed :: content and jLj source suffixes when
    // they belong to the same incoming attribution.
    if (key === "utm_content" && existing?.startsWith(value + "::")) return;
    if (key === "utm_source" && existing?.startsWith(value + "jLj")) return;
    url.searchParams.set(key, value);
  });
  return url.toString();
}
