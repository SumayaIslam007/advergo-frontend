import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import type { SportCategory } from "@/types";

interface CategoriesProps {
  categories: SportCategory[];
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <Section background="white">
      <Reveal className="mb-11 text-center">
        <Eyebrow center>What we make</Eyebrow>
        <Heading center>Sport categories</Heading>
      </Reveal>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category, i) => (
          <Reveal key={category.id} delay={i * 0.06}>
            <Link
              href={`/products?category=${category.id}`}
              className="group block rounded-xl border border-brand-border p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:bg-[linear-gradient(155deg,var(--color-brand-red)_0%,var(--color-brand-red-dark)_65%,var(--color-brand-red-deep)_100%)] hover:shadow-[0_20px_40px_-10px_rgba(169,18,24,0.5)]"
            >
              <div className="mb-3 text-[32px]">{category.icon}</div>
              <p className="mb-1 text-sm font-bold text-brand-black transition-colors group-hover:text-white">
                {category.name}
              </p>
              <p className="text-[11px] leading-relaxed text-brand-grey-mid transition-colors group-hover:text-white/80">
                {category.description}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
