import { apiFetch } from "./client";
import type { QuoteFormValues, QuoteRequestResult } from "@/types";

export function submitQuoteRequest(values: QuoteFormValues, file: File | null) {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("phone", values.phone);
  if (values.email) formData.append("email", values.email);
  if (values.category) formData.append("category", values.category);
  if (values.product !== "") formData.append("product", String(values.product));
  if (values.fabric !== "") formData.append("fabric", String(values.fabric));
  formData.append("quantity", String(values.quantity));
  if (values.sizeBreakdown) formData.append("sizeBreakdown", values.sizeBreakdown);
  if (values.notes) formData.append("notes", values.notes);
  if (file) formData.append("designFile", file);

  return apiFetch<QuoteRequestResult>("/quotes/", {
    method: "POST",
    body: formData,
  });
}
