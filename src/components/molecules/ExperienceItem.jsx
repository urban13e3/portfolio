import Reveal from '../atoms/Reveal'

export default function ExperienceItem({ item, delay = 0 }) {
  return (
    <Reveal as="li" className="xp" delay={delay}>
      <p className="xp__period label">{item.period}</p>
      <div className="xp__main">
        <h3>{item.org}</h3>
        <p className="xp__role">
          {item.role} <span>· {item.note}</span>
        </p>
        <ul className="xp__points">
          {item.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}
