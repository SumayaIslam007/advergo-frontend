import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Lead } from "@/components/ui/lead";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import type { ProcessStep } from "@/types";

interface HowItWorksProps {
  steps: ProcessStep[];
}

export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <Section background="white">
      <Reveal className="mb-12 text-center">
        <Eyebrow center>Simple process</Eyebrow>
        <Heading center>How to order</Heading>
        <div className="mt-2.5">
          <Lead center>No payment required upfront — submit your request and we contact you.</Lead>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.08}>
            <Card className="p-7" hover={false}>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-xs font-black text-white">
                {step.number}
              </div>
              <p className="mb-2.5 text-[15px] font-bold text-brand-black">{step.title}</p>
              <p className="text-[13px] leading-[1.7] text-brand-grey-dark">{step.description}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
