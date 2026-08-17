import { useNavigate, useLocation } from 'react-router-dom'

// Smooth-scrolls to a section id. If we're not on the home route, it
// navigates home first and scrolls after the page has mounted.
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) {
    const headerOffset = 88
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export function useSectionNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return function goToSection(id) {
    if (location.pathname === '/') {
      scrollToId(id)
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }
}
