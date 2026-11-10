import SectionHead from '../molecules/SectionHead'
import ExperienceItem from '../molecules/ExperienceItem'
import { experience } from '../../data/profile'

export default function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="container">
        <SectionHead index="02" label="Experience" title="Where I’ve been learning on the job." />
        <ol className="xp-list">
          {experience.map((item, i) => (
            <ExperienceItem key={item.org} item={item} delay={i * 80} />
          ))}
        </ol>
      </div>
    </section>
  )
}
