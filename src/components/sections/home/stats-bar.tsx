import { AnimatedStat } from "@/components/ui/animated-stat";
import type { Stat } from "@/types";

interface StatsBarProps {
  stats: Stat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="bg-[linear-gradient(120deg,var(--color-brand-red)_0%,var(--color-brand-red-dark)_100%)]">
      <div className="mx-auto grid max-w-[1140px] grid-cols-2 gap-0 px-6 py-6 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={
              i < stats.length - 1 ? "border-r border-white/25 text-center" : "text-center"
            }
          >
            <AnimatedStat
              value={stat.value}
              className="mb-0.5 block bg-[linear-gradient(180deg,#fff_0%,#ffd9da_70%,#fff_100%)] bg-clip-text text-xl font-black text-transparent [text-shadow:0_0_28px_rgba(255,255,255,0.35)] sm:text-[22px]"
            />
            <p className="text-[11px] uppercase tracking-[0.06em] text-white/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
