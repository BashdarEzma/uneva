import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { banners } from '../data/catalog'
import './Hero.css'

export default function Hero() {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % banners.length), 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="hero">
      {banners.map((b, i) => (
        <button
          key={b.id}
          className={`hero-slide ${i === active ? 'active' : ''}`}
          onClick={() => navigate(b.link)}
          aria-label="View products"
          tabIndex={i === active ? 0 : -1}
        >
          {b.video ? (
            <video
              className="hero-bg"
              src={b.video}
              poster={b.image}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <img className="hero-bg" src={b.image} alt={b.caption ?? 'Uneva'} />
          )}
          {b.caption && <span className="hero-caption">{b.caption}</span>}
        </button>
      ))}

      {banners.length > 1 && (
        <>
          <button
            className="hero-arrow left"
            aria-label="Previous slide"
            onClick={() => setActive((i) => (i - 1 + banners.length) % banners.length)}
          >‹</button>
          <button
            className="hero-arrow right"
            aria-label="Next slide"
            onClick={() => setActive((i) => (i + 1) % banners.length)}
          >›</button>

          <div className="hero-dots">
            {banners.map((_, i) => (
              <button
                key={i}
                className={i === active ? 'dot active' : 'dot'}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
