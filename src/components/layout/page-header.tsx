import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

/** Banner used at the top of every non-home page. */
export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="border-b border-brand-border bg-brand-grey-light px-6 pb-14 pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1140px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading as="h1" className="mb-2">
          {title}
        </Heading>
        {subtitle && <p className="max-w-[560px] text-[15px] leading-[1.7] text-brand-grey-dark">{subtitle}</p>}
      </div>
    </div>
  );
}
