"use client";

import { motion } from "motion/react";
import Link from "next/link";

const releases = [
  { id: 1, title: "Frequency Shift", type: "EP",     year: "2024", tracks: 5  },
  { id: 2, title: "Signal Loss",      type: "Single", year: "2024", tracks: 1  },
  { id: 3, title: "Dark Continuum",   type: "Album",  year: "2023", tracks: 10 },
];

export default function ReleasesGrid() {
  return (
    <section className="px-5 md:px-16 lg:px-24 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 mb-16"
        >
          <span className="text-xs tracking-[0.35em] text-olive-gold font-body uppercase whitespace-nowrap">
            Latest Releases
          </span>
          <div className="flex-1 h-px bg-charcoal/10" />
          <Link
            href="/projects"
            className="text-xs tracking-[0.2em] text-charcoal/35 hover:text-charcoal transition-colors duration-300 font-body uppercase whitespace-nowrap"
          >
            View All →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/[0.08]">
          {releases.map((release, i) => (
            <ReleaseCard key={release.id} release={release} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReleaseCard({
  release,
  index,
}: {
  release: (typeof releases)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-off-white p-6 cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-square bg-charcoal/[0.04] mb-6 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(64,67,78,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(64,67,78,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-olive-gold" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[0.6rem] tracking-[0.4em] text-charcoal/15 font-body uppercase">
            Artwork
          </span>
        </div>
        <div className="absolute inset-0 bg-crimson/0 group-hover:bg-crimson/5 transition-colors duration-500" />
      </motion.div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-xl font-bold text-crimson group-hover:text-charcoal transition-colors duration-300 text-render-opt">
            {release.title}
          </h3>
          <p className="text-xs text-charcoal/40 font-body mt-1.5 tracking-wide">
            {release.type} &middot; {release.tracks}{" "}
            {release.tracks === 1 ? "Track" : "Tracks"}
          </p>
        </div>
        <span className="text-xs text-charcoal/25 font-body mt-0.5 shrink-0">
          {release.year}
        </span>
      </div>
    </motion.article>
  );
}
