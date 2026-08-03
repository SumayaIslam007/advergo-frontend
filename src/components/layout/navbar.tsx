"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, LogOut, Menu, User as UserIcon, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AuthUser } from "@/types";
import { navLinks } from "./nav-links";

interface NavbarProps {
  user: AuthUser | null;
}

type Breakpoint = "base" | "sm" | "lg";

/** Matches Tailwind's default `sm` (640px) / `lg` (1024px) breakpoints. */
function getBreakpoint(width: number): Breakpoint {
  if (width >= 1024) return "lg";
  if (width >= 640) return "sm";
  return "base";
}

// Same size targets the original CSS breakpoint classes used
// (h-24 sm:h-28 / h-18 sm:h-20 for the bar, h-28 w-28 sm:h-32 sm:w-32
// lg:h-36 lg:w-36 / h-16 w-16 sm:h-[72px] sm:w-[72px] for the logo) --
// now driven as plain numbers since `motion`'s JS-driven animation (not a
// CSS `transition` class) is what avoids the stuck-height bug.
const BAR_HEIGHT: Record<Breakpoint, { open: number; scrolled: number }> = {
  base: { open: 96, scrolled: 72 },
  sm: { open: 112, scrolled: 80 },
  lg: { open: 112, scrolled: 80 },
};
const LOGO_SIZE: Record<Breakpoint, { open: number; scrolled: number }> = {
  base: { open: 112, scrolled: 64 },
  sm: { open: 128, scrolled: 72 },
  lg: { open: 144, scrolled: 72 },
};

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("base");

  useEffect(() => {
    const handleScroll = () => {
      // Hysteresis (different on/off thresholds) stops the state -- and the
      // bar-height animation it drives -- from flickering when scroll
      // position hovers right at the boundary.
      setScrolled((prev) => {
        const y = window.scrollY;
        if (prev && y < 8) return false;
        if (!prev && y > 32) return true;
        return prev;
      });
    };
    const handleResize = () => setBreakpoint(getBreakpoint(window.innerWidth));
    handleScroll();
    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const barHeight = scrolled ? BAR_HEIGHT[breakpoint].scrolled : BAR_HEIGHT[breakpoint].open;
  const logoSize = scrolled ? LOGO_SIZE[breakpoint].scrolled : LOGO_SIZE[breakpoint].open;

  const handleLogout = async () => {
    setMenuOpen(false);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/*
        `fixed`, not `sticky` -- deliberately. The bar's height needs to
        shrink on scroll, and a `sticky` element that changes its own height
        while pinned is what caused the earlier "jump" (browsers reflow
        everything below it the instant the height class flips, right in the
        middle of the user's scroll gesture). A `fixed` element is out of
        document flow entirely, so animating its height can never reflow
        anything -- the spacer div below stands in for it in the flow instead,
        and *that* is an ordinary block element, so its height transition
        reflows the page smoothly like any accordion, with no jump.
      */}
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled ? "border-brand-border bg-white/85 backdrop-blur-md" : "border-transparent bg-white"
        )}
      >
        <motion.div
          animate={{ height: barHeight }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex h-24 max-w-[1140px] items-center justify-between px-4 sm:px-6"
        >
          <Link href="/" className="flex shrink-0 items-center gap-3" onClick={() => setMenuOpen(false)}>
            <motion.div
              animate={{ height: logoSize, width: logoSize }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[10px]"
            >
              <Image src="/logo-header.png" alt="Advergo logo" fill sizes="112px" className="object-contain" />
            </motion.div>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-5 lg:flex xl:gap-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative pb-1.5 text-[14px] font-semibold whitespace-nowrap transition-colors xl:text-[15px]",
                    active ? "text-brand-black" : "text-brand-grey-dark hover:text-brand-black"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-brand-red"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-4 lg:flex">
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
              <Link
                href="/login"
                className="text-[14px] font-semibold whitespace-nowrap text-brand-grey-dark transition-colors hover:text-brand-red xl:text-[15px]"
              >
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
        </motion.div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-brand-border bg-white lg:hidden"
            >
              <div className="flex flex-col px-4 pt-2 pb-6">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "border-b border-brand-border py-3 text-[15px] font-semibold",
                        active ? "text-brand-black" : "text-brand-grey-dark"
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
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Stands in for the fixed nav's height in document flow -- see note above. */}
      <motion.div
        aria-hidden
        animate={{ height: barHeight }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="h-24"
      />
    </>
  );
}
