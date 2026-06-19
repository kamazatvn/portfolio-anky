"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export default function StackSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // progress 0 → section top at viewport bottom (entering from below)
  // progress 1 → section top at viewport top (fully stacked over hero)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  // Translate 150px → 0 over the full viewport-entry range.
  // useSpring smooths the motion without the unsupported ease option.
  const rawY = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const y = useSpring(rawY, { stiffness: 120, damping: 25 });

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        position: "relative",
        zIndex: 10,
        borderRadius: "20px 20px 0 0",
        overflow: "hidden",
        boxShadow:
          "0 -20px 60px rgba(0,0,0,0.28), 0 -4px 18px rgba(0,0,0,0.18)",
      }}
    >
      {children}
    </motion.div>
  );
}
