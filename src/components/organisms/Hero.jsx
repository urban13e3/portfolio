import DotMark from './DotMark'
import Tag from '../atoms/Tag'
import Button from '../atoms/Button'
import SocialLinks from '../molecules/SocialLinks'
import { profile, intro, stack } from '../../data/profile'

// Splits text into words → letters so each letter can animate in (staggered).
function StackedName({ text }) {
  let n = 0
  return (
    <h1 className="hero__name" aria-label={text}>
      {text.split(' ').map((word, w) => (
        <span className="hero__word" key={w} aria-hidden="true">
          {[...word].map((ch) => (
            <span className="hero__ch" style={{ '--n': n++ }} key={n}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__avail label" id="top">
            <span className="status-dot" /> Open to internships · 2027
          </p>
          <StackedName text={profile.name} />
          <p className="hero__role">
            <em>{profile.role}</em> — Pan-Atlantic University, {profile.location}
          </p>
          <p className="hero__intro">{intro}</p>

          <ul className="taglist" aria-label="Technologies I work with">
            {stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </ul>

          <div className="hero__actions">
            <Button to="/#projects" variant="solid" icon="arrow">
              See my work
            </Button>
            <Button href={`mailto:${profile.email}`} variant="ghost" icon="mail">
              Email me
            </Button>
            <SocialLinks />
          </div>
        </div>

        <div className="hero__art">
          <DotMark text="KA" />
        </div>
      </div>
    </section>
  )
}
