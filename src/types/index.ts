// =============================================================================
// Shared content types
// Keeping these separate from components means the eventual move to a CMS
// (Sanity/Contentful) only touches lib/data, never the UI layer.
// =============================================================================

export interface CompanyInfo {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  emailAlt: string;
  website: string;
  headOffice: string;
  factory: string;
  founded: string;
  md: string;
  chairman: string;
}

export interface Stat {
  value: string;
  label: string;
}

export type SportCategoryId =
  | "football"
  | "cycling"
  | "cricket"
  | "marathon"
  | "corporate";

export interface SportCategory {
  id: SportCategoryId;
  name: string;
  icon: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  priceRange: string;
  fabric: string;
  rating: number;
  reviewCount: number;
  accentColor: string;
}

export interface Fabric {
  name: string;
  grade: string;
  bestFor: string;
  description: string;
}

export interface Review {
  name: string;
  organization: string;
  rating: number;
  text: string;
}

export type GalleryCategory = "factory" | "clients";

export interface GalleryItem {
  id: number;
  src: string;
  label: string;
  category: GalleryCategory;
  description: string;
}

export interface Achievement {
  icon: string;
  title: string;
  year: string;
  issuingBody: string;
}

export interface ClientLogo {
  name: string;
  logoUrl: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  emoji: string;
}

export interface QuoteFormValues {
  name: string;
  phone: string;
  email: string;
  category: string;
  product: string;
  quantity: string;
  sizeBreakdown: string;
  notes: string;
}

export interface ContactFormValues {
  name: string;
  contact: string;
  message: string;
}
