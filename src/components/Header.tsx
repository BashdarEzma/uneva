import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { categories, products, typeNavIcon } from '../data/catalog'
import { flagUrl, type Country } from '../data/countries'
import logoUrl from '../images/logo.png'
import './Header.css'

interface HeaderProps {
  country: Country
  onChangeCountry: () => void
}

// Neutral tile shown in the nav bar when a category has no icon in the icons
// folder yet. The nav bar never falls back to product photos.
const NAV_ICON_PLACEHOLDER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150">
       <rect width="100%" height="100%" fill="#f3f6fb"/>
       <rect x="72" y="47" width="56" height="56" rx="12" fill="none" stroke="#c3ccd8" stroke-width="4"/>
     </svg>`
  )

// Category ids that live under the "TV/Audio" nav menu (everything else is a
// Home Appliance).
const TV_AUDIO_IDS = ['tv']

export default function Header({ country, onChangeCountry }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState<null | 'appliances' | 'tvaudio'>(null)
  const [activeCat, setActiveCat] = useState<string | null>(null)

  const applianceCats = categories.filter((c) => !TV_AUDIO_IDS.includes(c.id))
  const tvAudioCats = categories.filter((c) => TV_AUDIO_IDS.includes(c.id))

  const close = () => {
    setOpen(false)
    setMenu(null)
    setActiveCat(null)
  }

  const openMenu = (which: 'appliances' | 'tvaudio', cats: typeof categories) => {
    setMenu(which)
    setActiveCat(cats[0]?.id ?? null)
  }

  const closeMenu = () => {
    setMenu(null)
    setActiveCat(null)
  }

  const menuCats = menu === 'tvaudio' ? tvAudioCats : applianceCats
  const activeCategory = categories.find((c) => c.id === activeCat)
  const activeNavIcon = activeCategory?.navIcon ?? NAV_ICON_PLACEHOLDER

  // Which top-level nav item is "current" based on the URL. TV/Audio categories
  // live under /products/tv; every other /products path is a Home Appliance.
  // (NavLink's default matching would light up BOTH on /products/tv, so we
  // resolve the active item ourselves.)
  const { pathname } = useLocation()
  const productMatch = pathname.match(/^\/products(?:\/([^/?#]+))?/)
  const currentCat = productMatch?.[1]
  const inTvAudio = currentCat ? TV_AUDIO_IDS.includes(currentCat) : false
  const inAppliances = !!productMatch && !inTvAudio

  // Tiles shown in the mega menu for the hovered category. When a type holds
  // more than one product (e.g. AC → Cassette, Dishwasher → Lunex/Goldex), the
  // menu lists the type once and clicking it filters the listing to that type.
  // Otherwise (every type is a single product) it lists each product as before.
  const activeProducts = products.filter((p) => p.categoryId === activeCat)
  const typeOf = (p: (typeof activeProducts)[number]) => p.type ?? p.name
  const types = [...new Set(activeProducts.map(typeOf))]
  const groupByType = types.length < activeProducts.length
  const megaTiles = groupByType
    ? types.map((t) => {
        const items = activeProducts.filter((p) => typeOf(p) === t)
        return {
          key: t,
          name: t,
          icon: typeNavIcon[t] ?? items[0]?.image ?? activeNavIcon,
          to: `/products/${activeCat}?type=${encodeURIComponent(t)}`,
        }
      })
    : activeProducts.map((p) => ({ key: p.id, name: p.name, icon: typeNavIcon[typeOf(p)] ?? activeNavIcon, to: `/products/${activeCat}?type=${encodeURIComponent(typeOf(p))}` }))

  return (
    <header className="site-header" onMouseLeave={closeMenu}>
      <div className="container header-inner">
        <a
          href="/"
          className="logo"
          onClick={(e) => {
            // Always return to a fresh home page, even when already on "/".
            e.preventDefault()
            close()
            window.location.assign('/')
          }}
        >
          <img src={logoUrl} alt="Uneva" className="logo-img" />
        </a>

        <nav className={`main-nav ${open ? 'open' : ''}`}>
          <div className="nav-appliances" onMouseEnter={() => openMenu('appliances', applianceCats)}>
            {/* Hover reveals the category menu; clicking opens the listing page. */}
            <Link
              to="/products"
              aria-haspopup="true"
              aria-expanded={menu === 'appliances'}
              onClick={close}
              className={`${inAppliances ? 'active' : ''} ${menu === 'appliances' ? 'hovering' : ''}`}
            >
              Home Appliances ▾
            </Link>
          </div>

          <div className="nav-appliances" onMouseEnter={() => openMenu('tvaudio', tvAudioCats)}>
            <Link
              to="/products/tv"
              aria-haspopup="true"
              aria-expanded={menu === 'tvaudio'}
              onClick={close}
              className={`${inTvAudio ? 'active' : ''} ${menu === 'tvaudio' ? 'hovering' : ''}`}
            >
              TV/Audio ▾
            </Link>
          </div>

          {/* Direct category links — shown only in the mobile stacked menu */}
          <div className="mobile-cats">
            {categories.map((c) => (
              <NavLink key={c.id} to={`/products/${c.id}`} onClick={close}>
                {c.name}
              </NavLink>
            ))}
          </div>

          <div className="nav-about-wrap" onMouseEnter={closeMenu}>
            <NavLink to="/about" className="nav-about" onClick={close}>
              About Uneva ▾
            </NavLink>
            <div className="about-menu">
              <Link to="/about#brand-story" onClick={close}>Brand story</Link>
            </div>
          </div>

        </nav>

        <div className="header-actions">
          <button
            className="country-pill"
            onClick={onChangeCountry}
            title={`${country.name} — click to change`}
            aria-label={`Region: ${country.name}. Click to change.`}
          >
            <img className="country-pill-flag" src={flagUrl(country.code)} alt="" width={22} height={15} />
            <span className="country-pill-code">{country.code}</span>
          </button>
          <button className="hamburger" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menu && (
        <div className="mega-panel" onMouseEnter={() => setMenu(menu)}>
          <div className="container mega-two">
            {/* Left: category list — hover to reveal its types */}
            <ul className="mega-catlist">
              {menuCats.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/products/${c.id}`}
                    className={activeCat === c.id ? 'active' : ''}
                    onMouseEnter={() => setActiveCat(c.id)}
                    onClick={close}
                  >
                    <span>{c.name}</span>
                    <span className="mega-chev">›</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right: types of the hovered category */}
            <div className="mega-types">
              <div className="mega-types-head">
                <span className="mega-current">
                  {activeCategory?.name}
                </span>
                <Link to={`/products/${activeCat}`} className="mega-viewall" onClick={close}>
                  View all →
                </Link>
              </div>
              <div className="mega-grid">
                {megaTiles.map((t) => (
                  <Link key={t.key} to={t.to} className="mega-tile" onClick={close}>
                    <div className="mega-tile-img">
                      <img src={t.icon} alt={t.name} loading="lazy" />
                    </div>
                    <span className="mega-tile-name">{t.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
