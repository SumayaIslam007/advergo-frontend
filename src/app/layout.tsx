import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { getCompanyInfoSafe } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth/server-fetch";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-heading",
  weight: ["600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Advergo - Sports & Fashion Wear Ltd.",
    template: "%s | Advergo Sports & Fashion Wear Ltd.",
  },
  description:
    "Advergo Sports & Fashion Wear Ltd., a premier custom sportswear manufacturer in Bangladesh, offering football, cricket, cycling, marathon, and corporate apparel.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [company, user] = await Promise.all([getCompanyInfoSafe(), getCurrentUser()]);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Navbar user={user} />
        <main className="flex-1">{children}</main>
        <Footer company={company} />
        <WhatsAppButton company={company} />
      </body>
    </html>
  );
}
