import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Stars } from "@/components/ui/stars";
import { ProductCard } from "@/components/sections/products/product-card";
import { getProduct, getProducts, getSizeChart, safe } from "@/lib/api";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await safe(getProduct(Number(id)), null);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: `${product.name} — ${product.fabric} fabric, ${product.priceRange}. Custom-manufactured by Advergo.`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isFinite(productId)) notFound();

  const product = await safe(getProduct(productId), null);
  if (!product) notFound();

  const [categoryProducts, sizeChart] = await Promise.all([
    safe(getProducts({ category: product.categorySlug }), []),
    safe(getSizeChart(), []),
  ]);
  const related = categoryProducts.filter((p) => p.id !== product.id).slice(0, 3);
  const scopedSizeRows = sizeChart.filter((row) => row.categorySlug === product.categorySlug);
  const sizeRows = scopedSizeRows.length > 0 ? scopedSizeRows : sizeChart.filter((row) => row.categorySlug === null);

  return (
    <div className="min-h-full bg-white">
      <div className="border-b border-brand-border bg-brand-grey-light px-6 py-4">
        <div className="mx-auto max-w-[1140px]">
          <Link
            href="/products"
            className="flex w-fit items-center gap-1.5 text-[13px] font-semibold text-brand-grey-dark transition-colors hover:text-brand-red"
          >
            <ArrowLeft size={14} /> All products
          </Link>
        </div>
      </div>

      <Section background="white">
        <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="relative h-[340px] overflow-hidden rounded-2xl border border-brand-border sm:h-[420px]">
            {product.image ? (
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{ background: `linear-gradient(150deg, ${product.accentColor}, var(--color-brand-black))` }}
              >
                <span className="text-6xl font-black text-white/25">AG</span>
              </div>
            )}
          </div>

          <div>
            <span className="mb-3 inline-block rounded-full bg-[linear-gradient(120deg,var(--color-brand-red),var(--color-brand-red-dark))] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-white">
              {product.category}
            </span>
            <h1 className="mb-2 text-[1.75rem] font-bold tracking-[-0.015em] text-brand-black sm:text-[2.125rem]">
              {product.name}
            </h1>
            <div className="mb-4 flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-[13px] text-brand-grey-mid">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            <p className="mb-1 text-sm text-brand-grey-dark">
              Fabric: <span className="font-semibold text-brand-black">{product.fabric}</span>
            </p>
            <p className="mb-6 text-2xl font-extrabold text-brand-red">{product.priceRange}</p>

            {sizeRows.length > 0 && (
              <div className="mb-6 overflow-x-auto rounded-xl border border-brand-border">
                <table className="w-full text-left text-[12px]">
                  <thead className="bg-brand-grey-light text-brand-grey-mid">
                    <tr>
                      <th className="px-3 py-2.5">Size</th>
                      <th className="px-3 py-2.5">Chest (in)</th>
                      <th className="px-3 py-2.5">Length (in)</th>
                      <th className="px-3 py-2.5">Shoulder (in)</th>
                      <th className="px-3 py-2.5">Sleeve (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeRows.map((row) => (
                      <tr key={row.id} className="border-t border-brand-border">
                        <td className="px-3 py-2.5 font-semibold text-brand-black">{row.sizeLabel}</td>
                        <td className="px-3 py-2.5 text-brand-grey-dark">{row.chestIn ?? "—"}</td>
                        <td className="px-3 py-2.5 text-brand-grey-dark">{row.lengthIn ?? "—"}</td>
                        <td className="px-3 py-2.5 text-brand-grey-dark">{row.shoulderIn ?? "—"}</td>
                        <td className="px-3 py-2.5 text-brand-grey-dark">{row.sleeveIn ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <Button href={`/quote?product=${product.id}`} size="lg">
              Get a quote for this product
            </Button>
          </div>
        </Reveal>
      </Section>

      {related.length > 0 && (
        <Section background="grey">
          <Reveal className="mb-8 text-center">
            <Eyebrow center>You might also like</Eyebrow>
            <Heading center as="h3">
              More in {product.category}
            </Heading>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
