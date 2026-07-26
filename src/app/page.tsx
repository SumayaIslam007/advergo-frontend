// import Image from "next/image";

// export default function HomePage() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         Hello world
//       </main>
//     </div>
//   );
// }

import { Hero } from "@/components/sections/home/hero";
import { StatsBar } from "@/components/sections/home/stats-bar";
import { Categories } from "@/components/sections/home/categories";
import { FeaturedProducts } from "@/components/sections/home/featured-products";
import { HowItWorks } from "@/components/sections/home/how-it-works";
import { CtaBanner } from "@/components/sections/home/cta-banner";
import { Achievements } from "@/components/sections/home/achievements";
import { Testimonials } from "@/components/sections/home/testimonials";
import { GalleryPreview } from "@/components/sections/home/gallery-preview";
import { ClientLogos } from "@/components/sections/home/client-logos";
import {
  stats,
  sportCategories,
  products,
  processSteps,
  achievements,
  reviews,
  galleryItems,
  clientLogos,
} from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar stats={stats} />
      <Categories categories={sportCategories} />
      <FeaturedProducts products={products} />
      <HowItWorks steps={processSteps} />
      <CtaBanner />
      <Achievements achievements={achievements} />
      <Testimonials reviews={reviews} />
      <GalleryPreview items={galleryItems} />
      <ClientLogos clients={clientLogos} />
    </>
  );
}

