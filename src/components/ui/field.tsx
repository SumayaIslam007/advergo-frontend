import { type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

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
        className={cn(
          "w-full rounded-lg border border-brand-border bg-white px-3.5 py-2.5 text-[13px] text-brand-black outline-none transition-all duration-150 focus:border-brand-red focus:ring-4 focus:ring-brand-red/10",
          className
        )}
        {...props}
      />
    </div>
  );
}
