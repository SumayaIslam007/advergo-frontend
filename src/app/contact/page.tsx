import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ContactInfoPanel } from "@/components/sections/contact/contact-info-panel";
import { ContactForm } from "@/components/sections/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with Advergo Sports & Fashion Wear Ltd. — phone, WhatsApp, email, and office/factory address.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-grey-light">
      <PageHeader
        eyebrow="Get in touch"
        title="Contact us"
        subtitle="Our team is ready to help with your order requirements."
      />
      <div className="mx-auto grid max-w-[1140px] grid-cols-1 gap-7 px-6 py-10 lg:grid-cols-[1fr_1.8fr]">
        <ContactInfoPanel />
        <ContactForm />
      </div>
    </div>
  );
}
