export default function Tag({ children, dark = false }) {
  return <li className={`tag${dark ? ' tag--dark' : ''}`}>{children}</li>
}
