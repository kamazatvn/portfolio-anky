"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const performances = [
  { year: "2024", venue: "[Venue Name]",    city: "[City, Country]", event: "Headline Set"       },
  { year: "2024", venue: "[Festival Name]", city: "[City, Country]", event: "Mainstage Headline" },
  { year: "2023", venue: "[Club Name]",     city: "[City, Country]", event: "Resident Night"     },
  { year: "2023", venue: "[Festival Name]", city: "[City, Country]", event: "Stage B"            },
  { year: "2022", venue: "[Arena Name]",    city: "[City, Country]", event: "Support Act"        },
  { year: "2022", venue: "[Club Name]",     city: "[City, Country]", event: "B2B Set"            },
];

export default function PerformancesSection() {
  return (
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
            Performances
          </span>
          <div className="flex-1 h-px bg-charcoal/10" />
        </motion.div>

        {/* Column headings */}
        <div className="grid grid-cols-12 gap-6 mb-4">
          {(["Year", "Event", "Venue", "Location"] as const).map((col) => (
            <span
              key={col}
              className={[
                "text-[0.6rem] tracking-[0.3em] text-charcoal/20 font-body uppercase",
                col === "Year"     ? "col-span-2 md:col-span-1" : "",
                col === "Event"    ? "col-span-10 md:col-span-3" : "",
                col === "Venue"    ? "hidden md:block md:col-span-4" : "",
                col === "Location" ? "hidden md:block md:col-span-4" : "",
              ].join(" ")}
            >
              {col}
            </span>
          ))}
        </div>

        {performances.map((perf, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
            className="grid grid-cols-12 gap-6 py-6 border-t border-charcoal/8 group items-baseline"
          >
            <div className="col-span-2 md:col-span-1">
              <span className="text-xs text-olive-gold font-body tabular-nums">
                {perf.year}
              </span>
            </div>
            <div className="col-span-10 md:col-span-3">
              <span className="text-sm text-charcoal/70 font-body group-hover:text-charcoal transition-colors duration-300">
                {perf.event}
              </span>
            </div>
            <div className="hidden md:block md:col-span-4">
              <span className="text-sm text-charcoal/45 font-body">
                {perf.venue}
              </span>
            </div>
            <div className="hidden md:block md:col-span-4">
              <span className="text-xs text-charcoal/30 font-body tracking-wide">
                {perf.city}
              </span>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
