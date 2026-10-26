import CategoryHero from '../components/CategoryHero'
import PromoStrip from '../components/PromoStrip'
import CategoryGrid from '../components/CategoryGrid'
import FeatureShowcase from '../components/FeatureShowcase'
import FeaturedProducts from '../components/FeaturedProducts'
import Innovations from '../components/Innovations'
import NewsHighlights from '../components/NewsHighlights'
import Newsletter from '../components/Newsletter'

export default function Home() {
  return (
    <div className="fade-in">
      {/* Home hero — banners/video auto-discovered from src/images/Slides/Home */}
      <CategoryHero categoryId="all" />
      <PromoStrip />
      <CategoryGrid />
      <FeatureShowcase />
      <FeaturedProducts />
      <Innovations />
      <NewsHighlights />
      <Newsletter />
    </div>
  )
}
