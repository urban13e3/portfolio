import { useEffect, useRef, useState } from 'react'

/**
 * DotMark — an interactive stippled mark drawn on a <canvas>.
 *
 * 1. A mask is painted offscreen (the "KA" monogram, or a photo if `src` is passed).
 * 2. Random points are kept where the mask is dark → a stipple effect.
 * 3. Every point gets a little depth (z), so it can be rotated in 3D.
 * 4. Drag to spin it; the dots also scatter away from the cursor and spring back.
 *
 * To use a photo instead of the monogram: <DotMark src="/me.jpg" />
 */

const POINTS = 3400
const MASK = 380

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

async function paintMask(g, { text, src }) {
  g.fillStyle = '#fff'
  g.fillRect(0, 0, MASK, MASK)

  if (src) {
    const img = await loadImage(src)
    const s = Math.max(MASK / img.width, MASK / img.height)
    const w = img.width * s
    const h = img.height * s
    g.drawImage(img, (MASK - w) / 2, (MASK - h) / 2, w, h)
    return 'photo'
  }

  try {
    await document.fonts.load(`400 200px "Instrument Serif"`)
  } catch {
    /* fall back to the serif stack */
  }
  g.fillStyle = '#000'
  g.strokeStyle = '#000'
  g.lineJoin = 'round'
  g.lineWidth = MASK * 0.022
  // shrink the font until the text fits the mask with a small margin
  let fs = MASK * 0.95
  g.font = `400 ${fs}px "Instrument Serif", Georgia, serif`
  while (g.measureText(text).width > MASK * 0.92 && fs > 20) {
    fs -= 8
    g.font = `400 ${fs}px "Instrument Serif", Georgia, serif`
  }
  g.textAlign = 'center'
  g.textBaseline = 'alphabetic'
  const m = g.measureText(text)
  const y = MASK / 2 + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2
  g.fillText(text, MASK / 2, y)
  g.strokeText(text, MASK / 2, y)
  return 'text'
}

async function buildPoints(opts) {
  const c = document.createElement('canvas')
  c.width = c.height = MASK
  const g = c.getContext('2d', { willReadFrequently: true })
  const mode = await paintMask(g, opts)
  const { data } = g.getImageData(0, 0, MASK, MASK)

  const pts = []
  let tries = 0
  while (pts.length < POINTS && tries < POINTS * 160) {
    tries++
    const px = (Math.random() * MASK) | 0
    const py = (Math.random() * MASK) | 0
    const i = (py * MASK + px) * 4
    const lum = (data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11) / 255
    const dark = 1 - lum
    const keep = mode === 'text' ? dark > 0.5 : dark > 0.12 && Math.random() < dark * dark * 1.4
    if (!keep) continue
    pts.push({
      x: (px / MASK) * 2 - 1,
      y: (py / MASK) * 2 - 1,
      z: (Math.random() - 0.5) * (mode === 'text' ? 0.34 : 0.18),
      ox: 0,
      oy: 0,
      vx: 0,
      vy: 0,
      accent: Math.random() < 0.16,
      r: 0.7 + Math.random() * 0.9,
    })
  }
  return pts
}

export default function DotMark({ text = 'KA', src, label = 'Interactive dotted monogram: KA' }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const css = getComputedStyle(document.documentElement)
    const INK = css.getPropertyValue('--ink').trim() || '#242424'
    const ACCENT = css.getPropertyValue('--brown').trim() || '#6b4226'

    let pts = []
    let size = 0
    let dpr = 1
    let raf = 0
    let visible = true
    let alive = true

    // interaction state
    let angle = 0
    let spin = 0
    let dragging = false
    let lastX = 0
    const mouse = { x: 0, y: 0, on: false }

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      size = rect.width
      canvas.width = Math.round(size * dpr)
      canvas.height = Math.round(size * dpr)
    }

    const frame = (t) => {
      if (!alive) return
      raf = requestAnimationFrame(frame)
      if (!visible || !pts.length) return

      // rotation: free spin while dragging / coasting, then ease back to a gentle sway
      if (dragging) {
        angle += spin
      } else {
        angle += spin
        spin *= 0.94
        const sway = reduce ? 0 : Math.sin(t / 1800) * 0.38
        const target = Math.round(angle / (Math.PI * 2)) * Math.PI * 2 + sway
        angle += (target - angle) * 0.045
      }
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, size, size)
      const half = size / 2
      const scale = half * 0.82
      const R = 0.26

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        // 3D rotate around the Y axis + simple perspective
        const rx = p.x * cos + p.z * sin
        const rz = -p.x * sin + p.z * cos
        const persp = 1 / (1 - rz * 0.55)

        // cursor repulsion (in normalised space) with spring back
        let sx = rx * persp + p.ox
        let sy = p.y * persp + p.oy
        if (mouse.on) {
          const dx = sx - mouse.x
          const dy = sy - mouse.y
          const d = Math.hypot(dx, dy)
          if (d < R && d > 0.0001) {
            const f = (1 - d / R) ** 2 * 0.05
            p.vx += (dx / d) * f
            p.vy += (dy / d) * f
          }
        }
        p.vx += -p.ox * 0.06
        p.vy += -p.oy * 0.06
        p.vx *= 0.86
        p.vy *= 0.86
        p.ox += p.vx
        p.oy += p.vy
        sx = rx * persp + p.ox
        sy = p.y * persp + p.oy

        const depth = (rz + 0.25) / 0.5 // ~0..1
        ctx.globalAlpha = Math.min(1, Math.max(0.28, 0.35 + depth * 0.65))
        ctx.fillStyle = p.accent ? ACCENT : INK
        ctx.beginPath()
        ctx.arc(half + sx * scale, half + sy * scale, p.r * persp * (size / 380 + 0.35), 0, 6.2832)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const toNorm = (e) => {
      const rect = canvas.getBoundingClientRect()
      const half = rect.width / 2
      mouse.x = (e.clientX - rect.left - half) / (half * 0.82)
      mouse.y = (e.clientY - rect.top - half) / (half * 0.82)
    }

    const onDown = (e) => {
      dragging = true
      lastX = e.clientX
      canvas.setPointerCapture?.(e.pointerId)
      setTouched(true)
    }
    const onMove = (e) => {
      toNorm(e)
      mouse.on = true
      if (dragging) {
        const dx = e.clientX - lastX
        lastX = e.clientX
        spin = dx * 0.011
        angle += 0 // spin applied in frame()
      }
    }
    const onUp = (e) => {
      dragging = false
      canvas.releasePointerCapture?.(e.pointerId)
    }
    const onLeave = () => {
      mouse.on = false
    }

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)
    canvas.addEventListener('pointerleave', onLeave)

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(wrap)

    resize()
    buildPoints({ text, src }).then((p) => {
      if (!alive) return
      pts = p
      raf = requestAnimationFrame(frame)
    })

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [text, src])

  return (
    <div className="dotmark" ref={wrapRef}>
      <canvas ref={canvasRef} role="img" aria-label={label} />
      <span className={`dotmark__hint label${touched ? ' is-hidden' : ''}`} aria-hidden="true">
        ← drag me →
      </span>
    </div>
  )
}
