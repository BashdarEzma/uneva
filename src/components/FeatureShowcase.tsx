import { Link } from 'react-router-dom'
import { showcases } from '../data/catalog'
import './FeatureShowcase.css'

export default function FeatureShowcase() {
  return (
    <section className="section showcase-section">
      <div className="container">
        {showcases.map((s, i) => (
          <div key={s.id} className={`showcase ${i % 2 === 1 ? 'reverse' : ''}`}>
            <div className="showcase-media">
              <img src={s.image} alt={s.title} loading="lazy" />
            </div>
            <div className="showcase-text">
              <span className="showcase-eyebrow">{s.eyebrow}</span>
              <h2>{s.title}</h2>
              <p>{s.description}</p>
              <Link to={s.link} className="btn btn-primary">{s.cta}</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
