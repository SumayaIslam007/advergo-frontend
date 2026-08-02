"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/ui/stars";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  initiallyWishlisted?: boolean;
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

export function ProductCard({ product, initiallyWishlisted = false }: ProductCardProps) {
  const [wished, setWished] = useState(initiallyWishlisted);
  const [pending, setPending] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const router = useRouter();

  const toggleWishlist = async () => {
    if (pending) return;
    setPending(true);
    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: product.id }),
    });
    if (response.status === 401) {
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      setPending(false);
      return;
    }
    const data = await response.json();
    setWished(Boolean(data.wishlisted));
    setPending(false);
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -7, ry: px * 7 });
  };
  const resetTilt = () => setTilt({ rx: 0, ry: 0 });
  const tilted = tilt.rx !== 0 || tilt.ry !== 0;

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${tilted ? -8 : 0}px)`,
      }}
      className="group overflow-hidden rounded-xl border border-brand-border bg-white transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:border-white hover:shadow-[0_26px_50px_-14px_rgba(169,18,24,0.35)]"
    >
      <div className="relative">
        <Link href={`/products/${product.id}`} className="block">
          {product.image ? (
            <div className="relative h-[180px] w-full overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          ) : (
            <JerseyPlaceholder color={product.accentColor} />
          )}
        </Link>
        <button
          type="button"
          onClick={toggleWishlist}
          disabled={pending}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute right-2.5 top-2.5 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/95 shadow-[0_2px_10px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-transform hover:scale-110 disabled:opacity-60"
        >
          <Heart size={13} className={cn(wished ? "fill-brand-red text-brand-red" : "text-brand-grey-mid")} />
        </button>
        <span className="absolute left-2.5 top-2.5 rounded-full bg-[linear-gradient(120deg,var(--color-brand-red),var(--color-brand-red-dark))] px-2.5 py-1 text-[10px] font-bold text-white shadow-[0_4px_10px_-2px_rgba(169,18,24,0.5)]">
          {product.category}
        </span>
      </div>

      <div className="px-[18px] pb-5 pt-4">
        <Link
          href={`/products/${product.id}`}
          className="mb-0.5 block text-sm font-bold text-brand-black transition-colors hover:text-brand-red"
        >
          {product.name}
        </Link>
        <p className="mb-2 text-xs text-brand-grey-mid">{product.fabric}</p>
        <div className="mb-2.5 flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-[11px] text-brand-grey-mid">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <p className="mb-3.5 text-[15px] font-extrabold text-brand-red">{product.priceRange}</p>
        <div className="flex gap-2">
          <Button href={`/quote?product=${product.id}`} size="sm" className="flex-1 justify-center py-2 text-[11px]">
            Order now
          </Button>
          <Button href={`/quote?product=${product.id}`} variant="outline" className="px-3 py-1.5 text-[11px]">
            Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
