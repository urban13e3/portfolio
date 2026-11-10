import Icon from '../atoms/Icon'
import { profile } from '../../data/profile'

const links = [
  { name: 'github', label: 'GitHub', href: profile.github },
  { name: 'linkedin', label: 'LinkedIn', href: profile.linkedin },
  { name: 'whatsapp', label: 'WhatsApp', href: profile.whatsapp },
  { name: 'mail', label: 'Email', href: `mailto:${profile.email}` },
]

export default function SocialLinks({ dark = false }) {
  return (
    <ul className={`social${dark ? ' social--dark' : ''}`}>
      {links.map((l) => (
        <li key={l.name}>
          <a
            href={l.href}
            aria-label={l.label}
            title={l.label}
            {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          >
            <Icon name={l.name} size={20} />
          </a>
        </li>
      ))}
    </ul>
  )
}
