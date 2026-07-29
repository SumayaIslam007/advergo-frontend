import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Banner } from "@/types";

interface HeroProps {
  banner: Banner | null;
}

// Dummy background until a real photo is uploaded via the admin (Cloudinary).
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&h=600&fit=crop";

export function Hero({ banner }: HeroProps) {
  const title = banner?.title ?? "Built for champions.\nMade your way.";
  const [titleLine1, titleLine2] = title.split("\n");
  const subtitle =
    banner?.subtitle ??
    "Custom jersey & sportswear manufacturing for football clubs, cricket teams, cycling squads, and corporates — since 2019.";
  const ctaLabel = banner?.ctaLabel || "Explore products";
  const ctaHref = banner?.ctaHref || "/products";

  return (
    <section className="relative flex min-h-[520px] items-center overflow-hidden">
      <Image
        src={banner?.image ?? FALLBACK_IMAGE}
        alt={banner?.title ?? "Sportswear hero"}
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,1,1,0.82)_48%,rgba(1,1,1,0.3)_100%)]" />

      <div className="relative z-[1] mx-auto max-w-[1140px] px-6 py-20">
        <div className="max-w-[520px]">
          <Eyebrow className="text-brand-red">Premium custom sportswear · Bangladesh</Eyebrow>
          <h1 className="mb-4 text-4xl font-black leading-[1.1] tracking-[-1px] text-white sm:text-[46px]">
            {titleLine1}
            {titleLine2 && (
              <>
                <br />
                <span className="text-brand-red">{titleLine2}</span>
              </>
            )}
          </h1>
          <p className="mb-7 text-[15px] leading-[1.75] text-gray-300">{subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Button href={ctaHref}>
              {ctaLabel} <ArrowRight size={14} />
            </Button>
            <Button href="/quote" variant="onDark">
              Get a custom quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
