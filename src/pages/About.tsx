import BrandStorySlides from '../components/BrandStorySlides'
import './About.css'

const stats = [
  { value: '40M+', label: 'Homes served worldwide' },
  { value: '60+', label: 'Countries & regions' },
  { value: '12', label: 'R&D centers' },
  { value: 'A+++', label: 'Energy-rated lineup' }
]

const values = [
  { title: 'Engineering first', text: 'We obsess over picture quality, cooling efficiency and motor longevity so every product simply works — for years.' },
  { title: 'Designed for people', text: 'Intuitive interfaces and quiet performance mean technology fades into the background of everyday life.' },
  { title: 'Built to last', text: 'Durable components, repairable designs and long warranties reduce waste and total cost of ownership.' }
]

export default function About() {
  return (
    <div className="fade-in about-page">
      <div className="about-hero">
        <div className="container">
          <span className="hero-eyebrow">Our Story</span>
          <h1>Technology that makes home better</h1>
          <p>Uneva designs and builds smart televisions and home appliances that bring cinema-grade picture, reliable comfort and effortless care to modern living.</p>
        </div>
      </div>

      <section className="section">
        <div className="container about-stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section brand-story" id="brand-story" style={{ scrollMarginTop: '84px' }}>
        <div className="container">
          <span className="hero-eyebrow">Brand story</span>
          <h2>A name engineered from a circuit</h2>
          <p className="brand-story-lead">
            Uneva is a technology brand built on electronics know-how. Its identity was crafted with Brand Lounge, a
            Dubai brand consultancy, around a single idea — differentiation you can read at a glance.
          </p>

          <div className="brand-story-grid">
            <div className="brand-story-block">
              <h3>The concept</h3>
              <p>
                The Uneva logo is inspired by the <strong>electrical symbolism found in schematic circuit diagrams</strong> —
                the same drawings engineers use for the design, construction and maintenance of electrical and electronic
                equipment. It roots the brand in the discipline of real engineering.
              </p>
            </div>
            <div className="brand-story-block">
              <h3>Built letter by letter</h3>
              <p>
                Each letter of <strong>U&#8209;N&#8209;E&#8209;V&#8209;A</strong> is constructed from a circuit element —
                the looping coil of an inductor, the parallel bars of a capacitor, the zig-zag of a resistor. Assembled,
                they resolve into one continuous wordmark that quite literally reads like a circuit.
              </p>
            </div>
            <div className="brand-story-block">
              <h3>The colour: silver</h3>
              <p>
                The palette is silver — <strong>high-tech, elegant, sleek and industrial</strong>. It carries from the
                embossed mark on paper to brushed-metal storefront signage, and onto the products themselves.
              </p>
            </div>
          </div>

          <BrandStorySlides />
        </div>
      </section>

      <section className="section about-values">
        <div className="container">
          <h2 className="section-title">What we stand for</h2>
          <p className="section-sub">Three principles guide every product decision at Uneva.</p>
          <div className="values-grid">
            {values.map((v) => (
              <div key={v.title} className="value-card">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-mission">
          <h2>Our mission</h2>
          <p>
            We believe great technology should be accessible, dependable and beautifully simple. From our ULED picture
            engine to our inverter-driven cooling, every Uneva innovation exists to make daily life a little sharper,
            quieter and more efficient. We are committed to sustainable manufacturing and to building products people keep,
            not replace.
          </p>
        </div>
      </section>
    </div>
  )
}
