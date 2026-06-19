"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ContactHero() {
  return (
    <section
      className="px-5 md:px-16 lg:px-24 pt-32 pb-16"
      style={{ backgroundColor: "#080705" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs tracking-[0.35em] text-crimson/60 font-body uppercase mb-10"
        >
          Get In Touch
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="font-heading font-black text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tight text-off-white text-render-opt mb-4"
        >
          FIND
          <br />
          <span className="text-crimson">THE</span>
          <br />
          STUDIO
        </motion.h1>
      </div>
    </section>
  );
}
