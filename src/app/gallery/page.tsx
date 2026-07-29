import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { GalleryGrid } from "@/components/sections/gallery/gallery-grid";
import { getGalleryItems, safe } from "@/lib/api";

export const metadata: Metadata = {
  title: "Gallery",
  description: "See Advergo's factory sections and delivered client orders — design, printing, cutting, sewing, QC, and packing.",
};

export default async function GalleryPage() {
  const galleryItems = await safe(getGalleryItems(), []);

  return (
    <div className="min-h-screen bg-brand-grey-light">
      <PageHeader
        eyebrow="Our work"
        title="Gallery"
        subtitle="Factory sections, production process, and client order deliveries."
      />
      <Section background="grey">
        <GalleryGrid items={galleryItems} />
      </Section>
    </div>
  );
}
