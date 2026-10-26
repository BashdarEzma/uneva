import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="fade-in" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: '80px 24px' }}>
      <div>
        <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 24 }}>The page you’re looking for couldn’t be found.</p>
        <Link to="/" className="btn btn-primary">Back to home</Link>
      </div>
    </div>
  )
}
