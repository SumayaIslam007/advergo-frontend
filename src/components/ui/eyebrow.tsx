import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}

export function Eyebrow({ children, center = false, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "mb-2.5 text-[11px] font-bold tracking-[0.16em] text-brand-red uppercase",
        center && "text-center",
        className
      )}
    >
      {children}
    </p>
  );
}
