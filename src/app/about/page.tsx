import type { Metadata } from "next";
import { Eye, Target } from "lucide-react";
import { Achievements } from "@/components/sections/about/achievements";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { PageHeader } from "@/components/layout/page-header";
import { getAchievements, getCompanyInfoSafe, safe } from "@/lib/api";

export const metadata: Metadata = {
  title: "About us",
  description: "Learn about Advergo Sports & Fashion Wear Ltd. — a custom sportswear manufacturer based in Dhaka, Bangladesh, since 2019.",
};

const capabilityStats = [
  { icon: "👷", label: "Skilled workforce", value: "200+ workers" },
  { icon: "🖨️", label: "Printing machine", value: "62-inch precision" },
  { icon: "🧵", label: "Sewing machines", value: "60-70 industrial units" },
  { icon: "📦", label: "Daily capacity", value: "2,000+ pieces" },
];

export default async function AboutPage() {
  const [company, achievements] = await Promise.all([getCompanyInfoSafe(), safe(getAchievements(), [])]);

  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Company"
        title="About Advergo"
        subtitle="Premium sportswear manufacturer from Bangladesh — since 2019."
      />

      <Section background="white">
        <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <Heading>Quality with commitment</Heading>
            <p className="my-4 text-sm leading-[1.8] text-brand-grey-dark">
              Founded in {company.founded} under the visionary leadership of Managing Director{" "}
              <strong>{company.md}</strong>, Advergo Sports &amp; Fashion Wear Ltd. has rapidly emerged as a
              reliable name in the apparel manufacturing industry.
            </p>
            <p className="mb-6 text-sm leading-[1.8] text-brand-grey-dark">
              Operating from a dedicated 6,000 SFT facility, we blend modern technology with skilled
              craftsmanship to produce premium Sports Jerseys, Trousers, Jackets, ID Card Ribbons, and Caps —
              for both local and international markets.
            </p>
            <Button href="/quote">Get a custom quote</Button>
          </div>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=440&fit=crop"
            alt="Advergo factory floor"
            height={360}
          />
        </Reveal>
      </Section>

      <Section background="grey">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="group flex overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(15,17,23,0.2)]">
              <div
                className="relative flex w-24 shrink-0 items-center justify-center overflow-hidden bg-brand-black sm:w-32"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0 3px, transparent 3px 14px)",
                }}
              >
                <Target size={30} className="text-brand-red transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex-1 p-7">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red">Our mission</p>
                <h3 className="mb-3 font-heading text-xl font-bold leading-tight text-brand-black">
                  Empowering athletes &amp; organisations
                </h3>
                <p className="text-[13px] leading-[1.8] text-brand-grey-dark">
                  To provide high-quality, innovative, and durable sports and fashion apparel that empowers
                  athletes and organisations to perform at their best. We are committed to excellence in
                  manufacturing, timely delivery, and building lasting partnerships through superior craftsmanship
                  and personalised service.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="group flex overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(169,18,24,0.25)]">
              <div
                className="relative flex w-24 shrink-0 items-center justify-center overflow-hidden bg-[linear-gradient(165deg,var(--color-brand-red)_0%,var(--color-brand-red-dark)_55%,var(--color-brand-red-deep)_100%)] sm:w-32"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(115deg, rgba(255,255,255,0.08) 0 3px, transparent 3px 14px), linear-gradient(165deg, var(--color-brand-red) 0%, var(--color-brand-red-dark) 55%, var(--color-brand-red-deep) 100%)",
                }}
              >
                <Eye size={30} className="text-white transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex-1 p-7">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red">Our vision</p>
                <h3 className="mb-3 font-heading text-xl font-bold leading-tight text-brand-black">
                  A leading global name in sportswear
                </h3>
                <p className="text-[13px] leading-[1.8] text-brand-grey-dark">
                  To become a leading global name in the sports and fashion apparel industry, recognised for our
                  innovation, sustainable practices, and unwavering commitment to quality. We aim to set new
                  benchmarks in textile manufacturing, ensuring every garment reflects the spirit of excellence.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section background="white">
        <Reveal className="mb-11 text-center">
          <Eyebrow center>Infrastructure</Eyebrow>
          <Heading center>Production capability</Heading>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {capabilityStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <Card className="p-6 text-center">
                <div className="mb-3 text-[30px]">{s.icon}</div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-grey-mid">
                  {s.label}
                </p>
                <p className="text-base font-extrabold text-brand-red">{s.value}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Achievements achievements={achievements} />
    </div>
  );
}
