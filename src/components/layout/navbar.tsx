"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, LogOut, Menu, User as UserIcon, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AuthUser } from "@/types";
import { navLinks } from "./nav-links";

interface NavbarProps {
  user: AuthUser | null;
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    setMenuOpen(false);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-brand-border bg-white shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-24 max-w-[1140px] items-center justify-between px-4 sm:h-28 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" onClick={() => setMenuOpen(false)}>
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[10px] sm:h-32 sm:w-32 lg:h-36 lg:w-36">
            <Image src="/logo-header.png" alt="Advergo logo" fill className="object-contain" />
          </div>
        </Link>

        <div className="hidden items-center gap-5 lg:flex xl:gap-6">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "border-b-2 border-transparent pb-0.5 text-[14px] font-semibold whitespace-nowrap transition-colors xl:text-[15px]",
                  active ? "border-brand-red text-brand-red" : "text-brand-grey-dark hover:text-brand-red"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/wishlist"
                aria-label="My wishlist"
                className="text-brand-grey-dark transition-colors hover:text-brand-red"
              >
                <Heart size={17} />
              </Link>
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-brand-grey-dark">
                <UserIcon size={14} /> {user.fullName || user.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Log out"
                className="text-brand-grey-mid transition-colors hover:text-brand-red"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-[13px] font-semibold text-brand-grey-dark hover:text-brand-red">
              Log in
            </Link>
          )}

          <Button href="/quote" size="sm" className="text-sm">
            Get a quote
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center text-brand-grey-dark lg:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-brand-border bg-white px-4 pt-2 pb-6 lg:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "border-b border-brand-border py-3 text-[15px] font-semibold",
                    active ? "text-brand-red" : "text-brand-grey-dark"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {user ? (
              <>
                <Link
                  href="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 border-b border-brand-border py-3 text-[15px] font-semibold text-brand-grey-dark"
                >
                  <Heart size={17} /> Wishlist
                </Link>
                <div className="flex items-center gap-1.5 py-3 text-[13px] font-semibold text-brand-grey-dark">
                  <UserIcon size={14} /> {user.fullName || user.email}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-3 text-left text-[15px] font-semibold text-brand-grey-mid"
                >
                  <LogOut size={16} /> Log out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="border-b border-brand-border py-3 text-[15px] font-semibold text-brand-grey-dark"
              >
                Log in
              </Link>
            )}

            <Button href="/quote" className="mt-4 w-full justify-center" onClick={() => setMenuOpen(false)}>
              Get a quote
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
