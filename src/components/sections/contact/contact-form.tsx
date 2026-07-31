"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { TextareaField } from "@/components/ui/textarea";
import type { ContactFormValues } from "@/types";

const initialValues: ContactFormValues = { name: "", contact: "", message: "" };

/** UI-only contact form — no backend wired up yet (see quote-form.tsx note). */
export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [sent, setSent] = useState(false);

  const update = <K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setValues(initialValues);
  };

  return (
    <div className="rounded-2xl border border-brand-border bg-white p-9">
      <h3 className="mb-5.5 text-lg font-bold text-brand-black">Send us a message</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Your name" required value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="Full name" />
        <Field
          label="Email or phone"
          required
          value={values.contact}
          onChange={(e) => update("contact", e.target.value)}
          placeholder="email@example.com or +880…"
        />
        <TextareaField
          label="Message"
          rows={6}
          required
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us about your requirements…"
        />
        <Button type="submit" className="w-full justify-center py-3 text-[13px]">
          Send message
        </Button>
        {sent && <p className="text-center text-xs font-semibold text-green-600">Message sent — we&apos;ll be in touch soon.</p>}
      </form>
    </div>
  );
}
