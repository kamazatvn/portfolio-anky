"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const services = [
  {
    index: "01",
    title: "DJ Set",
    description:
      "Festival headline slots, club nights, private events, and residencies. Techno to peak-time electronica.",
  },
  {
    index: "02",
    title: "Production",
    description:
      "Original beats, full production, mixing, and mastering. Studio sessions available for artists and labels.",
  },
  {
    index: "03",
    title: "Collaboration",
    description:
      "Featured artist appearances, remixes, joint releases, and creative consulting for emerging talent.",
  },
];

export default function BookingsCTA() {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-28 border-t border-charcoal/10">
      <div className="max-w-7xl mx-auto">

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-7"
          >
            <p className="text-xs tracking-[0.35em] text-olive-gold font-body uppercase mb-6">
              Bookings
            </p>
            <h2 className="font-heading font-black text-[clamp(3.5rem,10vw,9rem)] leading-[0.88] tracking-tight text-crimson text-render-opt">
              BOOK
              <br />
              ANKY
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="lg:col-span-4 lg:col-start-9 text-charcoal/50 font-body text-base leading-relaxed self-end pb-2"
          >
            Available for DJ sets, studio sessions, and creative
            collaborations. Reach out with project details and we&apos;ll
            find the right fit.
          </motion.p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/8 mb-16">
          {services.map((service, i) => (
            <motion.div
              key={service.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="bg-off-white px-8 py-10 group"
            >
              <span className="text-xs text-charcoal/20 font-body tabular-nums block mb-6">
                {service.index}
              </span>
              <h3 className="font-heading text-2xl font-bold text-crimson mb-4 text-render-opt group-hover:text-charcoal transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm text-charcoal/50 font-body leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col sm:flex-row sm:items-center gap-8"
        >
          <a
            href="mailto:booking@anky.com"
            className="inline-flex items-center gap-3 bg-crimson text-off-white font-body font-medium text-sm tracking-widest uppercase px-10 py-5 hover:bg-charcoal transition-colors duration-300 self-start"
          >
            Get In Touch <span aria-hidden="true">→</span>
          </a>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-charcoal/30 font-body tracking-wide">
              booking@anky.com
            </span>
            <span className="text-xs text-charcoal/20 font-body tracking-wide">
              Response within 48 hours
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
