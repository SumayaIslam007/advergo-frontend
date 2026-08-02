"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import type { Banner } from "@/types";

interface HeroProps {
  banners: Banner[];
}

// Dummy slide until a real banner is uploaded via the admin (Cloudinary).
const FALLBACK_SLIDE: Banner = {
  id: -1,
  title: "Built for champions.\nMade your way.",
  subtitle:
    "Custom jersey & sportswear manufacturing for football clubs, cricket teams, cycling squads, and corporates — since 2019.",
  image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&h=600&fit=crop",
  ctaLabel: "Explore products",
  ctaHref: "/products",
};

const AUTOPLAY_MS = 6000;

export function Hero({ banners }: HeroProps) {
  const slides = banners.length > 0 ? banners : [FALLBACK_SLIDE];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const dragStartX = useRef(0);

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index || (index === slides.length - 1 && next === 0) ? 1 : -1);
      setIndex((next + slides.length) % slides.length);
    },
    [index, slides.length]
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (slides.length < 2 || isPaused) return;
    const id = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [goNext, isPaused, slides.length]);

  const slide = slides[index];
  const [titleLine1, titleLine2] = slide.title.split("\n");
  const ctaLabel = slide.ctaLabel || "Explore products";
  const ctaHref = slide.ctaHref || "/products";

  return (
    <section
      className="relative flex min-h-[520px] items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={slide.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          drag={slides.length > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragStart={(_, info) => {
            dragStartX.current = info.point.x;
          }}
          onDragEnd={(_, info) => {
            const delta = info.point.x - dragStartX.current;
            if (delta < -60) goNext();
            else if (delta > 60) goPrev();
          }}
        >
          <Image
            src={slide.image ?? FALLBACK_SLIDE.image!}
            alt={slide.title}
            fill
            priority={index === 0}
            className="pointer-events-none object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,1,1,0.82)_48%,rgba(1,1,1,0.3)_100%)]" />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-brand-red/35 blur-[90px] motion-safe:animate-[drift_16s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -right-16 bottom-[-90px] h-64 w-64 rounded-full bg-brand-red-deep/45 blur-[90px] motion-safe:animate-[drift_18s_ease-in-out_infinite] [animation-delay:-7s]" />

      <div className="relative z-[1] mx-auto w-full max-w-[1140px] px-6 py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[560px]"
          >
            <Eyebrow className="text-brand-red">Premium custom sportswear · Bangladesh</Eyebrow>
            <h1 className="mb-5 text-[2.75rem] font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-[3.5rem]">
              {titleLine1}
              {titleLine2 && (
                <>
                  <br />
                  <span className="bg-[linear-gradient(100deg,#fff_10%,var(--color-brand-red)_55%,var(--color-brand-red-dark)_100%)] bg-clip-text text-transparent">
                    {titleLine2}
                  </span>
                </>
              )}
            </h1>
            <p className="mb-8 max-w-[440px] text-[15px] leading-[1.75] text-gray-300">{slide.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Button href={ctaHref}>
                {ctaLabel} <ArrowRight size={14} />
              </Button>
              <Button href="/quote" variant="onDark">
                Get a custom quote
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 && (
        <>
          <div className="absolute inset-x-0 bottom-7 z-[2] flex items-center justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-brand-red" : "w-1.5 bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            className="absolute left-3 top-1/2 z-[2] hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/25 p-2.5 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-black/45 sm:flex"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            className="absolute right-3 top-1/2 z-[2] hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/25 p-2.5 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-black/45 sm:flex"
          >
            <ArrowRight size={18} />
          </button>
        </>
      )}
    </section>
  );
}
