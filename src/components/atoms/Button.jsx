import { Link } from 'react-router-dom'
import Icon from './Icon'

/**
 * One button for the whole site (consistency!).
 * - `to`   → internal router link
 * - `href` → external link / mailto (opens in a new tab if http)
 * - none   → <button>
 */
export default function Button({ to, href, variant = 'ghost', icon, children, ...rest }) {
  const className = `btn btn--${variant}`
  const content = (
    <>
      {icon && <Icon name={icon} size={16} />}
      {children}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={className} {...rest}>
        {content}
      </Link>
    )
  }
  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={className} {...rest}>
      {content}
    </button>
  )
}
