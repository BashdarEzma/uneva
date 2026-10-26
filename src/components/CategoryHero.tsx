import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { bannerSlides, categories } from '../data/catalog'
import type { CategorySlide } from '../types'
import './CategoryHero.css'

interface CategoryHeroProps {
  categoryId: string // a category id, or 'all'
}

// Cinematic banner slider shown at the top of a category listing page. Banner
// images are auto-discovered from src/images/Slides/<Folder>/; categories with
// no banner yet fall back to a gradient slide built from name + tagline.
export default function CategoryHero({ categoryId }: CategoryHeroProps) {
  const cat = categories.find((c) => c.id === categoryId)
  const discovered = bannerSlides(categoryId)
  const slides: CategorySlide[] =
    discovered.length > 0
      ? discovered
      : [
          {
            id: categoryId,
            eyebrow: cat?.name,
            title: cat?.tagline ?? cat?.name ?? 'Explore the range',
            subtitle: cat ? `Discover the Uneva ${cat.name.toLowerCase()} lineup.` : undefined,
          },
        ]

  const [active, setActive] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const count = slides.length
  const activeIsVideo = !!slides[active]?.video

  // Restart from the first slide whenever the category changes.
  useEffect(() => setActive(0), [categoryId])

  // Image slides auto-advance on a timer; video slides advance when they finish
  // (handled by each video's onEnded), so no timer while a video is playing.
  useEffect(() => {
    if (count < 2 || activeIsVideo) return
    const t = setTimeout(() => setActive((i) => (i + 1) % count), 6000)
    return () => clearTimeout(t)
  }, [active, count, activeIsVideo, categoryId])

  // Play only the active slide's video (from the start); pause the others.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === active) {
        v.currentTime = 0
        void v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [active, count, categoryId])

  const go = (i: number) => setActive((i + count) % count)

  return (
    <section className="cat-hero" aria-roledescription="carousel" aria-label="Category highlights">
      <div className="cat-track" style={{ transform: `translateX(-${active * 100}%)` }}>
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`cat-slide fit-${s.fit ?? 'cover'} ${!s.image && !s.video ? 'no-media' : ''} ${i === active ? 'active' : ''}`}
          aria-hidden={i !== active}
        >
          {s.video ? (
            <video
              className="cat-media"
              ref={(el) => {
                videoRefs.current[i] = el
              }}
              src={s.video}
              poster={s.image}
              autoPlay
              muted
              loop={count < 2}
              playsInline
              preload="auto"
              onEnded={() => {
                // When the active video finishes, advance to the next slide.
                if (i === active) setActive((a) => (a + 1) % count)
              }}
            />
          ) : s.image ? (
            <img className="cat-media" src={s.image} alt="" />
          ) : null}
          {(s.eyebrow || s.title || s.subtitle || (s.cta && s.link)) && (
            <>
              <div className="cat-scrim" />
              <div className="cat-content">
                {s.eyebrow && <span className="cat-eyebrow">{s.eyebrow}</span>}
                {s.title && <h1 className="cat-title">{s.title}</h1>}
                {s.subtitle && <p className="cat-subtitle">{s.subtitle}</p>}
                {s.cta && s.link && (
                  <Link to={s.link} className="btn btn-primary cat-cta">
                    {s.cta}
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      ))}
      </div>

      {slides.length > 1 && (
        <>
          <button className="cat-arrow left" aria-label="Previous slide" onClick={() => go(active - 1)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 5 8 12 15 19" />
            </svg>
          </button>
          <button className="cat-arrow right" aria-label="Next slide" onClick={() => go(active + 1)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 5 16 12 9 19" />
            </svg>
          </button>
          <div className="cat-dots">
            {slides.map((_, i) => (
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
