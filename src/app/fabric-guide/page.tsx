import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { FabricCard } from "@/components/sections/fabric/fabric-card";
import { getFabrics, safe } from "@/lib/api";

export const metadata: Metadata = {
  title: "Fabric guide",
  description: "Explore the fabrics Advergo uses for custom sportswear — Pin Mesh, Sugar Mesh, Brush Jacquard, Honeycomb, Nylon Spandex, and Lurex Box Mesh.",
};

export default async function FabricGuidePage() {
  const fabrics = await safe(getFabrics(), []);

  return (
    <div className="min-h-screen bg-brand-grey-light">
      <PageHeader
        eyebrow="Materials"
        title="Fabric guide"
        subtitle="We source top-tier materials — all undergo rigorous testing for colour fastness, shrinkage control, and long-lasting comfort."
      />
      <Section background="grey">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fabrics.map((fabric, i) => (
            <Reveal key={fabric.id} delay={(i % 6) * 0.06}>
              <FabricCard fabric={fabric} />
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
