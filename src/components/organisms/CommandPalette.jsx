import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { profile } from '../../data/profile'
import { projects } from '../../data/projects'

/** ⌘K / Ctrl+K quick menu — jump to any section, project or contact link. */
export default function CommandPalette({ open, onClose }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)

  const actions = useMemo(() => {
    const go = (to) => () => navigate(to)
    const ext = (url) => () => (url.startsWith('mailto') ? (window.location.href = url) : window.open(url, '_blank', 'noopener'))
    return [
      { group: 'Go to', label: 'About', run: go('/#about') },
      { group: 'Go to', label: 'Experience', run: go('/#experience') },
      { group: 'Go to', label: 'Projects', run: go('/#projects') },
      { group: 'Go to', label: 'Contact', run: go('/#contact') },
      ...projects
        .filter((p) => p.detail)
        .map((p) => ({ group: 'Case studies', label: p.name, run: go(`/projects/${p.slug}`) })),
      { group: 'Reach me', label: 'Send an email', run: ext(`mailto:${profile.email}`) },
      { group: 'Reach me', label: 'WhatsApp', run: ext(profile.whatsapp) },
      { group: 'Reach me', label: 'LinkedIn', run: ext(profile.linkedin) },
      { group: 'Reach me', label: 'GitHub', run: ext(profile.github) },
    ]
  }, [navigate])

  const results = actions.filter((a) => a.label.toLowerCase().includes(query.trim().toLowerCase()))

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 20)
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  if (!open) return null

  const choose = (a) => {
    onClose()
    a?.run()
  }

  const onKey = (e) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') choose(results[active])
  }

  let lastGroup = null
  return (
    <div className="palette" role="dialog" aria-modal="true" aria-label="Quick menu" onKeyDown={onKey}>
      <div className="palette__scrim" onClick={onClose} />
      <div className="palette__box">
        <input
          ref={inputRef}
          className="palette__input"
          placeholder="Jump to… (try “projects”)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the site"
        />
        <ul className="palette__list">
          {results.length === 0 && <li className="palette__empty label">Nothing found</li>}
          {results.map((a, i) => {
            const head = a.group !== lastGroup
            lastGroup = a.group
            return (
              <li key={a.group + a.label}>
                {head && <p className="palette__group label">{a.group}</p>}
                <button
                  type="button"
                  className={`palette__item${i === active ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(a)}
                >
                  {a.label}
                  <span aria-hidden="true">↵</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
