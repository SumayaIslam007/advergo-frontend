import type { WishlistItem } from "@/types";
import { authFetch, isAuthenticated } from "./server-fetch";

export async function getMyWishlist(): Promise<WishlistItem[]> {
  if (!(await isAuthenticated())) return [];
  const response = await authFetch("/wishlist/");
  if (!response.ok) return [];
  return response.json();
}

export async function getMyWishlistProductIds(): Promise<Set<number>> {
  const items = await getMyWishlist();
  return new Set(items.map((item) => item.product.id));
}
