import { apiFetch } from "./client";
import type { Review } from "@/types";

export function getReviews() {
  return apiFetch<Review[]>("/reviews/");
}
