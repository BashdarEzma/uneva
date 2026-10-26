import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data/catalog'
import { flagUrl, type Country } from '../data/countries'
import { validateWarranty, type WarrantyResult } from '../data/warranty'
import './Warranty.css'

interface WarrantyProps {
  country: Country
}

// Small illustrated tiles showing where the MODEL.SUFFIX label sits on each
// product type — a lightweight stand-in for the photo grid.
const labelSpots: { icon: string; place: string }[] = [
  { icon: '📺', place: 'TV — back panel' },
  { icon: '❄️', place: 'Refrigerator — inside wall' },
  { icon: '🌀', place: 'Washing Machine — door frame' },
  { icon: '🍽️', place: 'Dishwasher — inner door edge' },
  { icon: '💨', place: 'Air Conditioner — side sticker' },
  { icon: '📦', place: 'Packaging — barcode label' },
]

function monthsToLabel(m: number): string {
  if (m % 12 === 0) {
    const y = m / 12
    return `${y} year${y > 1 ? 's' : ''}`
  }
  return `${m} months`
}

export default function Warranty({ country }: WarrantyProps) {
  const [productId, setProductId] = useState('')
  const [model, setModel] = useState('')
  const [suffix, setSuffix] = useState('')
  const [result, setResult] = useState<WarrantyResult | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setResult(validateWarranty(model, suffix))
    setSubmitted(true)
  }

  const reset = () => {
    setProductId('')
    setModel('')
    setSuffix('')
    setResult(null)
    setSubmitted(false)
  }

  return (
    <div className="fade-in warranty-page">
      <div className="warranty-hero">
        <div className="container">
          <h1>Warranty Check</h1>
          <p>Confirm your Uneva product is genuine and see its warranty coverage in seconds.</p>
        </div>
      </div>

      <div className="container warranty-body">
        {/* STEP 1 -------------------------------------------------------- */}
        <section className="warranty-step">
          <h2 className="warranty-step-title">
            <span className="step-num">STEP 1</span> Select Your Product, Key-In Model and Suffix
          </h2>

          <div className="warranty-grid">
            {/* Left: form */}
            <form className="warranty-form" onSubmit={onSearch}>
              <label className="w-field">
                <span className="w-label">Country</span>
                <div className="w-country">
                  <img src={flagUrl(country.code)} alt="" width={22} height={15} />
                  <span>{country.name}</span>
                </div>
              </label>

              <label className="w-field">
                <span className="w-label">
                  Products <em>*</em>
                </span>
                <select
                  className="w-input"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Product
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="w-field">
                <span className="w-label">
                  Model <em>*</em>
                </span>
                <input
                  className="w-input"
                  type="text"
                  placeholder="e.g. UN-8WBL"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </label>

              <label className="w-field">
                <span className="w-label">
                  Suffix <em>*</em>
                </span>
                <input
                  className="w-input"
                  type="text"
                  placeholder="e.g. MAXPRO"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  required
                />
              </label>

              <p className="w-note">
                <span className="w-note-icon">!</span>
                This Validation System applies to {country.name} only.
              </p>

              <div className="w-actions">
                <button type="submit" className="btn btn-primary w-search">
                  Search
                </button>
                {submitted && (
                  <button type="button" className="btn btn-ghost" onClick={reset}>
                    Reset
                  </button>
                )}
              </div>
            </form>

            {/* Right: how to find */}
            <aside className="warranty-help">
              <h3>How to Find MODEL.SUFFIX</h3>
              <div className="label-grid">
                {labelSpots.map((s) => (
                  <div key={s.place} className="label-tile">
                    <span className="label-emoji">{s.icon}</span>
                    <span className="label-place">{s.place}</span>
                  </div>
                ))}
              </div>
              <p className="help-caption">
                Select the product to find the <strong>Model.Suffix</strong> on the rating label,
                usually printed near the barcode.
              </p>
            </aside>
          </div>
        </section>

        {/* STEP 2 -------------------------------------------------------- */}
        <section className="warranty-step">
          <h2 className="warranty-step-title">
            <span className="step-num">STEP 2</span> Search Result
          </h2>

          {!submitted && (
            <div className="w-result w-result-empty">
              Enter your model and suffix above, then press <strong>Search</strong> to see the result.
            </div>
          )}

          {submitted && result?.status === 'genuine' && (
            <div className="w-result w-result-ok">
              <div className="w-result-head">
                <span className="w-badge w-badge-ok">✓ Genuine Uneva Product</span>
              </div>
              <div className="w-result-table">
                <div>
                  <span>Model</span>
                  <strong>{result.model.model}.{result.model.suffix}</strong>
                </div>
                <div>
                  <span>Product</span>
                  <strong>{result.model.name}</strong>
                </div>
                <div>
                  <span>Category</span>
                  <strong>{result.model.category}</strong>
                </div>
                <div>
                  <span>Warranty</span>
                  <strong>{monthsToLabel(result.model.warrantyMonths)} limited warranty</strong>
                </div>
                {result.model.compressorMonths && (
                  <div>
                    <span>Motor / Inverter</span>
                    <strong>{monthsToLabel(result.model.compressorMonths)} cover</strong>
                  </div>
                )}
              </div>
              <Link to={`/products/${result.model.categoryId}`} className="w-result-link">
                View this product line →
              </Link>
            </div>
          )}

          {submitted && result?.status === 'model-only' && (
            <div className="w-result w-result-warn">
              <span className="w-badge w-badge-warn">! Suffix not recognised</span>
              <p>
                Model <strong>{result.model.model}</strong> exists, but the suffix “{suffix}” does not
                match a known batch. Please re-check the SUFFIX printed after the dot on the rating label.
              </p>
            </div>
          )}

          {submitted && result?.status === 'not-found' && (
            <div className="w-result w-result-bad">
              <span className="w-badge w-badge-bad">✕ No match found</span>
              <p>
                We couldn’t validate <strong>{model || '—'}.{suffix || '—'}</strong>. Double-check the
                Model and Suffix, or <Link to="/support">contact Uneva support</Link> to verify your product.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
