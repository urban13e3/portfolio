import { useState } from 'react'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import Reveal from '../atoms/Reveal'
import { profile } from '../../data/profile'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const subject = encodeURIComponent('Hello Kolawole — saw your portfolio')

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact__panel">
          <p className="label label--light">
            <span>04</span> — Let’s talk
          </p>
          <h2 id="contact-title">
            Hiring interns, or have a project in mind? <em>Let’s build something.</em>
          </h2>
          <p className="contact__lead">
            I’m open to internships and junior roles from 2027, and happy to chat about freelance or
            collaboration. The fastest way to reach me is email or WhatsApp.
          </p>

          <div className="contact__actions">
            <Button href={`mailto:${profile.email}?subject=${subject}`} variant="solid" icon="mail">
              Hire me — email
            </Button>
            <Button href={profile.whatsapp} variant="light" icon="whatsapp">
              WhatsApp
            </Button>
            <Button href={profile.linkedin} variant="light" icon="linkedin">
              LinkedIn
            </Button>
            <Button href={profile.github} variant="light" icon="github">
              GitHub
            </Button>
          </div>

          <button type="button" className="copy" onClick={copyEmail} aria-live="polite">
            <Icon name={copied ? 'check' : 'copy'} size={16} />
            <span>{copied ? 'Copied to clipboard' : profile.email}</span>
          </button>
        </Reveal>
      </div>
    </section>
  )
}
