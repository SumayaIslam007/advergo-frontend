import { type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

/** Labeled select, styled to match Field/TextareaField. */
export function SelectField({ label, id, className, children, ...props }: SelectFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 block text-xs font-semibold text-brand-grey-dark">
        {label}
      </label>
      <select
        id={fieldId}
        className={cn(
          "w-full rounded-lg border border-brand-border bg-white px-3.5 py-2.5 text-[13px] text-brand-black outline-none transition-all duration-150 focus:border-brand-red focus:ring-4 focus:ring-brand-red/10",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
