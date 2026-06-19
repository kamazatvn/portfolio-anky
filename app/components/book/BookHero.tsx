"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function BookHero() {
  return (
    <section
      className="relative overflow-hidden px-5 md:px-16 lg:px-24 pt-32 pb-12"
      style={{
        backgroundImage: "url('/anky1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark scrim for legibility */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(8,7,5,0.92) 0%, rgba(8,7,5,0.78) 55%, rgba(8,7,5,0.6) 100%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs tracking-[0.35em] text-crimson/60 font-body uppercase mb-10"
        >
          Bookings &amp; Collaborations
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <h1 className="font-heading font-black text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.9] tracking-tight text-off-white text-render-opt">
              WORK
              <br />
              <span className="text-crimson">WITH</span>
              <br />
              ANKY
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            className="lg:col-span-5 lg:pb-2 space-y-6"
          >
            <p className="text-off-white/70 font-body text-base leading-relaxed">
              Hip-hop DJ performing at events and venues across Prague — blending
              hip-hop, R&amp;B, and street culture into high-energy live sets built
              for the room.
            </p>
            <div className="h-px bg-off-white/10" />
            <p className="text-off-white/50 font-body text-sm leading-relaxed">
              Music producer working with a wide range of artists across Vietnam
              and the Czech Republic. Available for studio sessions, co-productions,
              beatmaking, mixing, and creative direction.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-crimson text-off-white font-body text-xs tracking-widest uppercase px-8 py-4 hover:bg-off-white hover:text-charcoal transition-colors duration-300"
              >
                Get In Touch <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
