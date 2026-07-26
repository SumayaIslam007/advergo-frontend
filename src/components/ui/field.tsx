import { type InputHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

/** Labeled text input with the brand's red focus ring. */
export function Field({ label, id, className, ...props }: FieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-xs font-semibold text-brand-grey-dark">
        {label}
      </label>
      <input
        id={inputId}
        className="w-full rounded-[7px] border-[1.5px] border-brand-border bg-white px-3 py-2.5 text-[13px] text-black outline-none transition-colors focus:border-brand-red"
        {...props}
      />
    </div>
  );
}
