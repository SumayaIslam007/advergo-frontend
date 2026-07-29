"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  src: string | null;
  alt: string;
  height?: number;
  className?: string;
  sizes?: string;
}

/**
 * Renders a next/image, falling back to a dashed placeholder box if the
 * source is empty or fails to load (used for content awaiting real photos).
 */
export function ImageWithFallback({ src, alt, height = 220, className, sizes }: ImageWithFallbackProps) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-dashed border-brand-border bg-gray-100",
          className
        )}
        style={{ height }}
      >
        <ImageOff size={22} className="text-gray-400" />
        <p className="text-[11px] text-gray-400">Photo coming soon</p>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg", className)} style={{ height }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 400px"}
        className="object-cover"
        onError={() => setErrored(true)}
      />
    </div>
  );
}
