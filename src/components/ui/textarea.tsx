import { type TextareaHTMLAttributes } from "react";

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextareaField({ label, id, className, rows = 4, ...props }: TextareaFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 block text-xs font-semibold text-brand-grey-dark">
        {label}
      </label>
      <textarea
        id={fieldId}
        rows={rows}
        className="w-full resize-y rounded-[7px] border-[1.5px] border-brand-border bg-white px-3 py-2.5 text-[13px] text-black outline-none transition-colors focus:border-brand-red"
        {...props}
      />
    </div>
  );
}
