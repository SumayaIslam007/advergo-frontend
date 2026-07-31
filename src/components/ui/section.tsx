import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  background?: "white" | "grey" | "red" | "black";
  className?: string;
  id?: string;
}

const backgrounds: Record<NonNullable<SectionProps["background"]>, string> = {
  white: "bg-white",
  grey: "bg-brand-grey-light",
  red: "bg-brand-red",
  black: "bg-brand-black",
};

/** Consistent max-width + vertical padding wrapper used by every page section. */
export function Section({ children, background = "white", className, id }: SectionProps) {
  return (
    <section id={id} className={cn("px-6 py-16 sm:py-24", backgrounds[background])}>
      <div className={cn("mx-auto max-w-[1140px]", className)}>{children}</div>
    </section>
  );
}
