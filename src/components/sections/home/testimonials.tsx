import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Stars } from "@/components/ui/stars";
import type { Review } from "@/types";

interface TestimonialsProps {
  reviews: Review[];
}

export function Testimonials({ reviews }: TestimonialsProps) {
  return (
    <Section background="white">
      <div className="mb-11 text-center">
        <Eyebrow center>Testimonials</Eyebrow>
        <Heading center>What our clients say</Heading>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.name} className="rounded-xl bg-brand-grey-light p-7 shadow-[0_2px_16px_rgba(0,0,0,0.07)]">
            <div className="mb-3.5">
              <Stars rating={review.rating} />
            </div>
            <p className="mb-5 text-[13px] italic leading-[1.8] text-brand-grey-dark">&ldquo;{review.text}&rdquo;</p>
            <p className="mb-0.5 text-sm font-bold text-black">{review.name}</p>
            <p className="text-xs text-brand-grey-mid">{review.organization}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
