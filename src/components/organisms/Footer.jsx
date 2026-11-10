import Icon from '../atoms/Icon'
import SocialLinks from '../molecules/SocialLinks'
import { profile } from '../../data/profile'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="label">
          © {new Date().getFullYear()} {profile.name} · Built with React, deployed on Vercel
        </p>
        <SocialLinks />
        <a className="footer__top label" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          Back to top <Icon name="up" size={14} />
        </a>
      </div>
    </footer>
  )
}
