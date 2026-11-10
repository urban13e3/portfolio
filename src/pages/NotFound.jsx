import Button from '../components/atoms/Button'

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container">
        <p className="label">404</p>
        <h1>That page doesn’t exist.</h1>
        <p>The link may be old, or I haven’t built it yet.</p>
        <Button to="/" variant="solid" icon="arrow">
          Back home
        </Button>
      </div>
    </section>
  )
}
