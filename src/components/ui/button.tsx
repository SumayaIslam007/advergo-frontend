import { type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition-all duration-300 ease-out whitespace-nowrap active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[linear-gradient(135deg,var(--color-brand-red)_0%,var(--color-brand-red-dark)_55%,var(--color-brand-red-deep)_100%)] text-white shadow-[0_8px_20px_-6px_rgba(169,18,24,0.45)] hover:-translate-y-[3px] hover:shadow-[0_16px_32px_-8px_rgba(169,18,24,0.55)]",
        outline: "border border-brand-border text-brand-black hover:border-brand-red hover:text-brand-red",
        ghost: "text-brand-grey-dark hover:bg-brand-grey-light hover:text-brand-black",
        onDark: "border border-white/30 text-white hover:border-white/70 hover:bg-white/10",
        onDarkSolid: "bg-white text-brand-black hover:bg-white/90",
      },
      size: {
        sm: "px-3.5 py-1.5 text-xs",
        md: "px-5 py-2.5 text-[13px]",
        lg: "px-7 py-3.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  href?: string;
  children: ReactNode;
}

/**
 * Single button primitive replacing the old BtnRed / BtnOut / BtnGhost trio.
 * Pass `href` to render as a Next.js <Link> instead of a <button>.
 */
export function Button({ variant, size, href, className, children, ...props }: ButtonProps) {
  const classes = cn(buttonStyles({ variant, size }), className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
