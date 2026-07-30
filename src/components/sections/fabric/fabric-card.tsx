import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Fabric } from "@/types";

interface FabricCardProps {
  fabric: Fabric;
}

export function FabricCard({ fabric }: FabricCardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.07)]">
      <div className="relative w-full aspect-[5/4] overflow-hidden rounded-lg bg-brand-grey-light">
        <Image
          src={fabric.image}
          alt={fabric.name}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-5 space-y-3">
        <p className="text-[15px] font-bold text-black">{fabric.name}</p>
        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-grey-mid">
          {fabric.grade}
        </p>
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-brand-red">
          Best for: {fabric.bestFor}
        </p>
        <p className="text-[15px] leading-[1.8] text-brand-grey-dark">{fabric.description}</p>
        <Button href="/quote" size="sm" className="px-4 py-2 text-[13px] font-semibold">
          Order with this fabric
        </Button>
      </div>
    </div>
  );
}
