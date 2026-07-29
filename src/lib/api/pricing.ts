import { apiFetch } from "./client";
import type { PriceEstimate } from "@/types";

interface EstimateParams {
  category?: string;
  fabric?: number;
  quantity: number;
}

export function estimatePrice({ category, fabric, quantity }: EstimateParams) {
  return apiFetch<PriceEstimate>("/pricing/estimate/", {
    method: "POST",
    body: JSON.stringify({ category: category || undefined, fabric: fabric || undefined, quantity }),
  });
}
