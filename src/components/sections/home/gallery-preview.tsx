import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
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
      <Reveal className="mb-8.5 flex items-end justify-between">
        <div>
          <Eyebrow>Factory &amp; clients</Eyebrow>
          <Heading>Gallery preview</Heading>
        </div>
        <Button href="/gallery" variant="ghost" className="hidden sm:inline-flex">
          View full gallery →
        </Button>
      </Reveal>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 6).map((item, i) => (
          <Reveal key={item.id} delay={i * 0.05}>
            <Card className="overflow-hidden">
              <ImageWithFallback src={item.src} alt={item.label} height={200} className="rounded-none" />
              <div className="px-3.5 py-2.5">
                <p className="mb-0.5 text-xs font-bold text-brand-black">{item.label}</p>
                <p className="text-[11px] text-brand-grey-mid">{item.description}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
