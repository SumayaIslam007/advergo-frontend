import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { SportCategory } from "@/types";

interface CategoriesProps {
  categories: SportCategory[];
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <Section background="white">
      <div className="mb-11 text-center">
        <Eyebrow center>What we make</Eyebrow>
        <Heading center>Sport categories</Heading>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="group rounded-xl bg-brand-grey-light p-6 text-center shadow-[0_2px_16px_rgba(0,0,0,0.07)] transition-all duration-200 hover:-translate-y-1 hover:bg-brand-red hover:shadow-[0_6px_24px_rgba(235,33,39,0.18)]"
          >
            <div className="mb-3 text-[32px]">{category.icon}</div>
            <p className="mb-1 text-sm font-bold text-black transition-colors group-hover:text-white">
              {category.name}
            </p>
            <p className="text-[11px] leading-relaxed text-brand-grey-mid transition-colors group-hover:text-white/80">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
