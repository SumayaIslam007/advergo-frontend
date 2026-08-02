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

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  categorySlug: string;
  priceRange: string;
  fabric: string;
  rating: number;
  reviewCount: number;
  accentColor: string;
  image: string | null;
  isFeatured: boolean;
}

export interface Fabric {
  id: number;
  name: string;
  grade: string;
  bestFor: string;
  description: string;
  image: string | null;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string | null;
  ctaLabel: string;
  ctaHref: string;
}

export interface Review {
  name: string;
  organization: string;
  rating: number;
  text: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  icon: string;
}

export interface GalleryItem {
  id: number;
  src: string | null;
  label: string;
  category: string;
  categoryName: string;
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

export interface SizeChartRow {
  id: number;
  categorySlug: string | null;
  sizeLabel: string;
  chestIn: number | null;
  lengthIn: number | null;
  shoulderIn: number | null;
  sleeveIn: number | null;
}

export interface PriceEstimate {
  unitPriceLow: number;
  unitPriceHigh: number;
  totalLow: number;
  totalHigh: number;
  discountPercent: number;
}

export interface QuoteFormValues {
  name: string;
  phone: string;
  email: string;
  category: string;
  product: number | "";
  fabric: number | "";
  quantity: number | "";
  sizeBreakdown: string;
  notes: string;
}

export interface QuoteRequestResult {
  referenceCode: string;
  estimatedPriceLow: number | null;
  estimatedPriceHigh: number | null;
}

export interface ContactFormValues {
  name: string;
  contact: string;
  message: string;
}

export interface AuthUser {
  id: number;
  email: string;
  phone: string | null;
  fullName: string;
  isStaff: boolean;
}

export interface WishlistItem {
  id: number;
  product: Product;
  createdAt: string;
}
