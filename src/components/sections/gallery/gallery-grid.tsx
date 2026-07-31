"use client";

import { useMemo, useState } from "react";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryItem } from "@/types";

interface GalleryGridProps {
  items: GalleryItem[];
}

const tabs: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All photos" },
  { id: "factory", label: "🏭  Factory" },
  { id: "clients", label: "🤝  Client deliveries" },
];

export function GalleryGrid({ items }: GalleryGridProps) {
  const [tab, setTab] = useState<GalleryCategory | "all">("all");

  const visible = useMemo(
    () => (tab === "all" ? items : items.filter((item) => item.category === tab)),
    [items, tab]
  );

  return (
    <div>
      <div className="mb-7 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-full border-[1.5px] px-4.5 py-2 text-[13px] font-semibold transition-colors",
              tab === t.id ? "border-black bg-black text-white" : "border-brand-border bg-white text-brand-grey-dark"
            )}
          >
            {t.label}
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
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      item.category === "clients" ? "bg-brand-red/10 text-brand-red" : "bg-brand-grey-light text-brand-grey-mid"
                    )}
                  >
                    {item.category === "factory" ? "Factory" : "Client"}
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
