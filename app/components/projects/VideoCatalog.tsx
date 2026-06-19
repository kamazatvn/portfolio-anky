"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useVideoPlayer, type VideoTrack } from "../../providers/VideoPlayerProvider";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Video data ──────────────────────────────────────────────────────────── */

type VideoEntry = { id: string; playlistId?: string };

const VIET_SINGLES: VideoEntry[] = [
  { id: "hUiWYlrUnXM" },
  { id: "ywIKTGHAezE" },
  { id: "cZW0fl5_0II" },
  { id: "5mAchjsJ3xU" },
  { id: "UnhwQGr-k4A" },
  { id: "h-FJD79Nr9o" },
  { id: "jj5NuOp5auM" },
  { id: "Fq7Dq3pW0jM" },
  { id: "oGx_nSTj2xs" },
  { id: "lmackumuVFE" },
  { id: "rfYRGix9434" },
  { id: "gsRn0s1-uf0" },
  { id: "KmoSUOOK29k" },
  { id: "XcT4N3NqqcA" },
  { id: "DKygzDl5KHM" },
];

const FULL_PLAYLISTS: VideoEntry[] = [
  { id: "YgOR5H3SvLw", playlistId: "PLYlXS2OPGalNlSWiW018wR-w0miYSB0FE" },
  { id: "pm84DyGA0gc", playlistId: "PLYlXS2OPGalNSnOsWpxh4D0Z5YA-qY6xE" },
  { id: "osmxDymK-nk", playlistId: "PLYlXS2OPGalN18R2lKU5K84f4JqzHC24t" },
];

const INTL_SINGLES: VideoEntry[] = [
  { id: "3-lN6Oj_b4M" },
  { id: "05vbE-4PQiM" },
  { id: "cw4dxA6Jgkc" },
  { id: "hrGxKbtVkRg" },
];

const ORIGINALS: VideoEntry[] = [
  { id: "LZtnBM3NK1I" },
  { id: "75e2O07K1oA" },
  { id: "fFP5Zs4l81Y" },
  { id: "EkiyC9Lz4T0" },
  { id: "o_i7cexWvW0" },
  { id: "BqA3tXl05mY" },
  { id: "e8Pw6x9g4kk" },
];

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function VideoCard({ entry, sectionTitle, index }: {
  entry: VideoEntry;
  sectionTitle: string;
  index: number;
}) {
  const { playVideo } = useVideoPlayer();

  function handlePlay() {
    const track: VideoTrack = {
      id: entry.id,
      title: sectionTitle,
      playlistId: entry.playlistId,
    };
    playVideo(track);
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: EASE }}
      onClick={handlePlay}
      aria-label={`Play ${sectionTitle} video`}
      data-card
      className="group relative shrink-0 w-[260px] sm:w-[300px] md:w-[320px] overflow-hidden bg-charcoal/10 text-left"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-charcoal/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://img.youtube.com/vi/${entry.id}/hqdefault.jpg`}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/45 transition-colors duration-300" />

        {/* Playlist badge */}
        {entry.playlistId && (
          <span className="absolute top-2 left-2 text-[0.55rem] tracking-[0.2em] uppercase font-body bg-olive-gold/90 text-charcoal px-2 py-0.5">
            Playlist
          </span>
        )}

        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="w-12 h-12 rounded-full bg-crimson flex items-center justify-center text-off-white shadow-lg
                       opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                       transition-all duration-300"
          >
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden>
              <path d="M1 0L12 7L1 14V0Z" />
            </svg>
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function VideoRow({
  videos,
  label,
  delay = 0,
}: {
  videos: VideoEntry[];
  label: string;
  delay?: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector("[data-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : 320;
    scrollRef.current.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="mb-10"
    >
      {/* Row header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-[0.62rem] tracking-[0.3em] uppercase font-body text-charcoal/40">
          {label}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="w-8 h-8 flex items-center justify-center border border-charcoal/12 text-charcoal/35 hover:border-charcoal/30 hover:text-charcoal transition-colors duration-200"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M7 1L1 6L7 11" />
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="w-8 h-8 flex items-center justify-center border border-charcoal/12 text-charcoal/35 hover:border-charcoal/30 hover:text-charcoal transition-colors duration-200"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M1 1L7 6L1 11" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-1"
      >
        {videos.map((entry, i) => (
          <VideoCard
            key={entry.id}
            entry={entry}
            sectionTitle={label}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

function CatalogSection({
  number,
  title,
  subtitle,
  children,
}: {
  number: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 md:px-16 lg:px-24 py-12 border-t border-charcoal/8">
      <div className="max-w-7xl mx-auto">

        {/* Catalog header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex items-start gap-6 mb-10"
        >
          <span className="text-[0.6rem] text-charcoal/20 font-body tabular-nums mt-0.5 pt-0.5">
            {number}
          </span>
          <div className="flex-1">
            <h2 className="font-heading font-black text-[clamp(1.8rem,4vw,3.5rem)] leading-tight text-crimson text-render-opt mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-charcoal/40 font-body tracking-wide">{subtitle}</p>
            )}
          </div>
          <div className="w-px self-stretch bg-charcoal/8 hidden md:block" />
        </motion.div>

        {children}
      </div>
    </section>
  );
}

/* ─── Main export ─────────────────────────────────────────────────────────── */

export default function VideoCatalog() {
  return (
    <>
      {/* Catalog 1 */}
      <CatalogSection
        number="01"
        title="Producer & Co-Producer"
        subtitle="for Artists"
      >
        <VideoRow videos={VIET_SINGLES}   label="Vietnamese Singles"    delay={0.05} />
        <VideoRow videos={FULL_PLAYLISTS} label="Full Playlists"         delay={0.1}  />
        <VideoRow videos={INTL_SINGLES}   label="International Singles"  delay={0.15} />
      </CatalogSection>

      {/* Catalog 2 */}
      <CatalogSection
        number="02"
        title="Original Tracks & Remixes"
        subtitle="Solo productions and reworks"
      >
        <VideoRow videos={ORIGINALS} label="Originals & Remixes" delay={0.05} />
      </CatalogSection>
    </>
  );
}
