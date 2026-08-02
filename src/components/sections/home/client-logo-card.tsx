"use client";

import { useState } from "react";
import Image from "next/image";
import type { ClientLogo } from "@/types";

interface ClientLogoCardProps {
  client: ClientLogo;
}

export function ClientLogoCard({ client }: ClientLogoCardProps) {
  const [errored, setErrored] = useState(!client.logoUrl);

  return (
    <div className="group flex min-h-[90px] flex-col items-center justify-center gap-2.5 rounded-[10px] border border-brand-border bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-red hover:shadow-[0_12px_28px_-8px_rgba(169,18,24,0.2)]">
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
