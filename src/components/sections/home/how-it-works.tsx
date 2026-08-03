import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Lead } from "@/components/ui/lead";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
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
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
        {steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.08}>
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex w-full items-center">
                <span
                  className={cn(
                    "hidden h-0.5 flex-1 sm:block",
                    i === 0 ? "bg-transparent" : "bg-brand-border"
                  )}
                />
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-red text-sm font-black text-white">
                  {step.number}
                </div>
                <span
                  className={cn(
                    "hidden h-0.5 flex-1 sm:block",
                    i === steps.length - 1 ? "bg-transparent" : "bg-brand-border"
                  )}
                />
              </div>
              <p className="mb-2.5 text-[15px] font-bold text-brand-black">{step.title}</p>
              <p className="text-[13px] leading-[1.7] text-brand-grey-dark">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
