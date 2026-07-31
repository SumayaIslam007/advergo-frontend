import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/sections/products/product-card";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
  wishlistedProductIds?: number[];
}

export function FeaturedProducts({ products, wishlistedProductIds = [] }: FeaturedProductsProps) {
  const wishlistedIds = new Set(wishlistedProductIds);
  return (
    <Section background="grey">
      <Reveal className="mb-9 flex items-end justify-between">
        <div>
          <Eyebrow>Our collection</Eyebrow>
          <Heading>Featured products</Heading>
        </div>
        <Button href="/products" variant="ghost" className="hidden sm:inline-flex">
          View all products →
        </Button>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={i * 0.06}>
            <ProductCard product={product} initiallyWishlisted={wishlistedIds.has(product.id)} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
