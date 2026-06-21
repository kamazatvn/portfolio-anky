"use client";

import { motion } from "motion/react";
import { useLanguage } from "../../providers/LanguageProvider";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CareerHighlights() {
  const { t } = useLanguage();

  const stats = [
    { value: "8+",   label: t.career.stats.yearsActive      },
    { value: "200+", label: t.career.stats.tracksProduced   },
    { value: "50+",  label: t.career.stats.livePerformances },
    { value: "3",    label: t.career.stats.studioAlbums     },
  ];

  const milestones = t.career.milestones;

  return (
    <>
      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-24 py-20 border-t border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-charcoal/8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-off-white px-6 py-10"
              >
                <p className="font-heading font-black text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-crimson text-render-opt">
                  {stat.value}
                </p>
                <p className="text-xs tracking-[0.2em] text-charcoal/40 font-body uppercase mt-3">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Career milestones ─────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-charcoal/10">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6 mb-16"
          >
            <span className="text-xs tracking-[0.35em] text-olive-gold font-body uppercase whitespace-nowrap">
              {t.career.eyebrow}
            </span>
            <div className="flex-1 h-px bg-charcoal/10" />
          </motion.div>

          <div>
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
                className="grid grid-cols-12 gap-6 py-7 border-t border-charcoal/8 group"
              >
                <div className="col-span-3 md:col-span-2">
                  <span className="text-xs text-olive-gold font-body tabular-nums tracking-wide">
                    {milestone.year}
                  </span>
                </div>
                <div className="col-span-9 md:col-span-10">
                  <p className="text-charcoal/60 font-body text-base leading-relaxed group-hover:text-charcoal transition-colors duration-300">
                    {milestone.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
