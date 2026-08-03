"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    if (response.ok) {
      router.push(searchParams.get("redirect") || "/");
      router.refresh();
    } else {
      setError("That email/phone or password doesn't match our records.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-full bg-brand-grey-light">
      <PageHeader eyebrow="Account" title="Log in" subtitle="Access your orders, invoices, and wishlist." />
      <div className="mx-auto max-w-[420px] px-6 py-10">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-brand-border bg-white p-9">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3.5 text-xs font-semibold text-brand-red">{error}</div>
          )}
          <div className="flex flex-col gap-4">
            <Field
              label="Email or phone"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@example.com or +880…"
            />
            <Field
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" disabled={submitting} className="mt-5 w-full justify-center py-3 text-[13px]">
            {submitting ? "Logging in…" : "Log in"}
          </Button>
          <p className="mt-4 text-center text-xs text-brand-grey-mid">
            No account yet?{" "}
            <Link href="/register" className="font-semibold text-brand-red hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
