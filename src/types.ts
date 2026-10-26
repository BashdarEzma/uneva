export interface Category {
  id: string
  name: string
  tagline: string
  image: string
  navIcon?: string // icon shown in the nav-bar mega menu (falls back to product image)
}

export interface SpecRow {
  label: string
  value: string
}

export interface SpecGroup {
  group: string
  rows: SpecRow[]
}

export interface Product {
  id: string
  name: string
  categoryId: string
  series: string
  rating: number
  highlights: string[]
  badge?: string
  image: string
  type?: string // sub-collection within the category (e.g. 'Cassette', 'Lunex') — used to group/filter the mega-menu and listing
  models?: string[] // model-code variants, e.g. ['D1401W', 'D1401S', 'D1401B']
  gallery?: string[] // extra product photos shown in the detail view
  specs?: SpecGroup[] // full specification table shown in the detail view
}

export interface Innovation {
  id: string
  title: string
  description: string
  icon: string
}

export interface Showcase {
  id: string
  eyebrow: string
  title: string
  description: string
  cta: string
  link: string
  image: string
}

export interface NewsItem {
  id: string
  category: string
  title: string
  date: string
  image: string
}

export interface Banner {
  id: string
  link: string
  image: string // shown for image slides; also used as the video poster
  video?: string // if set, the slide plays this full-size video instead of the image
  caption?: string
}

// A cinematic banner slide shown at the top of a category listing page.
export interface CategorySlide {
  id: string
  eyebrow?: string
  title: string
  subtitle?: string
  image?: string // focal image; also used as the video poster
  video?: string // if set, plays instead of the image
  fit?: 'cover' | 'contain' // 'cover' = full-bleed photo, 'contain' = product render on the right
  cta?: string
  link?: string
}
