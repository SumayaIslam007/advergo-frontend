import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { QuoteForm } from "@/components/sections/quote/quote-form";

export const metadata: Metadata = {
  title: "Get a custom quote",
  description: "Submit your custom sportswear requirements to Advergo — no payment required upfront.",
};

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-brand-grey-light">
      <PageHeader
        eyebrow="No payment required"
        title="Get a custom quote"
        subtitle="Submit your requirements — we'll contact you directly to confirm and finalise."
      />
      <div className="mx-auto max-w-[760px] px-6 py-10">
        <QuoteForm />
      </div>
    </div>
  );
}
