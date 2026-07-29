import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { ProductCard } from "@/components/sections/products/product-card";
import { isAuthenticated } from "@/lib/auth/server-fetch";
import { getMyWishlist } from "@/lib/auth/wishlist";

export const metadata: Metadata = {
  title: "My wishlist",
  description: "Your saved favorite products.",
};

export default async function WishlistPage() {
  if (!(await isAuthenticated())) {
    redirect("/login?redirect=/wishlist");
  }
  const items = await getMyWishlist();

  return (
    <div className="min-h-screen bg-brand-grey-light">
      <PageHeader eyebrow="Saved" title="My wishlist" subtitle="Products you've favourited for later." />
      <Section background="grey">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ProductCard key={item.id} product={item.product} initiallyWishlisted />
            ))}
          </div>
        ) : (
          <p className="py-14 text-center text-brand-grey-mid">
            No favourites yet — browse products and tap the heart icon.
          </p>
        )}
      </Section>
    </div>
  );
}
