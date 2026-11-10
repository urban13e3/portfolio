import Reveal from '../atoms/Reveal'

export default function SectionHead({ index, label, title, dark = false }) {
  return (
    <Reveal as="header" className={`section-head${dark ? ' section-head--dark' : ''}`}>
      <p className={`label${dark ? ' label--light' : ''}`}>
        <span>{index}</span> — {label}
      </p>
      <h2>{title}</h2>
    </Reveal>
  )
}
