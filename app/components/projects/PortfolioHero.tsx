"use client";

import { motion } from "motion/react";
import { useLanguage } from "../../providers/LanguageProvider";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const GENRES = ["Hip-Hop / R&B", "EDM", "House", "Techno", "Pop", "& More"];

export default function PortfolioHero() {
  const { t } = useLanguage();
  return (
    <section
      className="relative px-5 md:px-16 lg:px-24 pt-32 pb-14 overflow-hidden"
      style={{
        backgroundImage: "url('/ankyhand.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark scrim for text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(8,7,5,0.88) 0%, rgba(8,7,5,0.65) 60%, rgba(8,7,5,0.45) 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs tracking-[0.35em] text-crimson/70 font-body uppercase mb-10"
        >
          {t.portfolio.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="font-heading font-black text-[clamp(2.8rem,8.5vw,8rem)] leading-[0.9] tracking-tight text-off-white text-render-opt mb-6"
        >
          {t.portfolio.headingLine1}
          <br />
          <span className="text-crimson">{t.portfolio.headingLine2}</span>
          <br />
          {t.portfolio.headingLine3}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          style={{ transformOrigin: "left" }}
          className="w-14 h-px bg-crimson/50 mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          className="flex flex-wrap gap-2"
        >
          {GENRES.map((genre) => (
            <span
              key={genre}
              className="text-[0.65rem] font-body tracking-[0.22em] uppercase px-4 py-2 border border-off-white/20 text-off-white/55 backdrop-blur-sm"
            >
              {genre}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
