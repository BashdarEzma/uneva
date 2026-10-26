import { Link } from 'react-router-dom'
import './PromoStrip.css'

export default function PromoStrip() {
  return (
    <section className="promo-banner">
      <div className="container promo-banner-inner">
        <div>
          <h2>Build your smart home with Uneva</h2>
          <p>Bundle a Vision TV with FreshZone and ClimaSmart appliances and save up to 20%.</p>
        </div>
        <Link to="/products" className="btn btn-primary">Start a bundle</Link>
      </div>
    </section>
  )
}
