"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/ui/stars";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

/** Placeholder jersey graphic — swap for a real product photo when available. */
function JerseyPlaceholder({ color }: { color: string }) {
  return (
    <div className="flex h-[180px] w-full items-center justify-center bg-gray-100">
      <svg width="90" height="110" viewBox="0 0 88 108">
        <path
          d="M17 17L31 7L44 15L57 7L71 17L81 41L61 47L61 100L27 100L27 47L7 41Z"
          fill={color}
          opacity="0.78"
        />
        <path d="M31 7L44 15L57 7L57 23L44 27L31 23Z" fill="white" opacity="0.2" />
        <text x="44" y="80" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold" opacity="0.5">
          AG
        </text>
      </svg>
    </div>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const [wished, setWished] = useState(false);

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.07)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.11)]">
      <div className="relative">
        <JerseyPlaceholder color={product.accentColor} />
        <button
          type="button"
          onClick={() => setWished((v) => !v)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute right-2.5 top-2.5 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white shadow-[0_2px_16px_rgba(0,0,0,0.07)]"
        >
          <Heart size={13} className={cn(wished ? "fill-brand-red text-brand-red" : "text-brand-grey-mid")} />
        </button>
        <span className="absolute left-2.5 top-2.5 rounded bg-brand-red px-2 py-0.5 text-[10px] font-bold text-white">
          {product.category}
        </span>
      </div>

      <div className="px-[18px] pb-5 pt-4">
        <p className="mb-0.5 text-sm font-bold text-black">{product.name}</p>
        <p className="mb-2 text-xs text-brand-grey-mid">{product.fabric}</p>
        <div className="mb-2.5 flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-[11px] text-brand-grey-mid">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <p className="mb-3.5 text-[15px] font-extrabold text-brand-red">{product.priceRange}</p>
        <div className="flex gap-2">
          <Button href="/quote" size="sm" className="flex-1 justify-center py-2 text-[11px]">
            Order now
          </Button>
          <Button href="/quote" variant="outline" className="px-3 py-1.5 text-[11px]">
            Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
