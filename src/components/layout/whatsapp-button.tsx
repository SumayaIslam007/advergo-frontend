import { MessageCircle } from "lucide-react";
import type { CompanyInfo } from "@/types";

interface WhatsAppButtonProps {
  company: CompanyInfo;
}

/** Floating WhatsApp CTA — links straight to a pre-filled chat. */
export function WhatsAppButton({ company }: WhatsAppButtonProps) {
  const digitsOnly = company.phone.replace(/[^\d]/g, "");
  return (
    <a
      href={`https://wa.me/${digitsOnly}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-[999] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#25d366] shadow-[0_4px_18px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25d366]/60 [animation-duration:2.5s] group-hover:hidden" />
      <MessageCircle size={22} className="fill-white text-white" />
    </a>
  );
}
