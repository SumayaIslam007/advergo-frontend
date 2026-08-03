import { cn } from "@/lib/utils";

interface HeadingProps {
  children: React.ReactNode;
  center?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

/**
 * Section heading — bold condensed display type (Oswald) for a punchier,
 * more "sports branding" feel than the body sans. When passed a plain string,
 * the last word is highlighted in brand red so every title carries a black +
 * red two-tone accent instead of being solid black.
 */
export function Heading({ children, center = false, as = "h2", className }: HeadingProps) {
  const Tag = as;

  let content = children;
  if (typeof children === "string") {
    const words = children.trim().split(" ");
    const last = words.pop();
    content = (
      <>
        {words.length > 0 && `${words.join(" ")} `}
        <span className="text-brand-red">{last}</span>
      </>
    );
  }

  return (
    <Tag
      className={cn(
        "mb-3 text-balance font-heading font-bold leading-[1.1] tracking-[-0.01em] text-brand-black",
        as === "h1" ? "text-[2.75rem] sm:text-[3.75rem]" : "text-[2rem] sm:text-[2.625rem]",
        center && "text-center",
        className
      )}
    >
      {content}
    </Tag>
  );
}
