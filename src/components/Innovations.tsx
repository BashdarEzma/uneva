import { innovations } from '../data/catalog'
import './Innovations.css'

export default function Innovations() {
  return (
    <section className="section innovations">
      <div className="container">
        <h2 className="section-title">Technology that works for you</h2>
        <p className="section-sub">Every Uneva product is built on four engineering pillars designed to make daily life sharper, quieter and more efficient.</p>
        <div className="innovation-grid">
          {innovations.map((item) => (
            <div key={item.id} className="innovation-card">
              <div className="innovation-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
