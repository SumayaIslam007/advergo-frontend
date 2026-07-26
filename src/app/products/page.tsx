import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { ProductCatalog } from "@/components/sections/products/product-catalog";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse custom-manufactured sportswear across football, cricket, cycling, marathon, and corporate categories.",
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;

  return (
    <div className="min-h-screen bg-brand-grey-light">
      <PageHeader
        eyebrow="Catalogue"
        title="All products"
        subtitle="Custom-manufactured sportswear across 5 sport categories."
      />
      <Section background="grey">
        <ProductCatalog products={products} initialCategory={category ?? "all"} />
      </Section>
    </div>
  );
}
