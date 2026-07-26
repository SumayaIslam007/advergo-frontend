import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Lead } from "@/components/ui/lead";
import { Section } from "@/components/ui/section";
import type { ClientLogo } from "@/types";
import { ClientLogoCard } from "./client-logo-card";

interface ClientLogosProps {
  clients: ClientLogo[];
}

export function ClientLogos({ clients }: ClientLogosProps) {
  return (
    <Section background="grey">
      <div className="mb-11 text-center">
        <Eyebrow center>Trusted by 10,000+ buyers</Eyebrow>
        <Heading center>Our respected clients</Heading>
        <div className="mt-2.5">
          <Lead center>Banks · Universities · Corporates · Sports federations · FMCG brands</Lead>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
        {clients.map((client) => (
          <ClientLogoCard key={client.name} client={client} />
        ))}
      </div>
    </Section>
  );
}
