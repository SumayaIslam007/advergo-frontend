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
        "mb-3 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] text-brand-red uppercase",
        center && "w-full justify-center",
        className
      )}
    >
      <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-brand-red" aria-hidden />
      {children}
    </p>
  );
}
