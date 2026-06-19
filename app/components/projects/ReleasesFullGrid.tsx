"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAudioPlayer } from "../../providers/AudioPlayerProvider";
import type { Track } from "../../providers/AudioPlayerProvider";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Filter = "All" | "EP" | "Single" | "Album" | "Live";
const FILTERS: Filter[] = ["All", "EP", "Single", "Album", "Live"];

type Release = {
  id: number;
  title: string;
  type: Filter;
  year: string;
  tracks: number;
  src?: string;
};

const releases: Release[] = [
  { id: 1, title: "Van Tin (Remix)",  type: "Single", year: "2025", tracks: 1, src: "/vantinremix.mp3" },
  { id: 2, title: "Frequency Shift",  type: "EP",     year: "2024", tracks: 5  },
  { id: 3, title: "Signal Loss",       type: "Single", year: "2024", tracks: 1  },
  { id: 4, title: "Dark Continuum",    type: "Album",  year: "2023", tracks: 10 },
  { id: 5, title: "Neon Static",       type: "Single", year: "2023", tracks: 1  },
  { id: 6, title: "Phase Two",         type: "EP",     year: "2022", tracks: 6  },
];

export default function ReleasesFullGrid() {
  const [active, setActive] = useState<Filter>("All");

  const visible =
    active === "All" ? releases : releases.filter((r) => r.type === active);

  return (
    <section className="px-8 md:px-16 lg:px-24 pt-32 pb-24">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-6 mb-12"
        >
          <span className="text-xs tracking-[0.35em] text-olive-gold font-body uppercase whitespace-nowrap">
            Releases
          </span>
          <div className="flex-1 h-px bg-charcoal/10" />
          <span className="text-xs text-charcoal/25 font-body tabular-nums">
            {visible.length} / {releases.length}
          </span>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-1 mb-16"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={[
                "font-body text-xs tracking-[0.2em] uppercase px-4 py-2 transition-colors duration-200",
                active === filter
                  ? "bg-crimson text-off-white"
                  : "text-charcoal/40 border border-charcoal/10 hover:text-charcoal hover:border-charcoal/30",
              ].join(" ")}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/8">
          <AnimatePresence mode="sync">
            {visible.map((release, i) => (
              <ReleaseCard key={release.id} release={release} index={i} />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

function ReleaseCard({ release, index }: { release: Release; index: number }) {
  const { track, isPlaying, play } = useAudioPlayer();

  const isActive  = track?.id === release.id;
  const isThisPlaying = isActive && isPlaying;

  function handlePlay(e: React.MouseEvent) {
    e.stopPropagation();
    if (!release.src) return;
    const t: Track = {
      id:    release.id,
      title: release.title,
      type:  release.type,
      year:  release.year,
      src:   release.src,
    };
    play(t);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: EASE }}
      className="group bg-off-white p-6 cursor-pointer"
    >
      {/* Artwork + play overlay */}
      <div className="relative aspect-square bg-charcoal/4 mb-6 overflow-hidden">
        {/* Grid texture */}
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

        {/* Active playing indicator */}
        {isActive && (
          <div className="absolute top-4 right-4 flex gap-[3px] items-end h-4">
            {[0, 1, 2].map((bar) => (
              <motion.div
                key={bar}
                animate={isThisPlaying ? { scaleY: [0.4, 1, 0.4] } : { scaleY: 0.4 }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: bar * 0.15,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "bottom", height: "100%" }}
                className="w-1 bg-crimson rounded-sm"
              />
            ))}
          </div>
        )}

        <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-olive-gold" />
        <span className="absolute bottom-4 right-4 text-[0.6rem] tracking-[0.3em] text-charcoal/20 font-body uppercase">
          {release.type}
        </span>

        {/* Play / Pause button — shows on hover, or always if active */}
        {release.src && (
          <button
            onClick={handlePlay}
            aria-label={isThisPlaying ? `Pause ${release.title}` : `Play ${release.title}`}
            className={[
              "absolute inset-0 flex items-center justify-center transition-colors duration-300",
              isActive
                ? "bg-crimson/10"
                : "bg-off-white/0 hover:bg-crimson/8",
            ].join(" ")}
          >
            <span
              className={[
                "w-12 h-12 rounded-full bg-crimson flex items-center justify-center text-off-white shadow-md transition-all duration-300",
                isActive
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100",
              ].join(" ")}
            >
              {isThisPlaying ? (
                <svg width="10" height="11" viewBox="0 0 10 11" fill="currentColor" aria-hidden>
                  <rect x="0" y="0" width="3.5" height="11" rx="0.5" />
                  <rect x="6.5" y="0" width="3.5" height="11" rx="0.5" />
                </svg>
              ) : (
                <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden>
                  <path d="M1 0L10 6L1 12V0Z" />
                </svg>
              )}
            </span>
          </button>
        )}
      </div>

      {/* Track info */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className={[
              "font-heading text-xl font-bold text-render-opt transition-colors duration-300",
              isActive ? "text-crimson" : "text-crimson group-hover:text-charcoal",
            ].join(" ")}
          >
            {release.title}
          </h3>
          <p className="text-xs text-charcoal/35 font-body mt-1.5 tracking-wide">
            {release.tracks} {release.tracks === 1 ? "Track" : "Tracks"}
            {release.src && (
              <span className="ml-2 text-olive-gold">● Preview</span>
            )}
          </p>
        </div>
        <span className="text-xs text-charcoal/20 font-body mt-0.5 shrink-0 tabular-nums">
          {release.year}
        </span>
      </div>
    </motion.article>
  );
}
