import { useState } from 'react'
import './Newsletter.css'

export default function Newsletter() {
  const [done, setDone] = useState(false)

  return (
    <section className="newsletter-band">
      <div className="container newsletter-inner">
        <div>
          <h2>Join the Uneva community</h2>
          <p>Be first to hear about new products, offers and smart-home tips.</p>
        </div>
        {done ? (
          <p className="newsletter-done">✓ You’re subscribed — welcome to Uneva!</p>
        ) : (
          <form className="newsletter-band-form" onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
            <input type="email" placeholder="Enter your email" aria-label="Email address" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  )
}
