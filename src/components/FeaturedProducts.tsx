import { Link } from 'react-router-dom'
import { products } from '../data/catalog'
import ProductCard from './ProductCard'

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.badge).slice(0, 4)

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 className="section-title">Featured products</h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>Our most-loved appliances, picked by Uneva owners.</p>
          </div>
          <Link to="/products" className="btn btn-ghost">See all products</Link>
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', marginTop: 32 }}>
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
