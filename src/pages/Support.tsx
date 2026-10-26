import { useState } from 'react'
import './Support.css'

const faqs = [
  { q: 'How do I register my Uneva product?', a: 'Sign in to your Uneva account, open the Support hub and select “Register a Product”. Enter the model and serial number found on the back-panel sticker to activate your warranty.' },
  { q: 'What does the warranty cover?', a: 'Vision and FreshZone lines include a 3-year limited warranty covering manufacturing defects. ClimaSmart and PureCare lines include 2 years on parts and 5 years on the inverter compressor/motor.' },
  { q: 'How do I update UnevaOS on my TV?', a: 'Go to Settings → System → Software Update and choose “Check now”. Keep your TV connected to Wi-Fi for automatic over-the-air updates.' },
  { q: 'Where can I book a repair?', a: 'Use the contact form below or call your regional service line. A certified Uneva technician will be scheduled within 48 hours in most areas.' }
]

export default function Support() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [sent, setSent] = useState(false)

  return (
    <div className="fade-in support-page">
      <div className="support-hero">
        <div className="container">
          <h1>How can we help?</h1>
          <p>Find answers, manage your products and reach the Uneva care team.</p>
        </div>
      </div>

      <div className="container support-layout">
        <section className="support-faq">
          <h2 className="section-title">Frequently asked questions</h2>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={f.q} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className="faq-toggle">{openIndex === i ? '−' : '+'}</span>
                </button>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="support-contact">
          <h2 className="section-title">Contact us</h2>
          {sent ? (
            <div className="contact-success">
              <span className="success-icon">✓</span>
              <p>Thanks! A member of the Uneva care team will reply within one business day.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
              <div className="form-row">
                <input type="text" placeholder="Full name" required />
                <input type="email" placeholder="Email address" required />
              </div>
              <input type="text" placeholder="Product model (optional)" />
              <textarea placeholder="How can we help?" rows={5} required />
              <button type="submit" className="btn btn-primary">Send message</button>
            </form>
          )}
        </section>
      </div>
    </div>
  )
}
