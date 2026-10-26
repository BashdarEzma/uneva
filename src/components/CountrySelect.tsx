import { useMemo, useState } from 'react'
import { regions, flagUrl, type Country } from '../data/countries'
import logoUrl from '../images/logo.png'
import './CountrySelect.css'

interface Props {
  onSelect: (country: Country) => void
}

export default function CountrySelect({ onSelect }: Props) {
  const [activeRegion, setActiveRegion] = useState(regions[0].id)
  const [query, setQuery] = useState('')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q) {
      return regions
        .flatMap((r) => r.countries)
        .filter((c) => c.name.toLowerCase().includes(q))
        .sort((a, b) => a.name.localeCompare(b.name))
    }
    return regions.find((r) => r.id === activeRegion)?.countries ?? []
  }, [activeRegion, query])

  return (
    <div className="country-overlay">
      <div className="country-modal">
        <img className="country-logo" src={logoUrl} alt="Uneva" />
        <p className="country-sub">Choose your region to continue to Uneva.</p>

        <div className="region-tabs">
          {regions.map((r) => (
            <button
              key={r.id}
              className={`region-tab ${!query && activeRegion === r.id ? 'active' : ''}`}
              onClick={() => { setActiveRegion(r.id); setQuery('') }}
            >
              <span className="region-icon">
                <span className="region-globe">{r.icon}</span>
              </span>
              <span className="region-name">{r.name}</span>
            </button>
          ))}
        </div>

        <div className="country-search">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            placeholder="Search all countries…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search all countries"
          />
        </div>

        <div className="country-grid">
          {list.map((c) => (
            <button key={c.code} className="country-item" onClick={() => onSelect(c)}>
              <img className="country-flag" src={flagUrl(c.code)} alt="" width={30} height={20} loading="lazy" />
              <span className="country-name">{c.name}</span>
            </button>
          ))}
          {list.length === 0 && <p className="country-empty">No countries match “{query}”.</p>}
        </div>
      </div>
    </div>
  )
}
