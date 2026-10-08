import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "../lib/metaPixel";

// This site is a single-page app: the browser only loads index.html once,
// and React Router swaps pages without a real page load. The pixel's own
// PageView would therefore fire only once. This component fires a PageView
// on first load and on every route change so Meta sees each page visit.
export default function MetaPixelTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Don't track the internal admin area.
    if (pathname.startsWith("/admin")) return;
    trackEvent("PageView");
  }, [pathname]);

  return null;
}
