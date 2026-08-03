import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Lead } from "@/components/ui/lead";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import type { Achievement } from "@/types";

interface AchievementsProps {
  achievements: Achievement[];
}

function AchievementGrid({ items }: { items: Achievement[] }) {
  return (
    <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.06}>
          <Card className="overflow-hidden">
            <ImageWithFallback src={item.image} alt={item.title} height={140} className="rounded-none" />
            <div className="px-4 py-4.5">
              <p className="mb-1 text-[13px] font-bold leading-tight text-brand-black">{item.title}</p>
              <p className="mb-1 text-[11px] font-semibold text-brand-red">{item.year}</p>
              <p className="text-[11px] leading-tight text-brand-grey-mid">{item.issuingBody}</p>
            </div>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}

export function Achievements({ achievements }: AchievementsProps) {
  const documents = achievements.filter((item) => item.kind === "document");
  const awards = achievements.filter((item) => item.kind === "award");

  if (documents.length === 0 && awards.length === 0) return null;

  return (
    <Section background="grey">
      <Reveal className="mb-11 text-center">
        <Eyebrow center>Trust &amp; recognition</Eyebrow>
        <Heading center>Legitimacy &amp; recognition</Heading>
        <div className="mt-2.5">
          <Lead center>
            Fully registered, certified, and compliant — established in Bangladesh since 2019.
          </Lead>
        </div>
      </Reveal>

      {documents.length > 0 && (
        <div className={awards.length > 0 ? "mb-11" : undefined}>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-brand-black">
            Legal &amp; registration
          </h3>
          <AchievementGrid items={documents} />
        </div>
      )}

      {awards.length > 0 && (
        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-brand-black">
            Awards &amp; recognition
          </h3>
          <AchievementGrid items={awards} />
        </div>
      )}
    </Section>
  );
}
