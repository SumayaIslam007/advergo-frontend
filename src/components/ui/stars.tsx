import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarsProps {
  rating: number;
  size?: number;
}

export function Stars({ rating, size = 12 }: StarsProps) {
  const rounded = Math.round(rating);
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={cn(i <= rounded ? "fill-amber-500 text-amber-500" : "fill-none text-gray-300")}
        />
      ))}
    </span>
  );
}
