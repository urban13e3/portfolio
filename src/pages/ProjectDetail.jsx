import { Link, Navigate, useParams } from 'react-router-dom'
import Button from '../components/atoms/Button'
import Tag from '../components/atoms/Tag'
import Reveal from '../components/atoms/Reveal'
import Contact from '../components/organisms/Contact'
import { getProject, projects } from '../data/projects'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project || !project.detail) return <Navigate to="/404" replace />

  const { name, kind, year, status, stack, live, repo, detail } = project
  const withDetail = projects.filter((p) => p.detail)
  const next = withDetail[(withDetail.findIndex((p) => p.slug === slug) + 1) % withDetail.length]

  return (
    <article className="detail">
      <header className="detail__hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="crumbs label">
            <Link to="/">Home</Link> / <Link to="/#projects">Projects</Link> / <span>{name}</span>
          </nav>
          <h1>{name}</h1>
          <p className="detail__lead">{detail.overview}</p>

          <dl className="detail__meta">
            <div>
              <dt className="label">Type</dt>
              <dd>{kind}</dd>
            </div>
            <div>
              <dt className="label">Year</dt>
              <dd>{year}</dd>
            </div>
            <div>
              <dt className="label">Status</dt>
              <dd>{status}</dd>
            </div>
            <div>
              <dt className="label">Role</dt>
              <dd>Developer</dd>
            </div>
          </dl>

          <div className="detail__actions">
            {live ? (
              <Button href={live} variant="solid" icon="external">
                Visit live site
              </Button>
            ) : (
              <span className="btn btn--ghost" aria-disabled="true">
                Not publicly deployed
              </span>
            )}
            {repo && (
              <Button href={repo} variant="ghost" icon="github">
                View source
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container">
        <Reveal as="figure" className="detail__shot">
          <div className="frame frame--light">
            <div className="frame__bar" aria-hidden="true">
              <i /> <i /> <i />
            </div>
            <img src={detail.screens[0].src} alt={detail.screens[0].alt} />
          </div>
        </Reveal>

        <section className="detail__block" aria-labelledby="problem">
          <Reveal as="h2" id="problem">The problem</Reveal>
          <Reveal as="p" className="detail__prose">{detail.problem}</Reveal>
        </section>

        <section className="detail__block" aria-labelledby="features">
          <Reveal as="h2" id="features">Features</Reveal>
          <ul className="features">
            {detail.features.map((f, i) => (
              <Reveal as="li" key={f} delay={(i % 4) * 60}>
                <span className="label">{String(i + 1).padStart(2, '0')}</span>
                {f}
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="detail__block" aria-labelledby="screens">
          <Reveal as="h2" id="screens">Screenshots</Reveal>
          <div className="gallery">
            {detail.screens.map((s) => (
              <Reveal as="figure" key={s.src}>
                <div className="frame frame--light">
                  <div className="frame__bar" aria-hidden="true">
                    <i /> <i /> <i />
                  </div>
                  <img src={s.src} alt={s.alt} loading="lazy" />
                </div>
                <figcaption className="label">{s.caption}</figcaption>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="detail__block" aria-labelledby="tech">
          <Reveal as="h2" id="tech">Technologies used</Reveal>
          <ul className="taglist">
            {stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </ul>
          <dl className="tech">
            {detail.tech.map(([t, d]) => (
              <Reveal key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        <section className="detail__block" aria-labelledby="learned">
          <Reveal as="h2" id="learned">What I learned</Reveal>
          <ul className="learned">
            {detail.learned.map((l, i) => (
              <Reveal as="li" key={l} delay={i * 70}>
                {l}
              </Reveal>
            ))}
          </ul>
        </section>

        <nav className="detail__next" aria-label="Next project">
          <p className="label">Next case study</p>
          <Link to={`/projects/${next.slug}`} className="arrow-link">
            {next.name} <span>→</span>
          </Link>
        </nav>
      </div>

      <Contact />
    </article>
  )
}
