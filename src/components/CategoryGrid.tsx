import { Link } from 'react-router-dom'
import { optionalImg } from '../data/assets'
import './CategoryGrid.css'

interface Card {
  title: string
  file: string
  to: string
  slot: string // bento position
}

// Curated, self-contained banner images. Drop a replacement into
// src/images/Explore Uneva/ with the same name to swap.
const CARDS: Card[] = [
  { title: 'Floor-Standing AC', file: 'Explore Uneva/AC_1.png', to: '/products/ac?type=Floor Standing', slot: 'explore-a' },
  { title: 'Washing Machines', file: 'Explore Uneva/WM.png', to: '/products/laundry', slot: 'explore-b' },
  { title: 'Televisions', file: 'Explore Uneva/TV.png', to: '/products/tv', slot: 'explore-c' },
  { title: 'Air Conditioners', file: 'Explore Uneva/AC.png', to: '/products/ac', slot: 'explore-d' }
]

export default function CategoryGrid() {
  const cards = CARDS.map((c) => ({ ...c, url: optionalImg(c.file) })).filter(
    (c): c is Card & { url: string } => !!c.url
  )
  if (!cards.length) return null

  return (
    <section className="section">
      <div className="container bento-container">
        <h2 className="section-title">Explore Uneva</h2>
        <p className="section-sub">A curated look across the Uneva range — tap any collection to explore.</p>
        <div className="explore-grid">
          {cards.map((c) => (
            <Link key={c.file} to={c.to} className={`explore-card ${c.slot}`} aria-label={c.title}>
              <img src={c.url} alt={c.title} loading="lazy" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
