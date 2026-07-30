"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks } from "./nav-links";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-brand-border bg-white shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-20 max-w-[1140px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-[10px]">
            <Image src="/logo-header.png" alt="Advergo logo" fill className="object-contain" />
          </div>
          {/* <div>
            <div className="text-sm font-extrabold tracking-[0.04em] text-black">ADVERGO</div>
            <div className="text-[9px] tracking-[0.1em] text-brand-grey-mid">
              SPORTS &amp; FASHION WEAR LTD.
            </div>
          </div> */}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "border-b-2 border-transparent pb-0.5 text-[15px] font-semibold transition-colors",
                  active ? "border-brand-red text-brand-red" : "text-brand-grey-dark hover:text-brand-red"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Button href="/quote" size="sm" className="text-sm">
            Get a quote
          </Button>
        </div>
      </div>
    </nav>
  );
}
