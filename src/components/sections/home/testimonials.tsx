import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Stars } from "@/components/ui/stars";
import type { Review } from "@/types";

interface TestimonialsProps {
  reviews: Review[];
}

export function Testimonials({ reviews }: TestimonialsProps) {
  return (
    <Section background="white">
      <Reveal className="mb-11 text-center">
        <Eyebrow center>Testimonials</Eyebrow>
        <Heading center>What our clients say</Heading>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <Reveal key={review.name} delay={i * 0.06}>
            <Card className="p-7" hover={false}>
              <div className="mb-3.5">
                <Stars rating={review.rating} />
              </div>
              <p className="mb-5 text-[13px] italic leading-[1.8] text-brand-grey-dark">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mb-0.5 text-sm font-bold text-brand-black">{review.name}</p>
              <p className="text-xs text-brand-grey-mid">{review.organization}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
