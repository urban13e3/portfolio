import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'
import CommandPalette from '../organisms/CommandPalette'

/** Page template: header → main → footer, plus scroll handling and the ⌘K palette. */
export default function Layout() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const { pathname, hash } = useLocation()

  // scroll to top on route change, or to the #section when one is given
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // wait a frame so the target exists after a route change
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }))
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [pathname, hash])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  )
}
