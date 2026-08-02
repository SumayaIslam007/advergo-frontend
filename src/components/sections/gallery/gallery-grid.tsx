"use client";

import { useMemo, useState } from "react";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryItem } from "@/types";

interface GalleryGridProps {
  items: GalleryItem[];
  categories: GalleryCategory[];
}

export function GalleryGrid({ items, categories }: GalleryGridProps) {
  const [tab, setTab] = useState<string>("all");

  const visible = useMemo(
    () => (tab === "all" ? items : items.filter((item) => item.category === tab)),
    [items, tab]
  );

  return (
    <div>
      <div className="mb-7 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab("all")}
          className={cn(
            "rounded-full border-[1.5px] px-4.5 py-2 text-[13px] font-semibold transition-colors",
            tab === "all" ? "border-black bg-black text-white" : "border-brand-border bg-white text-brand-grey-dark"
          )}
        >
          All photos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setTab(category.id)}
            className={cn(
              "rounded-full border-[1.5px] px-4.5 py-2 text-[13px] font-semibold transition-colors",
              tab === category.id
                ? "border-black bg-black text-white"
                : "border-brand-border bg-white text-brand-grey-dark"
            )}
          >
            {category.icon ? `${category.icon}  ` : ""}
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, i) => (
          <Reveal key={item.id} delay={(i % 6) * 0.05}>
            <div className="overflow-hidden rounded-xl border border-brand-border bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white hover:shadow-[0_20px_40px_-12px_rgba(15,17,23,0.14)]">
              <ImageWithFallback src={item.src} alt={item.label} height={210} className="rounded-none" />
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-bold text-brand-black">{item.label}</p>
                  <span className="rounded-full bg-brand-grey-light px-2 py-0.5 text-[10px] font-semibold text-brand-grey-mid">
                    {item.categoryName}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-brand-grey-mid">{item.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
