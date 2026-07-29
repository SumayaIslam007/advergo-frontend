import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
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
      <div className="mb-9 flex items-end justify-between">
        <div>
          <Eyebrow>Our collection</Eyebrow>
          <Heading>Featured products</Heading>
        </div>
        <Button href="/products" variant="ghost" className="hidden sm:inline-flex">
          View all products →
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} initiallyWishlisted={wishlistedIds.has(product.id)} />
        ))}
      </div>
    </Section>
  );
}
