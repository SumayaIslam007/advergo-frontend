import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Lead } from "@/components/ui/lead";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import type { ClientLogo } from "@/types";
import { ClientLogoCard } from "./client-logo-card";

interface ClientLogosProps {
  clients: ClientLogo[];
}

/** Duplicated so translating exactly -50% loops seamlessly back to the start. */
function MarqueeRow({ clients, direction, seconds }: { clients: ClientLogo[]; direction: "left" | "right"; seconds: number }) {
  if (clients.length === 0) return null;
  return (
    <div
      className="flex w-max gap-4 [animation-play-state:running] group-hover/marquee:[animation-play-state:paused]"
      style={{
        animationName: `marquee-${direction}`,
        animationDuration: `${seconds}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
      }}
    >
      {[...clients, ...clients].map((client, i) => (
        <div key={`${client.id}-${i}`} className="w-[150px] shrink-0">
          <ClientLogoCard client={client} />
        </div>
      ))}
    </div>
  );
}

export function ClientLogos({ clients }: ClientLogosProps) {
  const mid = Math.ceil(clients.length / 2);
  const rowA = clients.slice(0, mid);
  const rowB = clients.slice(mid);

  return (
    <Section background="white">
      <Reveal className="mb-11 text-center">
        <Eyebrow center>Trusted by 10,000+ buyers</Eyebrow>
        <Heading center>Our respected clients</Heading>
        <div className="mt-2.5">
          <Lead center>Banks · Universities · Corporates · Sports federations · FMCG brands</Lead>
        </div>
      </Reveal>
      <div className="group/marquee -mx-6 space-y-4 overflow-hidden px-6 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] sm:-mx-10 sm:px-10">
        <MarqueeRow clients={rowA} direction="left" seconds={42} />
        <MarqueeRow clients={rowB} direction="right" seconds={48} />
      </div>
    </Section>
  );
}
