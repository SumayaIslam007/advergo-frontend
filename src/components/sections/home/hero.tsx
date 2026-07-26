import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Hero() {
  return (
    <section className="relative flex min-h-[520px] items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&h=600&fit=crop"
        alt="Sportswear hero"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,1,1,0.82)_48%,rgba(1,1,1,0.3)_100%)]" />

      <div className="relative z-[1] mx-auto max-w-[1140px] px-6 py-20">
        <div className="max-w-[520px]">
          <Eyebrow className="text-brand-red">Premium custom sportswear · Bangladesh</Eyebrow>
          <h1 className="mb-4 text-4xl font-black leading-[1.1] tracking-[-1px] text-white sm:text-[46px]">
            Built for champions.
            <br />
            <span className="text-brand-red">Made your way.</span>
          </h1>
          <p className="mb-7 text-[15px] leading-[1.75] text-gray-300">
            Custom jersey &amp; sportswear manufacturing for football clubs, cricket teams, cycling squads,
            and corporates — since 2019.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/products">
              Explore products <ArrowRight size={14} />
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
