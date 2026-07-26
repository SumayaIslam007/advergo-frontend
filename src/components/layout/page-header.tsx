interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

/** Banner used at the top of every non-home page. */
export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="border-b border-brand-border bg-brand-grey-light px-6 pb-11 pt-[52px]">
      <div className="mx-auto max-w-[1140px]">
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red">{eyebrow}</p>
        <h1 className="mb-2 text-[34px] font-extrabold tracking-[-0.5px] text-brand-red">{title}</h1>
        {subtitle && <p className="text-sm text-brand-grey-dark">{subtitle}</p>}
      </div>
    </div>
  );
}
