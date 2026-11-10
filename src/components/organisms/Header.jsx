import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from '../atoms/Icon'
import { profile } from '../../data/profile'

const nav = [
  { to: '/#about', label: 'About' },
  { to: '/#experience', label: 'Experience' },
  { to: '/#projects', label: 'Projects' },
  { to: '/#contact', label: 'Contact' },
]

export default function Header({ onOpenPalette }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}${open ? ' header--open' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="brand" aria-label={`${profile.name} — home`}>
          <span className="brand__mark">KA</span>
          <span className="brand__name">{profile.name}</span>
        </Link>

        <nav className="nav" id="primary-nav" aria-label="Primary">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className="nav__link">
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__tools">
          <button type="button" className="palette-btn" onClick={onOpenPalette} aria-label="Open quick menu">
            <span className="kbd">{isMac ? '⌘' : 'Ctrl'} K</span>
          </button>
          <a className="btn btn--solid header__cta" href={`mailto:${profile.email}`}>
            Get in touch
          </a>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}
