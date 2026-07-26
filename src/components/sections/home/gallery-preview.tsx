import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import type { GalleryItem } from "@/types";

interface GalleryPreviewProps {
  items: GalleryItem[];
}

export function GalleryPreview({ items }: GalleryPreviewProps) {
  return (
    <Section background="grey">
      <div className="mb-8.5 flex items-end justify-between">
        <div>
          <Eyebrow>Factory &amp; clients</Eyebrow>
          <Heading>Gallery preview</Heading>
        </div>
        <Button href="/gallery" variant="ghost" className="hidden sm:inline-flex">
          View full gallery →
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-[10px] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.07)] transition-transform hover:scale-[1.02]"
          >
            <ImageWithFallback src={item.src} alt={item.label} height={200} className="rounded-none" />
            <div className="px-3.5 py-2.5">
              <p className="mb-0.5 text-xs font-bold text-black">{item.label}</p>
              <p className="text-[11px] text-brand-grey-mid">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
