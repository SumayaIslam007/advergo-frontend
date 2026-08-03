import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { QuoteForm } from "@/components/sections/quote/quote-form";
import { getCategories, getFabrics, getProducts, getSizeChart, safe } from "@/lib/api";

export const metadata: Metadata = {
  title: "Get a custom quote",
  description: "Submit your custom sportswear requirements to Advergo — no payment required upfront.",
};

interface QuotePageProps {
  searchParams: Promise<{ product?: string; fabric?: string }>;
}

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const { product, fabric } = await searchParams;
  const [categories, fabrics, products, sizeChart] = await Promise.all([
    safe(getCategories(), []),
    safe(getFabrics(), []),
    safe(getProducts(), []),
    safe(getSizeChart(), []),
  ]);

  return (
    <div className="min-h-full bg-brand-grey-light">
      <PageHeader
        eyebrow="No payment required"
        title="Get a custom quote"
        subtitle="Submit your requirements — we'll contact you directly to confirm and finalise."
      />
      <div className="mx-auto max-w-[760px] px-6 py-10">
        <QuoteForm
          categories={categories}
          fabrics={fabrics}
          products={products}
          sizeChart={sizeChart}
          initialProductId={product ? Number(product) : undefined}
          initialFabricId={fabric ? Number(fabric) : undefined}
        />
      </div>
    </div>
  );
}
