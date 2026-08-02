import { apiFetch } from "./client";
import type {
  Achievement,
  Banner,
  ClientLogo,
  CompanyInfo,
  GalleryCategory,
  GalleryItem,
  ProcessStep,
  Stat,
} from "@/types";

export function getBanners() {
  return apiFetch<Banner[]>("/content/banners/active/");
}

export function getStats() {
  return apiFetch<Stat[]>("/content/stats/");
}

export function getAchievements() {
  return apiFetch<Achievement[]>("/content/achievements/");
}

export function getClientLogos() {
  return apiFetch<ClientLogo[]>("/content/clients/");
}

export function getProcessSteps() {
  return apiFetch<ProcessStep[]>("/content/steps/");
}

export function getGalleryCategories() {
  return apiFetch<GalleryCategory[]>("/content/gallery-categories/");
}

export function getGalleryItems(category?: string) {
  const qs = category ? `?category=${category}` : "";
  return apiFetch<GalleryItem[]>(`/content/gallery/${qs}`);
}

export function getCompanyInfo() {
  return apiFetch<CompanyInfo>("/content/company/");
}

// Used when the API is briefly unavailable (rate-limited, cold start, etc.) so a
// transient backend hiccup can't take down the nav/footer/WhatsApp button on every page.
export const FALLBACK_COMPANY_INFO: CompanyInfo = {
  name: "Advergo Sports & Fashion Wear Ltd.",
  tagline: "Quality with commitment",
  phone: "+880 1732 687982",
  email: "info@advergoltd.com",
  emailAlt: "advergo.sportswear@gmail.com",
  website: "www.advergo.org",
  headOffice: "Flat # B-5, House # 33, Road # 13, Sector # 10, Uttara, Dhaka-1230",
  factory: "Near Pukurpar Mosjid, Razabari, Kamarpara, Turag, Uttara, Dhaka-1230",
  founded: "2019",
  md: "Md. Ashikul Islam",
  chairman: "Ariful Islam",
};

export function getCompanyInfoSafe() {
  return getCompanyInfo().catch(() => FALLBACK_COMPANY_INFO);
}
