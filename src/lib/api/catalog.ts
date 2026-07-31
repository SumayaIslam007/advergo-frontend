import { apiFetch } from "./client";
import type { Fabric, Product, SizeChartRow, SportCategory } from "@/types";

export function getCategories() {
  return apiFetch<SportCategory[]>("/catalog/categories/");
}

export function getProducts(params?: { category?: string; featured?: boolean }) {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.featured !== undefined) query.set("featured", String(params.featured));
  const qs = query.toString();
  return apiFetch<Product[]>(`/catalog/products/${qs ? `?${qs}` : ""}`);
}

export function getProduct(id: number) {
  return apiFetch<Product>(`/catalog/products/${id}/`);
}

export function getFabrics() {
  return apiFetch<Fabric[]>("/catalog/fabrics/");
}

export function getSizeChart() {
  return apiFetch<SizeChartRow[]>("/catalog/size-chart/");
}
