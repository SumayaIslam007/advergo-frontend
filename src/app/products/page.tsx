import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { ProductCatalog } from "@/components/sections/products/product-catalog";
import { getCategories, getProducts, safe } from "@/lib/api";
import { getMyWishlistProductIds } from "@/lib/auth/wishlist";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our custom-manufactured product categories.",
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;
  const [products, categories, wishlistedIds] = await Promise.all([
    safe(getProducts(), []),
    safe(getCategories(), []),
    getMyWishlistProductIds(),
  ]);

  return (
    <div className="min-h-screen bg-brand-grey-light">
      <PageHeader
        eyebrow="Catalogue"
        title="All products"
        subtitle="Custom-manufactured products across all our categories."
      />
      <Section background="grey">
        <ProductCatalog
          products={products}
          categories={categories}
          initialCategory={category ?? "all"}
          wishlistedProductIds={[...wishlistedIds]}
        />
      </Section>
    </div>
  );
}
