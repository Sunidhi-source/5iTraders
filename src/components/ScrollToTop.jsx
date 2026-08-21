import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router keeps the browser's scroll position between route changes.
// So if you're scrolled down near the footer and click a header link, the
// new page mounts at that same scroll offset — it looks like it "opens on
// the footer." This resets to the top on every path change, except when
// we're intentionally deep-linking to a section (see useSectionNav, which
// passes location.state.scrollTo and handles its own scrolling).
export default function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) return
    window.scrollTo(0, 0)
  }, [location.pathname, location.state])

  return null
}
