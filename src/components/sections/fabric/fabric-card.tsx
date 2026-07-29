import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Fabric } from "@/types";

interface FabricCardProps {
  fabric: Fabric;
}

export function FabricCard({ fabric }: FabricCardProps) {
  return (
    <div className="flex gap-5 rounded-xl border-l-4 border-brand-red bg-white p-7 shadow-[0_2px_16px_rgba(0,0,0,0.07)]">
      {fabric.image ? (
        <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-lg border border-brand-border">
          <Image src={fabric.image} alt={fabric.name} fill className="object-cover" />
        </div>
      ) : (
        <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-lg border border-brand-border bg-brand-grey-light text-2xl">
          🧵
        </div>
      )}
      <div>
        <p className="text-[15px] font-bold text-black">{fabric.name}</p>
        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-grey-mid">
          {fabric.grade}
        </p>
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-brand-red">
          Best for: {fabric.bestFor}
        </p>
        <p className="mb-3.5 text-[13px] leading-[1.7] text-brand-grey-dark">{fabric.description}</p>
        <Button href={`/quote?fabric=${fabric.id}`} size="sm" className="px-3.5 py-1.5 text-[11px]">
          Order with this fabric
        </Button>
      </div>
    </div>
  );
}
