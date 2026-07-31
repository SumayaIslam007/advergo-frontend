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

export function ClientLogos({ clients }: ClientLogosProps) {
  return (
    <Section background="white">
      <Reveal className="mb-11 text-center">
        <Eyebrow center>Trusted by 10,000+ buyers</Eyebrow>
        <Heading center>Our respected clients</Heading>
        <div className="mt-2.5">
          <Lead center>Banks · Universities · Corporates · Sports federations · FMCG brands</Lead>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
        {clients.map((client, i) => (
          <Reveal key={client.name} delay={i * 0.04}>
            <ClientLogoCard client={client} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
