import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/lib/data";
import { navLinks } from "./nav-links";

const categoryLinks = [
  { label: "Football", href: "/products?category=football" },
  { label: "Cricket", href: "/products?category=cricket" },
  { label: "Cycling", href: "/products?category=cycling" },
  { label: "Marathon", href: "/products?category=marathon" },
  { label: "Corporate", href: "/products?category=corporate" },
];

const legalLinks = ["Privacy policy", "Terms & conditions", "Return policy"];

export function Footer() {
  return (
    <footer className="bg-[#0f1117] px-6 pb-7 pt-14 text-white">
      <div className="mx-auto max-w-[1140px]">
        <div className="mb-10 grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr]">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-[10px]">
                <Image src="/logo-footer.png" alt="Advergo logo" fill className="object-contain" />
              </div>
              {/* <div>
                <div className="text-[13px] font-extrabold tracking-[0.04em]">ADVERGO</div>
                <div className="text-[9px] tracking-[0.1em] text-gray-500">SPORTS &amp; FASHION WEAR LTD.</div>
              </div> */}
            </div>
            <p className="mb-3.5 max-w-[240px] text-[13px] leading-[1.75] text-gray-400">
              Premium custom sportswear manufacturer since 2019. Serving 10,000+ local and international
              buyers with quality and commitment.
            </p>
            <p className="text-[11px] text-gray-500">{company.website}</p>
          </div>

          <div>
            <p className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-red">Pages</p>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="mb-2.5 block text-[13px] text-gray-400 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <p className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-red">Categories</p>
            {categoryLinks.map((link) => (
              <Link key={link.label} href={link.href} className="mb-2.5 block text-[13px] text-gray-400 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <p className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-red">Contact</p>
            {[
              { icon: Phone, value: company.phone },
              { icon: Mail, value: company.email },
              { icon: MapPin, value: "Uttara, Dhaka-1230" },
            ].map(({ icon: Icon, value }, i) => (
              <div key={i} className="mb-3 flex items-start gap-2.5">
                <Icon size={13} className="mt-0.5 shrink-0 text-brand-red" />
                <span className="text-[13px] leading-relaxed text-gray-400">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-800 pt-5 sm:flex-row">
          <p className="text-[11px] text-gray-600">
            © {new Date().getFullYear()} {company.name} All rights reserved.
          </p>
          <div className="flex gap-4.5">
            {legalLinks.map((label) => (
              <span key={label} className="cursor-pointer text-[11px] text-gray-600 hover:text-gray-400">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
