import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-red px-6 py-[72px]">
      <div className="pointer-events-none absolute right-[-24px] top-1/2 hidden -translate-y-1/2 select-none text-[120px] font-black leading-none text-white opacity-[0.06] sm:block lg:text-[180px]">
        CUSTOM
      </div>
      <div className="relative mx-auto max-w-[1140px] text-center">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
          No payment required
        </p>
        <h2 className="mb-3.5 text-[32px] font-black tracking-[-0.4px] text-white">
          Have your own design?
        </h2>
        <p className="mx-auto mb-7 max-w-[460px] text-[15px] leading-[1.7] text-white/80">
          Upload your design file (.ai, .jpg, .png) and get a quote. We contact you directly to confirm and
          arrange payment.
        </p>
        <Button href="/quote" variant="onDarkSolid" size="lg">
          Request a custom quote →
        </Button>
      </div>
    </section>
  );
}
