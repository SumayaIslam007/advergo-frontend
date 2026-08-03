import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Fabric } from "@/types";

interface FabricCardProps {
  fabric: Fabric;
}

/**
 * Woven-look gradients used when a fabric has no photo yet. Cycled by id so
 * each fabric gets a consistent, deliberate pattern instead of a broken or
 * awkwardly-cropped image placeholder.
 */
const PATTERNS = [
  "repeating-linear-gradient(115deg, var(--color-brand-red) 0 3px, #a4171d 3px 7px, var(--color-brand-red-deep) 7px 11px)",
  "repeating-linear-gradient(65deg, var(--color-brand-red-dark) 0 4px, var(--color-brand-red) 4px 8px)",
  "repeating-linear-gradient(150deg, var(--color-brand-black) 0 3px, #23262d 3px 6px, var(--color-brand-red-deep) 6px 9px)",
  "radial-gradient(circle at 30% 30%, var(--color-brand-red) 0%, var(--color-brand-red-dark) 45%, var(--color-brand-red-deep) 100%)",
];

export function FabricCard({ fabric }: FabricCardProps) {
  const pattern = PATTERNS[fabric.id % PATTERNS.length];

  return (
    <div className="group overflow-hidden rounded-2xl border border-brand-border bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white hover:shadow-[0_24px_48px_-14px_rgba(15,17,23,0.2)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        {fabric.image ? (
          <Image
            src={fabric.image}
            alt={fabric.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: pattern }}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,0.75)_100%)]" />
        {fabric.grade && (
          <span className="absolute bottom-3.5 left-4 rounded-full bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
            {fabric.grade}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="mb-0.5 text-[16px] font-bold text-brand-black">{fabric.name}</p>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-brand-red">
          Best for: {fabric.bestFor}
        </p>
        <p className="mb-4 text-[13px] leading-[1.7] text-brand-grey-dark">{fabric.description}</p>
        <Button href={`/quote?fabric=${fabric.id}`} size="sm" className="w-full justify-center py-2.5 text-[11px]">
          Order with this fabric
        </Button>
      </div>
    </div>
  );
}
