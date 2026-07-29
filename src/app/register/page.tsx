"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, phone, password }),
    });

    if (response.ok) {
      router.push("/");
      router.refresh();
      return;
    }

    const data = await response.json().catch(() => null);
    if (data?.errors) {
      setFieldErrors(data.errors);
    }
    setFormError("Please fix the highlighted fields and try again.");
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-brand-grey-light">
      <PageHeader
        eyebrow="Account"
        title="Create an account"
        subtitle="Needed to place an order, track it, and download invoices."
      />
      <div className="mx-auto max-w-[420px] px-6 py-10">
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-9 shadow-[0_2px_16px_rgba(0,0,0,0.07)]">
          {formError && (
            <div className="mb-4 rounded-lg bg-red-50 p-3.5 text-xs font-semibold text-brand-red">{formError}</div>
          )}
          <div className="flex flex-col gap-4">
            <div>
              <Field label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" />
              {fieldErrors.fullName && <p className="mt-1 text-[11px] text-brand-red">{fieldErrors.fullName[0]}</p>}
            </div>
            <div>
              <Field
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
              {fieldErrors.email && <p className="mt-1 text-[11px] text-brand-red">{fieldErrors.email[0]}</p>}
            </div>
            <div>
              <Field
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 1XXX-XXXXXX"
              />
              {fieldErrors.phone && <p className="mt-1 text-[11px] text-brand-red">{fieldErrors.phone[0]}</p>}
            </div>
            <div>
              <Field
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
              />
              {fieldErrors.password && <p className="mt-1 text-[11px] text-brand-red">{fieldErrors.password[0]}</p>}
            </div>
          </div>
          <Button type="submit" disabled={submitting} className="mt-5 w-full justify-center py-3 text-[13px]">
            {submitting ? "Creating account…" : "Create account"}
          </Button>
          <p className="mt-4 text-center text-xs text-brand-grey-mid">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand-red hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
