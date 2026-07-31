import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

/** Shared grid-item surface — hairline border at rest, lift + shadow on hover. */
export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-brand-border bg-white transition-all duration-300 ease-out",
        hover && "hover:-translate-y-1 hover:border-white hover:shadow-[0_20px_40px_-12px_rgba(15,17,23,0.14)]",
        className
      )}
    >
      {children}
    </div>
  );
}
