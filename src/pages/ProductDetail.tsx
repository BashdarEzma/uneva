import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categories, products } from '../data/catalog'
import NotFound from './NotFound'
import '../components/ProductModal.css'

// Small inline icon set for the share / wishlist rail.
const icons = {
  heart: (
    <path d="M12 21s-7.5-4.6-10-9.3C.8 9 1.9 5.7 5 5.1c1.9-.4 3.7.5 4.7 2 .3.4.6.9.8 1.4.2-.5.5-1 .8-1.4 1-1.5 2.8-2.4 4.7-2 3.1.6 4.2 3.9 3 6.6C19.5 16.4 12 21 12 21z" />
  ),
  facebook: <path d="M14 8.5V7c0-.7.3-1 1-1h1.5V3H14c-2.2 0-3.5 1.3-3.5 3.6v1.9H8.5v3h2V21h3.5v-9.5H17l.5-3H14z" />,
  twitter: <path d="M4 4l6.3 8.4L4.4 20h1.9l4.8-5.5L15.4 20H20l-6.6-8.8L19.5 4h-1.9l-4.4 5-3.7-5H4zm2.7 1.4h1.9l9 12.2h-1.9L6.7 5.4z" />,
  linkedin: <path d="M6.9 8.5H4V20h2.9V8.5zM5.4 4A1.7 1.7 0 105.5 7.4 1.7 1.7 0 005.4 4zM20 20v-6.3c0-3.2-1.7-4.7-4-4.7-1.8 0-2.6 1-3.1 1.7V8.5H10V20h2.9v-6c0-1.5.3-3 2.2-3 1.9 0 1.9 1.8 1.9 3.1V20H20z" />,
  email: (
    <path d="M4 5h16c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1zm.9 2 7.1 5 7.1-5H4.9zM19 8.3l-7 4.9-7-4.9V17h14V8.3z" />
  ),
  store:<path d="M4 4h16l1 5c0 1.4-1.1 2.5-2.5 2.5-1 0-1.9-.6-2.3-1.5-.4.9-1.3 1.5-2.3 1.5s-1.9-.6-2.3-1.5c-.4.9-1.3 1.5-2.3 1.5s-1.9-.6-2.3-1.5C6.4 10.9 5.5 11.5 4.5 11.5 3.1 11.5 2 10.4 2 9l2-5zm1 8.9c.5.3 1 .5 1.5.6V20h11v-6.5c.5-.1 1-.3 1.5-.6V20a2 2 0 01-2 2H7a2 2 0 01-2-2v-7.1z" />,
  back: <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  chevron: <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
}

export default function ProductDetail() {
  const { productId } = useParams()
  const product = products.find((p) => p.id === productId)

  const [active, setActive] = useState(0)
  const [wished, setWished] = useState(false)
  const [specsOpen, setSpecsOpen] = useState(false)
  const [zoom, setZoom] = useState({ on: false, origin: 'center' })

  // Magnifier: zoom the main image into wherever the cursor hovers.
  const onZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    setZoom({ on: true, origin: `${x}% ${y}%` })
  }
  const onZoomLeave = () => setZoom((z) => ({ ...z, on: false }))

  if (!product) return <NotFound />

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image]
  const category = categories.find((c) => c.id === product.categoryId)
  const sku = product.models?.[0] ?? product.id.toUpperCase()
  const crumbSeries = product.type ?? product.series

  const share = (network: 'facebook' | 'twitter' | 'linkedin' | 'email') => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`${product.name} — Uneva`)
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=${text}&body=${url}`,
    }
    window.open(links[network], network === 'email' ? '_self' : '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fade-in pd-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pm-crumbs" aria-label="Breadcrumb">
          <Link to="/products">Home Appliances</Link>
          <span className="pm-crumb-sep">/</span>
          {category && (
            <>
              <Link to={`/products/${category.id}`}>{category.name}</Link>
              <span className="pm-crumb-sep">/</span>
            </>
          )}
          {crumbSeries && (
            <>
              {category && product.type ? (
                <Link to={`/products/${category.id}?type=${encodeURIComponent(product.type)}`}>{crumbSeries}</Link>
              ) : (
                <span>{crumbSeries}</span>
              )}
              <span className="pm-crumb-sep">/</span>
            </>
          )}
          <span className="pm-crumb-current">{sku}</span>
        </nav>

        <div className="pm-top">
          {/* Gallery — vertical thumbnail rail + large main image */}
          <div className="pm-gallery">
            {gallery.length > 1 && (
              <div className="pm-thumbs">
                {gallery.map((src, i) => (
                  <button
                    key={src + i}
                    className={`pm-thumb ${i === active ? 'active' : ''}`}
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
            <div className="pm-main-img pm-zoom" onMouseMove={onZoomMove} onMouseLeave={onZoomLeave}>
              {product.badge && <span className="pm-badge">{product.badge}</span>}
              <img
                src={gallery[active]}
                alt={product.name}
                style={{ transformOrigin: zoom.origin, transform: zoom.on ? 'scale(2)' : 'scale(1)' }}
              />
              {gallery.length > 1 && (
                <>
                  <button
                    className="pm-arrow left"
                    onClick={() => setActive((i) => (i - 1 + gallery.length) % gallery.length)}
                    aria-label="Previous image"
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">{icons.back}</svg>
                  </button>
                  <button
                    className="pm-arrow right"
                    onClick={() => setActive((i) => (i + 1) % gallery.length)}
                    aria-label="Next image"
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">{icons.back}</svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Info panel */}
          <div className="pm-intro">
            <div className="pm-intro-head">
              <span className="pm-sku">{sku}</span>
              <div className="pm-share">
                <button
                  className={`pm-icon-btn ${wished ? 'wished' : ''}`}
                  onClick={() => setWished((w) => !w)}
                  aria-pressed={wished}
                  aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">{icons.heart}</svg>
                </button>
                <span className="pm-share-div" />
                {(['facebook', 'twitter', 'linkedin', 'email'] as const).map((n) => (
                  <button key={n} className="pm-icon-btn" onClick={() => share(n)} aria-label={`Share on ${n}`}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">{icons[n]}</svg>
                  </button>
                ))}
              </div>
            </div>

            {product.series && <span className="pm-series">{product.series}</span>}
            <h1 className="pm-name">{product.name}</h1>

            <div className="pm-rating">
              <span className="pm-stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className={i < Math.round(product.rating) ? 'on' : ''}>★</span>
                ))}
              </span>
              <span className="pm-rating-num">{product.rating.toFixed(1)}</span>
              <a className="pm-review-link" href="#reviews" onClick={(e) => e.preventDefault()}>Write a review</a>
            </div>

            <ul className="pm-highlights">
              {product.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            {product.models && product.models.length > 1 && (
              <div className="pm-models">
                <span className="pm-models-label">Available models</span>
                <div className="pm-model-chips">
                  {product.models.map((m) => (
                    <span key={m} className="pm-chip">{m}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="pm-actions">
              <Link to="/support" className="pm-btn pm-btn-primary">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">{icons.store}</svg>
                Contact Sales
              </Link>
            </div>
          </div>
        </div>

        {/* Full specification table — collapsed by default, expands on click */}
        {product.specs && product.specs.length > 0 && (
          <div className="pm-specs" id="specs">
            <button
              className="pm-specs-toggle"
              onClick={() => setSpecsOpen((o) => !o)}
              aria-expanded={specsOpen}
              aria-controls="pm-specs-body"
            >
              <span className="pm-specs-title">Full Specification</span>
              <svg viewBox="0 0 24 24" width="24" height="24" className={`pm-specs-chevron ${specsOpen ? 'open' : ''}`} aria-hidden="true">{icons.chevron}</svg>
            </button>
            {specsOpen && (
              <div id="pm-specs-body" className="pm-specs-body">
                {product.specs.map((grp) => (
                  <div key={grp.group} className="pm-spec-group">
                    <h3 className="pm-group-title">{grp.group}</h3>
                    <table className="pm-spec-table">
                      <tbody>
                        {grp.rows.map((row) => (
                          <tr key={row.label}>
                            <th>{row.label}</th>
                            <td>{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <Link to={category ? `/products/${category.id}` : '/products'} className="pd-back">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">{icons.back}</svg>
          Back to {category?.name ?? 'products'}
        </Link>
      </div>
    </div>
  )
}
