// Each entry must be the exact same dynamic import() used by App.jsx's
// React.lazy() calls. Calling import() again here doesn't trigger a
// second network request once it's already resolved once — Vite/the
// browser dedupe by module specifier — so this just lets us kick that
// fetch off *before* someone clicks the link instead of *after*.
const ROUTE_IMPORTS = {
  "/algo": () => import("../pages/AlgoTrading"),
  "/courses": () => import("../pages/CoursesTelegram"),
  "/influencer-management": () => import("../pages/InfluencerManagement"),
  "/pricing": () => import("../pages/PricingPage"),
  "/contact": () => import("../pages/ContactPage"),
};

const alreadyRequested = new Set();

export function prefetchRoute(path) {
  const load = ROUTE_IMPORTS[path];
  if (!load || alreadyRequested.has(path)) return;
  alreadyRequested.add(path);
  load().catch(() => {
    // A failed prefetch (offline, flaky network) just means the normal
    // Suspense fallback handles it when the route is actually visited —
    // no need to surface anything here.
    alreadyRequested.delete(path);
  });
}

export function prefetchAllRoutes() {
  Object.keys(ROUTE_IMPORTS).forEach(prefetchRoute);
}

// Warms every route chunk once the browser is idle after first paint, so
// by the time a visitor clicks around the nav, the code is typically
// already sitting in cache and Suspense never has to show anything.
export function schedulePrefetchWhenIdle() {
  const run = () => prefetchAllRoutes();
  if (typeof window === "undefined") return;
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 3000 });
  } else {
    setTimeout(run, 1500);
  }
}
