"use client";

import { useState } from "react";
import Image from "next/image";
import type { ClientLogo } from "@/types";

interface ClientLogoCardProps {
  client: ClientLogo;
}

export function ClientLogoCard({ client }: ClientLogoCardProps) {
  const logoSrc = client.logo || client.logoUrl || null;
  const [errored, setErrored] = useState(!logoSrc);

  return (
    <div
      title={client.name}
      className="group flex h-26 items-center justify-center rounded-xl border border-brand-border bg-white px-3 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-[0_16px_32px_-12px_rgba(169,18,24,0.22)]"
    >
      {!errored && logoSrc ? (
        <div className="relative h-16 w-full">
          <Image
            src={logoSrc}
            alt={client.name}
            fill
            className="object-contain"
            onError={() => setErrored(true)}
          />
        </div>
      ) : (
        <span className="text-center text-[12px] font-bold leading-tight text-brand-grey-dark transition-colors duration-300 group-hover:text-brand-red">
          {client.name}
        </span>
      )}
    </div>
  );
}
