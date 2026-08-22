import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import SiteBackground from './components/SiteBackground'
import CommunityPopup from './components/CommunityPopup'
import Home from './pages/Home'
import AlgoTrading from './pages/AlgoTrading'
import CoursesTelegram from './pages/CoursesTelegram'
import InfluencerManagement from './pages/InfluencerManagement'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

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

export default function App() {
  return (
    <>
      <ScrollToTop />
      {/* Rendered once at the app root (not inside SiteLayout) so it
          mounts a single time per session instead of re-triggering on
          every client-side route change. */}
      <CommunityPopup />
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
    </>
  )
}
