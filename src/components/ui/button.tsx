import { type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-md font-bold transition-all duration-150 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand-red text-white hover:bg-brand-red-dark hover:-translate-y-px",
        outline: "border-[1.5px] border-brand-red text-brand-red hover:bg-brand-red hover:text-white hover:-translate-y-px",
        ghost: "border-[1.5px] border-brand-border text-brand-grey-dark hover:bg-brand-grey-dark hover:text-white",
        onDark: "border-[1.5px] border-white/60 text-white hover:border-white bg-transparent",
        onDarkSolid: "bg-white text-brand-red hover:scale-[1.04]",
      },
      size: {
        sm: "px-3.5 py-1.5 text-xs",
        md: "px-4.5 py-2.5 text-xs",
        lg: "px-7 py-3 text-[13px]",
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
