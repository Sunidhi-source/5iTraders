// Tiny safe wrapper around the Meta Pixel (window.fbq).
// If the pixel is blocked (ad-blocker, privacy browser) or hasn't loaded,
// these functions silently do nothing, so the site never breaks because of it.

export function trackEvent(name, params) {
  try {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", name, params);
    }
  } catch (_) {
    /* never let tracking break the app */
  }
}

export function trackCustomEvent(name, params) {
  try {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("trackCustom", name, params);
    }
  } catch (_) {
    /* never let tracking break the app */
  }
}
