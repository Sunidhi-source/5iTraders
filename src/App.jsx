import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import SiteBackground from './components/SiteBackground'
import CommunityPopup from './components/CommunityPopup'
import ProtectedRoute from './components/ProtectedRoute'

// Every route below is its own JS chunk (code-split), so a visitor
// landing on "/" only downloads Home's code, not the Admin dashboard,
// the xlsx export library, or every other page on the site. Home is
// still the very first thing requested, so it loads with effectively no
// extra delay; it's the other pages that stop weighing down that first
// visit.
const Home = lazy(() => import('./pages/Home'))
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

// Minimal, near-invisible fallback for the brief moment a chunk is
// fetched on navigation — avoids a jarring blank page without adding a
// heavy spinner component of its own.
function RouteFallback() {
  return <div className="min-h-[40vh]" aria-hidden="true" />
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
