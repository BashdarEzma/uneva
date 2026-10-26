import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import CountrySelect from './components/CountrySelect'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Support from './pages/Support'
import About from './pages/About'
import NotFound from './pages/NotFound'
import type { Country } from './data/countries'

const STORAGE_KEY = 'uneva_country'

export default function App() {
  const [country, setCountry] = useState<Country | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? (JSON.parse(saved) as Country) : null
    } catch {
      return null
    }
  })

  const chooseCountry = (c: Country) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c))
    } catch {
      /* ignore storage errors */
    }
    setCountry(c)
  }

  if (!country) {
    return <CountrySelect onSelect={chooseCountry} />
  }

  return (
    <>
      <ScrollToTop />
      <Header country={country} onChangeCountry={() => setCountry(null)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:categoryId" element={<Products />} />
          <Route path="/products/:categoryId/:productId" element={<ProductDetail />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  )
}
