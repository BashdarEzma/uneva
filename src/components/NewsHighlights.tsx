import { Link } from 'react-router-dom'
import { news } from '../data/catalog'
import './NewsHighlights.css'

export default function NewsHighlights() {
  return (
    <section className="section news-section">
      <div className="container">
        <div className="news-head">
          <div>
            <h2 className="section-title">News & stories</h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>The latest from the world of Uneva.</p>
          </div>
          <Link to="/about" className="btn btn-ghost">View all stories</Link>
        </div>
        <div className="news-grid">
          {news.map((n) => (
            <article key={n.id} className="news-card">
              <div className="news-thumb">
                <img src={n.image} alt={n.title} loading="lazy" />
              </div>
              <div className="news-body">
                <span className="news-tag">{n.category}</span>
                <h3>{n.title}</h3>
                <span className="news-date">{n.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
