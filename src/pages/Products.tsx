import { useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { categories, products } from '../data/catalog'
import ProductCard from '../components/ProductCard'
import CategoryHero from '../components/CategoryHero'
import './Products.css'

type SortKey = 'featured' | 'name-asc' | 'name-desc' | 'rating'

export default function Products() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [sort, setSort] = useState<SortKey>('featured')

  const current = categoryId ?? 'all'
  const type = searchParams.get('type')

  // The sub-categories (types) available within the current category, used to
  // build the in-page filter. Empty on the "All products" view.
  const subTypes = useMemo(() => {
    if (current === 'all') return []
    const base = products.filter((p) => p.categoryId === current)
    return [...new Set(base.map((p) => p.type ?? p.name))]
  }, [current])

  const list = useMemo(() => {
    let items = current === 'all' ? products : products.filter((p) => p.categoryId === current)
    if (type) items = items.filter((p) => (p.type ?? p.name) === type)
    items = [...items]
    switch (sort) {
      case 'name-asc': items.sort((a, b) => a.name.localeCompare(b.name)); break
      case 'name-desc': items.sort((a, b) => b.name.localeCompare(a.name)); break
      case 'rating': items.sort((a, b) => b.rating - a.rating); break
      default: items.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0))
    }
    return items
  }, [current, type, sort])

  // Navigating to a category clears any active series filter.
  const goTo = (id: string) => navigate(id === 'all' ? '/products' : `/products/${id}`)

  return (
    <div className="fade-in products-page">
      <CategoryHero categoryId={current} />

      <div className="container products-layout">
        <div className="products-toolbar">
          <div className="filter-chips">
            <button className={current === 'all' ? 'chip active' : 'chip'} onClick={() => goTo('all')}>All</button>
            {categories.map((c) => (
              <button
                key={c.id}
                className={current === c.id ? 'chip active' : 'chip'}
                onClick={() => goTo(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="sort-select" aria-label="Sort products">
            <option value="featured">Featured</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="rating">Top rated</option>
          </select>
        </div>

        {/* In-page filter by sub-category / type (per category). */}
        {subTypes.length > 1 && (
          <div className="type-filter">
            <span className="type-filter-label">Filter</span>
            <button className={!type ? 'tf-chip active' : 'tf-chip'} onClick={() => goTo(current)}>All</button>
            {subTypes.map((t) => (
              <button
                key={t}
                className={type === t ? 'tf-chip active' : 'tf-chip'}
                onClick={() => navigate(`/products/${current}?type=${encodeURIComponent(t)}`)}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div className="grid products-grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {list.length === 0 && <p className="empty">No products in this category yet.</p>}
      </div>
    </div>
  )
}
