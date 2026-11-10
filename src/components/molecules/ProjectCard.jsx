import Button from '../atoms/Button'
import Tag from '../atoms/Tag'

/** One project in the stacked “Selected work” list. */
export default function ProjectCard({ project, position }) {
  const { name, index, kind, year, summary, stack, image, live, repo, detail, slug, status } = project
  const inProgress = !image

  return (
    <article className="pcard" style={{ '--i': position }}>
      <div className="pcard__media">
        {image ? (
          <div className="frame">
            <div className="frame__bar" aria-hidden="true">
              <i /> <i /> <i />
            </div>
            <img src={image} alt={`${name} screenshot`} loading="lazy" />
          </div>
        ) : (
          <div className="frame frame--ph" role="img" aria-label="Task Manager is in development, no screenshot yet">
            <div className="frame__bar" aria-hidden="true">
              <i /> <i /> <i />
            </div>
            <div className="ph">
              <span className="ph__row"><b /> <em /></span>
              <span className="ph__row"><b /> <em /></span>
              <span className="ph__row ph__row--done"><b /> <em /></span>
              <span className="ph__row"><b /> <em /></span>
              <p className="label label--light">Screenshots coming soon</p>
            </div>
          </div>
        )}
      </div>

      <div className="pcard__body">
        <p className="label label--light">
          <span>{index}</span> — {kind} · {year}
        </p>
        <h3>{name}</h3>
        <p className="pcard__summary">{summary}</p>
        <p className="pcard__status">
          <span className={`status-dot${inProgress ? ' status-dot--wip' : ''}`} /> {status}
        </p>
        <ul className="taglist" aria-label={`${name} tech stack`}>
          {stack.map((s) => (
            <Tag key={s} dark>
              {s}
            </Tag>
          ))}
        </ul>
        <div className="pcard__actions">
          {detail && (
            <Button to={`/projects/${slug}`} variant="light" icon="arrow">
              Case study
            </Button>
          )}
          {live && (
            <Button href={live} variant="light" icon="external">
              Live site
            </Button>
          )}
          {repo && (
            <Button href={repo} variant="light" icon="github">
              Source
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
