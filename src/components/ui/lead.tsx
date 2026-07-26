import { cn } from "@/lib/utils";

interface LeadProps {
  children: React.ReactNode;
  center?: boolean;
  maxWidth?: number;
  className?: string;
}

export function Lead({ children, center = false, maxWidth = 540, className }: LeadProps) {
  return (
    <p
      className={cn("text-sm leading-[1.75] text-brand-grey-dark", center && "mx-auto text-center", className)}
      style={center ? { maxWidth } : undefined}
    >
      {children}
    </p>
  );
}
