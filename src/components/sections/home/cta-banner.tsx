import { CheckCircle2, FileImage, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,var(--color-brand-black)_0%,var(--color-brand-red-deep)_55%,var(--color-brand-red)_100%)] px-6 py-24">
      <div
        className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-brand-red/30 blur-[110px] motion-safe:animate-[drift_18s_ease-in-out_infinite]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-[-80px] h-72 w-72 rounded-full bg-white/10 blur-[100px]"
        aria-hidden
      />
      <div className="pointer-events-none absolute right-[-10px] top-4 hidden select-none text-[110px] font-black leading-none text-white opacity-[0.04] sm:block lg:text-[160px]">
        CUSTOM
      </div>

      <div className="relative mx-auto grid max-w-[1140px] items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
            No payment required
          </p>
          <h2 className="mb-3.5 bg-[linear-gradient(100deg,#fff_15%,#ffd7d8_60%,#fff_100%)] bg-clip-text font-heading text-[2.25rem] font-bold tracking-[-0.01em] text-transparent sm:text-[2.75rem]">
            Have your own design?
          </h2>
          <p className="mb-8 max-w-[440px] text-[15px] leading-[1.7] text-white/80">
            Upload your design file (.ai, .jpg, .png) and get a quote. We contact you directly to confirm and
            arrange payment.
          </p>
          <Button href="/quote" variant="onDarkSolid" size="lg">
            Request a custom quote →
          </Button>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto w-full max-w-[340px] rounded-2xl border border-white/15 bg-white/[0.06] p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
                Design upload
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
            </div>
            <div className="flex flex-col items-center justify-center gap-2.5 rounded-xl border-2 border-dashed border-white/25 bg-white/[0.04] py-10 transition-colors duration-300 hover:border-white/40">
              <UploadCloud size={26} className="text-white/70" />
              <p className="text-[12px] font-medium text-white/70">Drop your design file here</p>
            </div>
            <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-white/[0.05] px-3 py-2.5">
              <FileImage size={16} className="shrink-0 text-white/60" />
              <span className="flex-1 truncate text-[12px] text-white/75">jersey-design-final.ai</span>
              <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
