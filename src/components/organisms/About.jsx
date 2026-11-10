import SectionHead from '../molecules/SectionHead'
import Reveal from '../atoms/Reveal'
import { about, focus } from '../../data/profile'

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead index="01" label="About me" title="Curious by default, shipping by habit." />

        <div className="about__grid">
          <div className="about__text">
            {about.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 80}>
                {p}
              </Reveal>
            ))}
          </div>

          <Reveal as="dl" className="about__focus" delay={120}>
            {focus.map((f) => (
              <div key={f.label}>
                <dt className="label">{f.label}</dt>
                <dd>{f.text}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
