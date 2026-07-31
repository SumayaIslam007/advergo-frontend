import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Lead } from "@/components/ui/lead";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import type { Achievement } from "@/types";

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  return (
    <Section background="grey">
      <Reveal className="mb-11 text-center">
        <Eyebrow center>Legal &amp; certifications</Eyebrow>
        <Heading center>Our official documents</Heading>
        <div className="mt-2.5">
          <Lead center>
            Fully registered, certified, and compliant — established in Bangladesh since 2019.
          </Lead>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <Card className="overflow-hidden">
              <div className="flex h-[120px] items-center justify-center bg-brand-grey-light">
                <span className="text-[40px]">{item.icon}</span>
              </div>
              <div className="px-4 py-4.5">
                <p className="mb-1 text-[13px] font-bold leading-tight text-brand-black">{item.title}</p>
                <p className="mb-1 text-[11px] font-semibold text-brand-red">{item.year}</p>
                <p className="text-[11px] leading-tight text-brand-grey-mid">{item.issuingBody}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
