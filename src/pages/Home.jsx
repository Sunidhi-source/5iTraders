import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import ContactSection from '../components/ContactSection'
import Advantages from '../components/Advantages'
import AlgoSolutions from '../components/AlgoSolutions'
import ProofSection from '../components/ProofSection'
import Experts from '../components/Experts'
import { scrollToId } from '../lib/scrollTo'

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()

  // Handles cross-route nav clicks: e.g. clicking "Pricing" from
  // /admin/login redirects here with state.scrollTo, then scrolls.
  useEffect(() => {
    const target = location.state?.scrollTo
    if (target) {
      const id = setTimeout(() => scrollToId(target), 80)
      navigate('.', { replace: true, state: {} })
      return () => clearTimeout(id)
    }
  }, [location.state, navigate])

  return (
    <>
      <Hero />
      <ContactSection />
      <Advantages />
      <AlgoSolutions />
      <ProofSection />
      <Experts />
    </>
  )
}
