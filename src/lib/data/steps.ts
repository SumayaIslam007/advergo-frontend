import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  { number: "01", title: "Requirement submission", description: "Share your design concepts, quantity, fabric preferences, and specifications with our team.", emoji: "📋" },
  { number: "02", title: "Consultation & quotation", description: "Our experts analyse your requirements, provide technical recommendations, and offer a competitive price.", emoji: "💬" },
  { number: "03", title: "Sampling", description: "Upon approval, we develop a prototype sample for your review to confirm design and quality.", emoji: "🧵" },
  { number: "04", title: "Production", description: "Once sample is approved, our skilled team initiates large-scale manufacturing with strict quality control.", emoji: "⚙️" },
  { number: "05", title: "QA & packing", description: "Every garment undergoes final inspection to meet our quality standards before being professionally packed.", emoji: "🔍" },
  { number: "06", title: "Delivery", description: "Prompt, secure delivery of your order — for local distribution or international export.", emoji: "🚚" },
];
