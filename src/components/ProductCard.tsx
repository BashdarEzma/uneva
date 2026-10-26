import { Link } from 'react-router-dom'
import type { Product } from '../types'
import './ProductCard.css'

export default function ProductCard({ product }: { product: Product }) {
  const eyebrow = product.type ?? product.series
  const detail = product.highlights.slice(0, 2).join(' · ')

  return (
    <Link
      to={`/products/${product.categoryId}/${product.id}`}
      className="product-card"
      aria-label={`${product.name} — view details`}
    >
      <div className="product-visual">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-body">
        {eyebrow && <span className="product-eyebrow">{eyebrow}</span>}
        <h3 className="product-name">{product.name}</h3>
        {detail && <p className="product-desc">{detail}</p>}
      </div>
    </Link>
  )
}
