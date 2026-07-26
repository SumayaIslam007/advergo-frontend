import { cn } from "@/lib/utils";

interface HeadingProps {
  children: React.ReactNode;
  center?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

/** Section heading — the site's signature large red display heading. */
export function Heading({ children, center = false, as = "h2", className }: HeadingProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "mb-2 font-extrabold leading-[1.15] tracking-[-0.4px] text-brand-red",
        as === "h1" ? "text-3xl sm:text-[34px]" : "text-2xl sm:text-[30px]",
        center && "text-center",
        className
      )}
    >
      {children}
    </Tag>
  );
}
