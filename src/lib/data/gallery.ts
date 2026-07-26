import type { GalleryItem } from "@/types";

// src: "" would render the placeholder state — swap these Unsplash URLs for
// real factory/client photography as it becomes available.
export const galleryItems: GalleryItem[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=280&fit=crop", label: "Design section", category: "factory", description: "Design & artwork studio" },
  { id: 2, src: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=400&h=280&fit=crop", label: "Printing section", category: "factory", description: "62-inch sublimation printing" },
  { id: 3, src: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=280&fit=crop", label: "Cutting section", category: "factory", description: "Precision fabric cutting" },
  { id: 4, src: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&h=280&fit=crop", label: "Sewing section", category: "factory", description: "60–70 industrial sewing machines" },
  { id: 5, src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=280&fit=crop", label: "QC section", category: "factory", description: "Quality inspection & standards" },
  { id: 6, src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=280&fit=crop", label: "Packing section", category: "factory", description: "Professional packing & dispatch" },
  { id: 7, src: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=280&fit=crop", label: "Football kit delivery", category: "clients", description: "Tournament kit — Dhaka Premier FC" },
  { id: 8, src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=280&fit=crop", label: "Corporate polo delivery", category: "clients", description: "Corporate order — 200 units" },
  { id: 9, src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=280&fit=crop", label: "Cycling kit showcase", category: "clients", description: "Cycling pro jersey — BCF" },
];
