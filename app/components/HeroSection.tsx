"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Photo shrinks and drifts left as the section scrolls out
  const imageScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.52]);
  const imageX     = useTransform(scrollYProgress, [0, 0.85], ["0%", "-30%"]);

  // Bottom text block fades out early
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.3], [0, -16]);

  return (
    /* Tall section gives the sticky area scroll canvas */
    <section ref={sectionRef} className="relative h-[175vh]">

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── ANKY — background layer ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.05 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none"
        >
          <h1 className="font-heading font-black text-[clamp(6.5rem,21vw,19rem)] leading-none tracking-tight text-crimson text-render-opt">
            ANKY
          </h1>
        </motion.div>

        {/* ── Producer photo — scroll-driven ─────────────── */}
        <motion.div
          style={{ scale: imageScale, x: imageX }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          {/*
           * Mask fades the bottom so the cropped edge is invisible.
           * Starts fading at 58% so the face/torso area is fully shown.
           */}
          <div
            className="relative w-full h-full"
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
              priority
              sizes="100vw"
            />
          </div>
        </motion.div>

        {/* ── Bottom overlay: role label + CTA ────────────── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute bottom-10 left-0 right-0 px-8 md:px-16 lg:px-24 z-20"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="flex items-end justify-between flex-wrap gap-6"
            >
              <div>
                <motion.p
                  variants={fadeUp}
                  className="text-xs tracking-[0.35em] text-olive-gold font-body uppercase mb-3"
                >
                  Music Producer · DJ
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  className="text-charcoal/55 font-body text-base max-w-xs leading-relaxed"
                >
                  Sound architect — crafting sonic landscapes for dancefloors
                  and stages worldwide.
                </motion.p>
              </div>

              <motion.div variants={fadeUp}>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-crimson text-off-white font-body text-sm tracking-widest uppercase px-7 py-4 hover:bg-charcoal transition-colors duration-300"
                >
                  Listen Now <span aria-hidden="true">↗</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Thin rule below nav */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
          style={{ transformOrigin: "left" }}
          className="absolute top-16 left-0 right-0 h-px bg-crimson/15 z-30"
        />
      </div>
    </section>
  );
}
