import { useNavigate, useLocation } from 'react-router-dom'

// Smooth-scrolls to a section id and returns whether an element was found.
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) {
    const headerOffset = 88
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ top, behavior: 'smooth' })
    return true
  }
  return false
}

// Scrolls to a section that lives on the CURRENT page (e.g. "View
// credentials" -> #mt5-credentials on the Algo Trading page itself). Only
// falls back to navigating home if the section truly isn't on this page —
// previously this always redirected home first, even when the target
// section was right here, which is why buttons like "View credentials"
// appeared to bounce to the homepage instead of just scrolling down.
export function useSectionNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return function goToSection(id) {
    if (scrollToId(id)) return
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } })
    }
  }
}

// Sends the visitor to the dedicated Contact page (/contact) and, if
// provided, prefills the lead form there (e.g. which pricing plan or
// course they picked). Used by every "Choose Plan" / "Enroll" / "Talk to
// us" button across the site so they consistently land on the real
// Contact Us form rather than the homepage.
export function useGoToContact() {
  const navigate = useNavigate()

  return function goToContact(prefill) {
    navigate('/contact', { state: { prefill } })
  }
}
