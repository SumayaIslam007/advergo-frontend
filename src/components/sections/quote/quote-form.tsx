"use client";

import { useState, type FormEvent } from "react";
import { Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { TextareaField } from "@/components/ui/textarea";
import type { QuoteFormValues } from "@/types";

const initialValues: QuoteFormValues = {
  name: "",
  phone: "",
  email: "",
  category: "",
  product: "",
  quantity: "",
  sizeBreakdown: "",
  notes: "",
};

/**
 * UI-only for now (per project decision): no backend is wired up yet.
 * Swap the handleSubmit body for a Server Action call when the intake
 * pipeline (email / sheet / DB) is ready — see actions/submit-quote.ts stub.
 */
export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [values, setValues] = useState<QuoteFormValues>(initialValues);

  const update = <K extends keyof QuoteFormValues>(key: K, value: QuoteFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: replace with a Server Action once a submission backend is chosen.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-[400px] flex-col items-center justify-center rounded-2xl bg-white p-14 text-center shadow-[0_2px_16px_rgba(0,0,0,0.07)]">
        <div className="mb-4.5 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-brand-red/10">
          <Check size={28} className="text-brand-red" />
        </div>
        <h2 className="mb-2.5 text-xl font-extrabold text-black">Request submitted!</h2>
        <p className="mb-6 text-[13px] leading-[1.75] text-brand-grey-dark">
          Our team will contact you within 24 hours at your phone/WhatsApp to confirm details. No payment is
          required at this stage.
        </p>
        <Button
          onClick={() => {
            setValues(initialValues);
            setFile(null);
            setSubmitted(false);
          }}
        >
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-9 shadow-[0_2px_16px_rgba(0,0,0,0.07)]">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name *" required value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
        <Field label="Phone / WhatsApp *" required value={values.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+880 1XXX-XXXXXX" />
        <Field label="Email address" type="email" value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="your@email.com" />
        <Field label="Sport category *" required value={values.category} onChange={(e) => update("category", e.target.value)} placeholder="Football, Cricket, Cycling…" />
        <Field label="Product type *" required value={values.product} onChange={(e) => update("product", e.target.value)} placeholder="Jersey, Trouser, Polo…" />
        <Field label="Quantity *" required value={values.quantity} onChange={(e) => update("quantity", e.target.value)} placeholder="e.g. 25 pieces" />
      </div>

      <div className="mt-4">
        <Field
          label="Size breakdown"
          value={values.sizeBreakdown}
          onChange={(e) => update("sizeBreakdown", e.target.value)}
          placeholder="e.g. 5×S, 10×M, 8×L, 2×XL"
        />
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-semibold text-brand-grey-dark">Upload design file</label>
        <label className="flex cursor-pointer flex-col items-center rounded-lg border-[1.5px] border-dashed border-brand-border bg-brand-grey-light px-5 py-7 text-center transition-colors hover:border-brand-red">
          <Upload size={22} className="mb-2 text-brand-grey-mid" />
          <span className="mb-0.5 text-[13px] font-semibold text-brand-grey-dark">
            {file ? file.name : "Click to upload your design"}
          </span>
          <span className="text-[11px] text-brand-grey-mid">Supports .ai · .jpg · .png · .pdf (max 20 MB)</span>
          <input
            type="file"
            className="hidden"
            accept=".ai,.jpg,.jpeg,.png,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      <div className="mt-4">
        <TextareaField
          label="Additional notes"
          rows={4}
          value={values.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Colour preferences, deadline, special requirements…"
        />
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-brand-grey-light p-3.5">
        <Check size={14} className="mt-0.5 shrink-0 text-brand-red" />
        <p className="text-xs leading-[1.65] text-brand-grey-dark">
          <strong>No payment required to submit.</strong> After reviewing your request, our team will contact
          you by phone or WhatsApp to confirm details and discuss payment.
        </p>
      </div>

      <Button type="submit" className="mt-5 w-full justify-center py-3 text-[13px]">
        Submit order request
      </Button>
    </form>
  );
}
