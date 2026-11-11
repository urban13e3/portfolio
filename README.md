# Kolawole Agbolade — Personal Portfolio

**Name:** Kolawole Agbolade
**Matric number:** `23120112006`
**Course:** CSC 419 — Advances in Web, Mobile and Blockchain Development (2026/2027, First Semester)
**Project:** Personal Portfolio Website (Individual)

**Live site:** `https://portfolio-snowy-zeta-opc81woep6.vercel.app`

## What's inside

| Requirement | Where |
|---|---|
| About Me | `src/components/organisms/About.jsx` |
| Projects (3, each with name, description, screenshot, stack, links) | `src/components/organisms/Projects.jsx`, data in `src/data/projects.js` |
| Dedicated project page (route `/projects/:slug`) | `src/pages/ProjectDetail.jsx` |
| Call to action (email, WhatsApp, LinkedIn, GitHub, copy-email) | `src/components/organisms/Contact.jsx` |
| Responsive (mobile / tablet / desktop) | `src/styles/*.css` (fluid type, grid, flexbox, breakpoints at 820px and 900px) |

## Tech

React 19 · React Router · Vite · plain CSS with design tokens (CSS variables) · deployed on Vercel.

## Structure (Atomic Design)

```
src/
  components/
    atoms/       Button, Tag, Icon, Reveal
    molecules/   ProjectCard, ExperienceItem, SocialLinks, SectionHead
    organisms/   Header, Hero, DotMark (canvas), About, Experience, Projects, Contact, Footer, CommandPalette
    templates/   Layout (header → main → footer)
  pages/         Home, ProjectDetail, NotFound
  data/          profile.js, projects.js  ← edit content here
  styles/        tokens → base → atoms → molecules → organisms → pages
```

## Highlights

- **Interactive dot monogram** — a `<canvas>` stipple of "KA" that you can drag to rotate; dots scatter from the cursor. Swap in a photo with `<DotMark src="/me.jpg" />`.
- **⌘K / Ctrl+K quick menu** to jump to any section or project.
- Semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`), skip link, keyboard focus styles, `prefers-reduced-motion` support.

## Run locally

```bash
npm install
npm run dev
```

Build for production: `npm run build` (output in `dist/`).

## Deploy

Push to GitHub, import the repo on Vercel (framework preset: Vite). `vercel.json` rewrites all routes to `index.html` so `/projects/creamy-cakes` works on refresh.
