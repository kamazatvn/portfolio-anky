"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function IntroSection() {
  return (
    <section className="bg-olive-gold min-h-svh flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-svh">

        {/* ── Left: photo ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative flex items-end justify-center lg:justify-end overflow-hidden"
        >
          <div
            className="relative w-full max-w-lg h-[70vh] lg:h-full"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, black 55%, transparent 92%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 55%, transparent 92%)",
            }}
          >
            <Image
              src="/producer.png"
              alt="Anky"
              fill
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        {/* ── Right: intro text ─────────────────────────────── */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:pl-12 lg:pr-24 py-24 lg:py-32">

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="text-xs tracking-[0.35em] text-off-white/55 font-body uppercase mb-6"
          >
            Sound Architect
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="font-heading font-black text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-off-white text-render-opt mb-4"
          >
            ANKY
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
            className="text-sm tracking-[0.25em] text-off-white/65 font-body uppercase mb-10 border-b border-off-white/15 pb-10"
          >
            Music Producer &nbsp;·&nbsp; DJ
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="space-y-4 mb-12"
          >
            <p className="text-off-white/80 font-body text-base leading-relaxed">
              [Placeholder — describe your sound here. What genres do you
              work in? What kind of energy do you bring to a track or a set?
              E.g. "Rooted in underground techno and deep house, Anky's
              productions move between hypnotic rhythm and emotional
              release."]
            </p>
            <p className="text-off-white/55 font-body text-base leading-relaxed">
              [Second paragraph — production style, influences, studio
              approach. E.g. "In the studio he blends analogue hardware
              with digital precision — every element placed with intent,
              nothing wasted."]
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.38 }}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-off-white/35 text-off-white font-body text-sm tracking-widest uppercase px-7 py-4 hover:bg-off-white hover:text-olive-gold transition-colors duration-300"
            >
              Full Story <span aria-hidden="true">→</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
