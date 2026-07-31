import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { PageHeader } from "@/components/layout/page-header";
import { getCompanyInfoSafe } from "@/lib/api";

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
  const company = await getCompanyInfoSafe();

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
            <Card className="p-8" hover={false}>
              <Eyebrow>Our mission</Eyebrow>
              <h3 className="mb-3.5 text-lg font-bold leading-tight text-brand-black">
                Empowering athletes &amp; organisations
              </h3>
              <p className="text-[13px] leading-[1.8] text-brand-grey-dark">
                To provide high-quality, innovative, and durable sports and fashion apparel that empowers
                athletes and organisations to perform at their best. We are committed to excellence in
                manufacturing, timely delivery, and building lasting partnerships through superior craftsmanship
                and personalised service.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="p-8" hover={false}>
              <Eyebrow>Our vision</Eyebrow>
              <h3 className="mb-3.5 text-lg font-bold leading-tight text-brand-black">
                A leading global name in sportswear
              </h3>
              <p className="text-[13px] leading-[1.8] text-brand-grey-dark">
                To become a leading global name in the sports and fashion apparel industry, recognised for our
                innovation, sustainable practices, and unwavering commitment to quality. We aim to set new
                benchmarks in textile manufacturing, ensuring every garment reflects the spirit of excellence.
              </p>
            </Card>
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
    </div>
  );
}
