"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const EVENTS = [
  {
    date: "22.12.2023",
    name: "Asian Christmas",
    organizer: "Gangshii",
    venue: "Mecca Club",
  },
  {
    date: "16.02.2024",
    name: "Lunar Year × Valentine × 1 Year Anniversary",
    organizer: "Gangshii",
    venue: "FU Club",
  },
  {
    date: "14.06.2024",
    name: "Throwback Fancy Party",
    organizer: "Gangshii",
    venue: "Radost FX Club",
  },
  {
    date: "15.03.2025",
    name: "We Lit",
    organizer: "Gangshii",
    venue: "OX Club",
  },
  {
    date: "21.06.2025",
    name: "Back to 2016 Summer Party",
    organizer: "Gangshii",
    venue: "FU Club",
  },
  {
    date: "28.02.2026",
    name: "Lunar Year × Valentine Party",
    organizer: "Gangshii",
    venue: "FU Club",
  },
  {
    date: "05.04.2026",
    name: "M1 × Gangshii",
    organizer: "Gangshii",
    venue: "M1 Club",
  },
  {
    date: "17.07.2026",
    name: "A Block Party",
    organizer: "One Big Party",
    venue: "Radost FX Club",
  },
];

export default function EventsTimeline() {
  return (
    <section className="px-5 md:px-16 lg:px-24 py-16 border-t border-charcoal/8 bg-off-white">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-6 mb-10"
        >
          <span className="text-xs tracking-[0.35em] text-olive-gold font-body uppercase whitespace-nowrap">
            Past Events
          </span>
          <div className="flex-1 h-px bg-charcoal/10" />
          <span className="text-xs text-charcoal/20 font-body tabular-nums">
            {EVENTS.length} shows
          </span>
        </motion.div>

        {/* Column headings */}
        <div className="grid grid-cols-12 gap-4 mb-4 px-1">
          {[
            { label: "Date",      span: "col-span-3 md:col-span-2"  },
            { label: "Event",     span: "col-span-9 md:col-span-4"  },
            { label: "With",      span: "hidden md:block md:col-span-2" },
            { label: "Venue",     span: "hidden md:block md:col-span-4" },
          ].map(({ label, span }) => (
            <span
              key={label}
              className={`text-[0.58rem] tracking-[0.3em] text-charcoal/20 font-body uppercase ${span}`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Rows */}
        {EVENTS.map((ev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
            className="grid grid-cols-12 gap-4 py-5 border-t border-charcoal/8 group items-baseline px-1"
          >
            {/* Date */}
            <div className="col-span-3 md:col-span-2">
              <span className="text-xs text-olive-gold font-body tabular-nums tracking-wide">
                {ev.date}
              </span>
            </div>

            {/* Event name */}
            <div className="col-span-9 md:col-span-4">
              <span className="text-sm text-charcoal/75 font-body group-hover:text-charcoal transition-colors duration-300 font-medium">
                &ldquo;{ev.name}&rdquo;
              </span>
            </div>

            {/* Organizer */}
            <div className="hidden md:block md:col-span-2">
              <span className="text-xs text-charcoal/40 font-body tracking-wide">
                {ev.organizer}
              </span>
            </div>

            {/* Venue */}
            <div className="hidden md:block md:col-span-4">
              <span className="text-xs text-charcoal/30 font-body tracking-wide">
                {ev.venue}
              </span>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
