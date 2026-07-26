import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Lead } from "@/components/ui/lead";
import { Section } from "@/components/ui/section";
import type { ProcessStep } from "@/types";

interface HowItWorksProps {
  steps: ProcessStep[];
}

export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <Section background="white">
      <div className="mb-[50px] text-center">
        <Eyebrow center>Simple process</Eyebrow>
        <Heading center>How to order</Heading>
        <div className="mt-2.5">
          <Lead center>No payment required upfront — submit your request and we contact you.</Lead>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-xl border-t-[3px] border-brand-red bg-brand-grey-light p-7 shadow-[0_2px_16px_rgba(0,0,0,0.07)]"
          >
            <div className="mb-3.5 text-[26px]">{step.emoji}</div>
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-red">
              Step {step.number}
            </p>
            <p className="mb-2.5 text-[15px] font-bold text-black">{step.title}</p>
            <p className="text-[13px] leading-[1.7] text-brand-grey-dark">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
