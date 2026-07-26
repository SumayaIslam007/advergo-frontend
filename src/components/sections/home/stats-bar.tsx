import type { Stat } from "@/types";

interface StatsBarProps {
  stats: Stat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="bg-brand-red">
      <div className="mx-auto grid max-w-[1140px] grid-cols-2 gap-0 px-6 py-5 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={
              i < stats.length - 1 ? "border-r border-white/25 text-center" : "text-center"
            }
          >
            <p className="mb-0.5 text-xl font-black text-white sm:text-[22px]">{stat.value}</p>
            <p className="text-[11px] uppercase tracking-[0.06em] text-white/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
