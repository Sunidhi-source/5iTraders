import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import SiteBackground from './components/SiteBackground'
import CommunityPopup from './components/CommunityPopup'
import ProtectedRoute from './components/ProtectedRoute'
// Home stays a normal, eager import — it's what almost every visitor
// hits first, so it should be part of the initial bundle with zero extra
// network round-trip, not fetched as a separate chunk after the fact.
import Home from './pages/Home'

// Everything past the entry page is code-split, so a visitor doesn't pay
// for the Admin dashboard, the xlsx export library, etc. on their first
// load. To stop that split from ever being felt as a stutter when
// someone actually clicks a nav link, Header prefetches each of these
// chunks in the background the moment the page goes idle (see
// Header.jsx) — so by the time a click happens, the code is usually
// already sitting in the browser's cache and Suspense never even
// engages.
const AlgoTrading = lazy(() => import('./pages/AlgoTrading'))
const CoursesTelegram = lazy(() => import('./pages/CoursesTelegram'))
const InfluencerManagement = lazy(() => import('./pages/InfluencerManagement'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

function SiteLayout({ children }) {
  return (
    <>
      <SiteBackground />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

// Visible (if subtle) top progress bar for the rare case a chunk hasn't
// finished prefetching yet — replaces the old invisible fallback, which
// made a slow connection look like the site had frozen instead of just
// loading.
function RouteFallback() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden bg-transparent" aria-hidden="true">
      <div className="h-full w-1/3 animate-route-loading bg-signal" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      {/* Rendered once at the app root (not inside SiteLayout) so it
          mounts a single time per session instead of re-triggering on
          every client-side route change. */}
      <CommunityPopup />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
          <Route path="/algo" element={<SiteLayout><AlgoTrading /></SiteLayout>} />
          <Route path="/courses" element={<SiteLayout><CoursesTelegram /></SiteLayout>} />
          <Route
            path="/influencer-management"
            element={<SiteLayout><InfluencerManagement /></SiteLayout>}
          />
          <Route path="/pricing" element={<SiteLayout><PricingPage /></SiteLayout>} />
          <Route path="/contact" element={<SiteLayout><ContactPage /></SiteLayout>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  )
}
