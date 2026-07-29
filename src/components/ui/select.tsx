import { type SelectHTMLAttributes } from "react";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

/** Labeled select, styled to match Field/TextareaField. */
export function SelectField({ label, id, children, ...props }: SelectFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 block text-xs font-semibold text-brand-grey-dark">
        {label}
      </label>
      <select
        id={fieldId}
        className="w-full rounded-[7px] border-[1.5px] border-brand-border bg-white px-3 py-2.5 text-[13px] text-black outline-none transition-colors focus:border-brand-red"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
