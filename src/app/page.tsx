import { Hero } from "@/components/sections/home/hero";
import { StatsBar } from "@/components/sections/home/stats-bar";
import { Categories } from "@/components/sections/home/categories";
import { FeaturedProducts } from "@/components/sections/home/featured-products";
import { HowItWorks } from "@/components/sections/home/how-it-works";
import { CtaBanner } from "@/components/sections/home/cta-banner";
import { Testimonials } from "@/components/sections/home/testimonials";
import { GalleryPreview } from "@/components/sections/home/gallery-preview";
import { ClientLogos } from "@/components/sections/home/client-logos";
import {
  getBanners,
  getCategories,
  getClientLogos,
  getGalleryItems,
  getProcessSteps,
  getProducts,
  getReviews,
  getStats,
  safe,
} from "@/lib/api";
import { getMyWishlistProductIds } from "@/lib/auth/wishlist";

export default async function HomePage() {
  const [banners, stats, categories, products, processSteps, reviews, galleryItems, clientLogos, wishlistedIds] =
    await Promise.all([
      safe(getBanners(), []),
      safe(getStats(), []),
      safe(getCategories(), []),
      safe(getProducts({ featured: true }), []),
      safe(getProcessSteps(), []),
      safe(getReviews(), []),
      safe(getGalleryItems(), []),
      safe(getClientLogos(), []),
      getMyWishlistProductIds(),
    ]);

  return (
    <>
      <Hero banners={banners} />
      <StatsBar stats={stats} />
      <Categories categories={categories} />
      <FeaturedProducts products={products} wishlistedProductIds={[...wishlistedIds]} />
      <HowItWorks steps={processSteps} />
      <CtaBanner />
      <Testimonials reviews={reviews} />
      <GalleryPreview items={galleryItems} />
      <ClientLogos clients={clientLogos} />
    </>
  );
}

