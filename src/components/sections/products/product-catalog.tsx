"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { ProductCard } from "./product-card";

interface ProductCatalogProps {
  products: Product[];
  initialCategory?: string;
  wishlistedProductIds?: number[];
}

const filterOptions = ["all", "football", "cricket", "cycling", "marathon", "corporate"] as const;

/** Client-side filterable grid used on the /products page. */
export function ProductCatalog({ products, initialCategory = "all", wishlistedProductIds = [] }: ProductCatalogProps) {
  const wishlistedIds = new Set(wishlistedProductIds);
  const [filter, setFilter] = useState<string>(initialCategory);

  const filtered = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category.toLowerCase() === filter)),
    [products, filter]
  );

  return (
    <div>
      <div className="mb-7 flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            className={cn(
              "rounded-full border-[1.5px] px-4.5 py-1.5 text-xs font-semibold capitalize transition-colors",
              filter === option
                ? "border-brand-red bg-brand-red text-white"
                : "border-brand-border bg-white text-brand-grey-dark hover:border-brand-red"
            )}
          >
            {option === "all" ? "All products" : option}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <Reveal key={product.id} delay={(i % 6) * 0.06}>
              <ProductCard product={product} initiallyWishlisted={wishlistedIds.has(product.id)} />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="py-14 text-center text-brand-grey-mid">No products in this category yet.</p>
      )}
    </div>
  );
}
