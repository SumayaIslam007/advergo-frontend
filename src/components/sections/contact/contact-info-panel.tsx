import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getCompanyInfoSafe } from "@/lib/api";

export async function ContactInfoPanel() {
  const company = await getCompanyInfoSafe();
  const digitsOnly = company.phone.replace(/[^\d]/g, "");

  const infoRows = [
    { icon: Phone, label: "Phone", value: company.phone },
    { icon: MessageCircle, label: "WhatsApp", value: company.phone },
    { icon: Mail, label: "Email", value: company.email },
    { icon: MapPin, label: "Head office", value: company.headOffice },
    { icon: MapPin, label: "Factory", value: company.factory },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-brand-black p-7">
        <h3 className="mb-5.5 text-base font-bold text-white">Contact information</h3>
        {infoRows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="mb-4.5 flex items-start gap-3">
            <div className="mt-0.5 flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-md bg-brand-red/25 text-brand-red">
              <Icon size={15} />
            </div>
            <div>
              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">{label}</p>
              <p className="text-[13px] font-medium leading-relaxed text-white">{value}</p>
            </div>
          </div>
        ))}
        <a
          href={`https://wa.me/${digitsOnly}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center gap-2.5 rounded-lg bg-[#25d366] px-4 py-2.5"
        >
          <MessageCircle size={16} className="fill-white text-white" />
          <span className="text-[13px] font-bold text-white">Chat on WhatsApp</span>
        </a>
      </div>

      <div className="rounded-2xl border border-brand-border bg-white p-5.5">
        <p className="mb-2 text-sm font-bold text-brand-red">Business hours</p>
        <p className="text-[13px] leading-[1.85] text-brand-grey-dark">
          Saturday – Thursday: 9:00 AM – 7:00 PM
          <br />
          Friday: Closed
        </p>
      </div>
    </div>
  );
}
