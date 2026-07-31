"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";

interface AnimatedStatProps {
  value: string;
  className?: string;
}

/** Splits "90,000", "200+", "$3M" into an animatable numeric core plus static prefix/suffix. */
function parseValue(raw: string) {
  const match = raw.match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const target = Number.parseInt(numStr.replace(/,/g, ""), 10);
  if (Number.isNaN(target)) return null;
  return { prefix, target, suffix };
}

/** Counts up from 0 to the parsed number once it scrolls into view; falls back to static text. */
export function AnimatedStat({ value, className }: AnimatedStatProps) {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (!inView || !parsed) return;
    const controls = animate(count, parsed.target, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, parsed, count]);

  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      <motion.span>{rounded}</motion.span>
      {parsed.suffix}
    </span>
  );
}
