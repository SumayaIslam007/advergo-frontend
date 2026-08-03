import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import type { Category } from "@/types";

interface CategoriesProps {
  categories: Category[];
}

/** Cycled per-card so the icon badge and accent bar aren't uniformly red — gives each category its own identity at a glance. */
const ACCENTS = [
  "bg-[linear-gradient(155deg,var(--color-brand-red)_0%,var(--color-brand-red-dark)_100%)]",
  "bg-[linear-gradient(155deg,#23262d_0%,var(--color-brand-black)_100%)]",
  "bg-[linear-gradient(155deg,var(--color-brand-red-dark)_0%,var(--color-brand-red-deep)_100%)]",
  "bg-[linear-gradient(155deg,var(--color-brand-black)_0%,var(--color-brand-red-deep)_100%)]",
  "bg-[linear-gradient(155deg,var(--color-brand-red)_0%,var(--color-brand-black)_100%)]",
];

export function Categories({ categories }: CategoriesProps) {
  return (
    <Section background="white">
      <Reveal className="mb-11 text-center">
        <Eyebrow center>What we make</Eyebrow>
        <Heading center>Product categories</Heading>
      </Reveal>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <Reveal key={category.id} delay={i * 0.06}>
              <Link
                href={`/products?category=${category.id}`}
                className="group relative block overflow-hidden rounded-2xl border border-brand-border bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_20px_40px_-10px_rgba(15,17,23,0.25)]"
              >
                <span
                  className={`absolute inset-x-0 top-0 h-1 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${accent}`}
                  aria-hidden
                />
                <div
                  className={`mx-auto mb-3.5 flex h-14 w-14 items-center justify-center rounded-2xl text-[26px] shadow-[0_8px_18px_-6px_rgba(15,17,23,0.3)] transition-transform duration-300 group-hover:scale-110 ${accent}`}
                >
                  {category.icon}
                </div>
                <p className="mb-1 text-sm font-bold text-brand-black">{category.name}</p>
                <p className="mb-2.5 text-[11px] leading-relaxed text-brand-grey-mid">{category.description}</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-red opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                  Explore <ArrowRight size={12} />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
