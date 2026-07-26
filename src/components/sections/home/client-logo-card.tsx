"use client";

import { useState } from "react";
import Image from "next/image";
import type { ClientLogo } from "@/types";

interface ClientLogoCardProps {
  client: ClientLogo;
}

export function ClientLogoCard({ client }: ClientLogoCardProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="group flex min-h-[90px] flex-col items-center justify-center gap-2.5 rounded-[10px] border-[1.5px] border-transparent bg-white p-4 shadow-[0_2px_16px_rgba(0,0,0,0.07)] transition-all hover:-translate-y-0.5 hover:border-brand-red hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)]">
      {!errored ? (
        <div className="relative h-[38px] w-[90px] grayscale opacity-[0.78] transition-all group-hover:opacity-100 group-hover:grayscale-0">
          <Image
            src={client.logoUrl}
            alt={client.name}
            fill
            className="object-contain"
            onError={() => setErrored(true)}
          />
        </div>
      ) : (
        <span className="text-center text-[11px] font-bold leading-tight text-brand-grey-dark group-hover:text-brand-red">
          {client.name}
        </span>
      )}
      <p className="text-center text-[10px] font-medium leading-tight text-brand-grey-mid group-hover:text-brand-red">
        {client.name}
      </p>
    </div>
  );
}
