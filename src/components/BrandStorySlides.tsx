import { useCallback, useEffect, useState } from 'react'
import { img } from '../data/assets'
import './BrandStorySlides.css'

interface Slide {
  src: string
  title: string
  caption: string
}

const slides: Slide[] = [
  {
    src: img('brand_story/slides/1-concept.png'),
    title: 'The concept',
    caption: 'The identity is inspired by the electrical symbolism used in schematic circuit diagrams.'
  },
  {
    src: img('brand_story/slides/2-moodboard.png'),
    title: 'Moodboard',
    caption: 'Circuits, coils and gauges — the visual language of electronics engineering.'
  },
  {
    src: img('brand_story/slides/3-construction.png'),
    title: 'Logo construction',
    caption: 'Each letter of U-N-E-V-A is built from a circuit element — inductor, capacitor and resistor.'
  },
  {
    src: img('brand_story/slides/4-wordmark.png'),
    title: 'The wordmark',
    caption: 'The elements resolve into a single, continuous mark that reads like a circuit.'
  },
  {
    src: img('brand_story/slides/5-silver.png'),
    title: 'Colour — Silver',
    caption: 'High-tech, elegant, sleek and industrial — a silver palette signals precision.'
  },
  {
    src: img('brand_story/slides/6-material.png'),
    title: 'In material',
    caption: 'Rendered in brushed silver, the mark feels engineered and premium.'
  },
  {
    src: img('brand_story/slides/7-signage.png'),
    title: 'In the world',
    caption: 'From storefront signage to every product, the brand carries one consistent signature.'
  }
]

export default function BrandStorySlides() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [paused])

  const current = slides[index]

  return (
    <div
      className="bs-slides"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="bs-stage">
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.title}
            className={i === index ? 'bs-img active' : 'bs-img'}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}

        <button className="bs-arrow bs-prev" onClick={() => go(index - 1)} aria-label="Previous slide">‹</button>
        <button className="bs-arrow bs-next" onClick={() => go(index + 1)} aria-label="Next slide">›</button>

        <div className="bs-caption">
          <strong>{current.title}</strong>
          <span>{current.caption}</span>
        </div>
      </div>

      <div className="bs-dots">
        {slides.map((s, i) => (
          <button
            key={s.src}
            className={i === index ? 'bs-dot active' : 'bs-dot'}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}: ${s.title}`}
          />
        ))}
      </div>
    </div>
  )
}
