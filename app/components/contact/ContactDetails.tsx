"use client";

import { motion } from "motion/react";

const ADDRESS_LINE1 = "Senovážné nám. 1464/6";
const ADDRESS_LINE2 = "110 00 Nové Město";
const ADDRESS_CITY  = "Praha, Czech Republic";
const PHONE         = "+420 773 115 935";
const MAPS_SRC =
  "https://maps.google.com/maps?q=Senovážné+náměstí+1464%2F6%2C+110+00+Nové+Město%2C+Praha&output=embed&z=15&iwloc=B";
const MAPS_HREF =
  "https://www.google.com/maps/search/?api=1&query=Senovážné+náměstí+1464%2F6%2C+110+00+Nové+Město%2C+Praha";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ContactDetails() {
  return (
    <section className="bg-off-white border-t border-crimson/15">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left — contact info */}
          <div className="px-5 md:px-16 lg:px-14 xl:px-20 py-16 md:py-24 border-b lg:border-b-0 lg:border-r border-crimson/10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="space-y-12"
            >
              {/* Address */}
              <div>
                <p className="text-[0.65rem] tracking-[0.35em] text-crimson/50 font-body uppercase mb-3">
                  Studio Address
                </p>
                <address className="not-italic">
                  <p className="font-heading font-bold text-2xl md:text-3xl text-crimson leading-snug text-render-opt">
                    {ADDRESS_LINE1}
                  </p>
                  <p className="font-heading font-bold text-2xl md:text-3xl text-charcoal leading-snug text-render-opt">
                    {ADDRESS_LINE2}
                  </p>
                  <p className="text-sm text-charcoal/40 font-body mt-1 tracking-wide">
                    {ADDRESS_CITY}
                  </p>
                </address>
              </div>

              <div className="h-px bg-crimson/10" />

              {/* Phone */}
              <div>
                <p className="text-[0.65rem] tracking-[0.35em] text-crimson/50 font-body uppercase mb-3">
                  Phone
                </p>
                <a
                  href={`tel:${PHONE.replace(/\s/g, "")}`}
                  className="font-body text-xl md:text-2xl text-charcoal hover:text-crimson transition-colors duration-300 tracking-wide"
                >
                  {PHONE}
                </a>
              </div>

              <div className="h-px bg-crimson/10" />

              {/* Email */}
              <div>
                <p className="text-[0.65rem] tracking-[0.35em] text-crimson/50 font-body uppercase mb-3">
                  Email
                </p>
                <a
                  href="mailto:anky.lohi5@gmail.com"
                  className="font-body text-xl md:text-2xl text-charcoal hover:text-crimson transition-colors duration-300 tracking-wide inline-flex items-center gap-2 group"
                >
                  anky.lohi5@gmail.com
                  <span className="text-crimson/40 group-hover:text-crimson transition-colors duration-300 text-base">
                    ↗
                  </span>
                </a>
              </div>

              <div className="h-px bg-crimson/10" />

              {/* Directions CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              >
                <a
                  href={MAPS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-crimson text-crimson font-body text-xs tracking-widest uppercase px-7 py-4 hover:bg-crimson hover:text-off-white transition-colors duration-300"
                >
                  Get Directions <span aria-hidden="true">↗</span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right — map */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="relative min-h-95 lg:min-h-0"
          >
            <iframe
              src={MAPS_SRC}
              title="Studio Location — Praha"
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ filter: "grayscale(20%) contrast(1.05)" }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
