import { cn } from "@/lib/utils";

interface HeadingProps {
  children: React.ReactNode;
  center?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

/** Section heading — confident near-black display type; hierarchy comes from size/weight, not color. */
export function Heading({ children, center = false, as = "h2", className }: HeadingProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "mb-3 text-balance font-bold leading-[1.12] text-brand-black",
        as === "h1"
          ? "text-[2.25rem] tracking-[-0.02em] sm:text-[3rem]"
          : "text-[1.625rem] tracking-[-0.015em] sm:text-[2.125rem]",
        center && "text-center",
        className
      )}
    >
      {children}
    </Tag>
  );
}
