"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "motion/react";
import { useLanguage } from "../../providers/LanguageProvider";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Artist = {
  name: string;
  country: string;
  image: string;
  genres: string[];
  bio: string;
  spotifyId: string;
};

export const ARTISTS: Artist[] = [
  {
    name: "LOWG",
    country: "VN",
    image: "/artist/lowg.jpg",
    genres: ["Hiphop Trap"],
    bio: "One of Vietnam's most dynamic rap artists, LOWG blends sharp lyricism with melodic sensibility. Anky's production crafted the atmospheric undertones that have become a hallmark of LOWG's studio sound.",
    spotifyId: "6TITnFVRcl0AcZ4syE7Toe",
  },
  {
    name: "7DNIGHT",
    country: "VN",
    image: "/artist/7dnight.jpg",
    genres: ["Hiphop Trap"],
    bio: "7DNIGHT is a multi-layered R&B act known for emotionally charged vocals and cinematic production. Their collaboration with Anky spans multiple releases, each pushing the boundaries of Vietnamese contemporary R&B.",
    spotifyId: "3gucoX521KgXuoUnRbn0Bn",
  },
  {
    name: "BLACKA",
    country: "VN",
    image: "/artist/blacka.jpeg",
    genres: ["Hiphop Trap"],
    bio: "BLACKA is one of Vietnam's foremost hip-hop voices, delivering hard-hitting tracks with undeniable presence. Anky's production brings a dark, textured backdrop that amplifies BLACKA's commanding delivery.",
    spotifyId: "0JggLWdYe1p6oHZoHpyPSD",
  },
  {
    name: "MARTIN MATYS",
    country: "CZ",
    image: "/artist/martinmatys.png",
    genres: ["Hiphop Trap"],
    bio: "Prague-based Martin Matys is a forward-thinking electronic artist whose work sits at the intersection of deep house and contemporary techno. His collaboration with Anky reflects a shared commitment to dancefloor craft.",
    spotifyId: "2Uk5UpPwQk0VfE2NJ9Eget",
  },
  {
    name: "52HZ",
    country: "VN",
    image: "/artist/52hz.jpeg",
    genres: ["Pop R&B"],
    bio: "Named after the loneliest whale, 52HZ crafts introspective electronic music that resonates deeply with a generation searching for connection. Anky's contributions add textural depth and rhythmic precision to their releases.",
    spotifyId: "1y28JlO6rDMUB5rkcA4RAh",
  },
  {
    name: "SA MILO",
    country: "VN",
    image: "/artist/samilo.jpeg",
    genres: ["Hiphop Trap"],
    bio: "SA MILO is a Vietnamese artist known for blending pop sensibility with electronic edge. Their collaboration with Anky spans both studio productions and live arrangements, building a distinctive crossover sound.",
    spotifyId: "55YrB6LSt3ZShzAiBXTEcA",
  },
  {
    name: "TAGE",
    country: "VN",
    image: "/artist/tage.jpeg",
    genres: ["Hiphop Trap"],
    bio: "TAGE is an emerging voice in Vietnam's rap scene, known for raw energy and an unfiltered approach to storytelling. Anky's production gives TAGE's visceral delivery a polished, hard-hitting sonic foundation.",
    spotifyId: "6kFhNMq6O8P5QKdqlGMUVW",
  },
];

/* ─── Individual artist card ──────────────────────────────────────────────── */

function ArtistCard({
  artist,
  index,
  onSelect,
}: {
  artist: Artist;
  index: number;
  onSelect: (a: Artist) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXTarget = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateYTarget = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const rotateX = useSpring(rotateXTarget, { stiffness: 400, damping: 30 });
  const rotateY = useSpring(rotateYTarget, { stiffness: 400, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
      className="aspect-square"
      style={{ perspective: isTouch ? "none" : "1000px" }}
    >
      <motion.div
        ref={cardRef}
        className="relative w-full h-full overflow-hidden cursor-pointer group"
        style={{ rotateX: isTouch ? 0 : rotateX, rotateY: isTouch ? 0 : rotateY, scale }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { if (!isTouch) scale.set(1.04); }}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(artist)}
      >
        {/* Photo */}
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Bottom gradient scrim */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(8,7,5,0.88) 0%, rgba(8,7,5,0.38) 45%, transparent 70%)",
          }}
        />

        {/* Country tag */}
        <span className="absolute top-4 right-4 text-[0.55rem] tracking-[0.25em] text-off-white/50 font-body uppercase">
          {artist.country}
        </span>

        {/* Accent dot */}
        <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-crimson/60 group-hover:bg-crimson transition-colors duration-300" />

        {/* Name area */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="w-8 h-px bg-crimson/50 group-hover:bg-crimson mb-3 transition-colors duration-300" />
          <h3
            className="font-heading font-black text-off-white text-render-opt leading-tight text-[clamp(1rem,2.8vw,1.5rem)]"
            style={{ fontFamily: '"Neue Plak", "Arial Black", sans-serif' }}
          >
            {artist.name}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            {artist.genres.slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-[0.5rem] tracking-[0.2em] font-body uppercase text-off-white/60 border border-off-white/20 px-1.5 py-0.5"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Artist modal ────────────────────────────────────────────────────────── */

function ArtistModal({
  artist,
  bio,
  onClose,
}: {
  artist: Artist;
  bio: string;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-60 flex items-start sm:items-center justify-center pt-20 px-4 pb-4 sm:p-8 cursor-pointer"
      style={{ backgroundColor: "rgba(8,7,5,0.65)", backdropFilter: "blur(3px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative w-full max-w-2xl overflow-hidden cursor-default"
        style={{
          backgroundColor: "rgba(18, 16, 24, 0.52)",
          backdropFilter: "blur(32px) saturate(160%)",
          WebkitBackdropFilter: "blur(32px) saturate(160%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label={t.artists.close}
          className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center text-sm text-off-white/50 hover:text-off-white hover:bg-off-white/10 transition-colors duration-200"
        >
          ✕
        </button>

        {/* Scrollable inner content — capped at 88 vh so the modal never
            exceeds the viewport; the close button stays accessible above */}
        <div className="overflow-y-auto" style={{ maxHeight: "88vh" }}>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Photo */}
            <div className="relative aspect-square sm:min-h-80 sm:aspect-auto">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col justify-center gap-5">
              <div>
                <span className="text-[0.58rem] tracking-[0.3em] font-body uppercase text-crimson/70">
                  {artist.country}
                </span>
                <h2
                  className="font-heading font-black text-off-white text-[clamp(1.5rem,4vw,2.25rem)] leading-tight text-render-opt mt-1"
                  style={{ fontFamily: '"Neue Plak", "Arial Black", sans-serif' }}
                >
                  {artist.name}
                </h2>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {artist.genres.map((g) => (
                  <span
                    key={g}
                    className="text-[0.55rem] tracking-[0.2em] font-body uppercase text-crimson border border-crimson/40 px-2 py-1"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-off-white/60 font-body text-sm leading-relaxed">
                {bio}
              </p>
            </div>
          </div>

          {/* Spotify embed — full-width strip below the photo/info grid */}
          <div
            className="px-6 pb-6 pt-5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-[0.55rem] tracking-[0.3em] font-body uppercase text-off-white/25 mb-3">
              {t.artists.listenOnSpotify}
            </p>
            <iframe
              src={`https://open.spotify.com/embed/artist/${artist.spotifyId}?utm_source=generator&theme=0`}
              width="100%"
              height="200"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title={`${artist.name} on Spotify`}
              style={{ border: "none", borderRadius: "8px", display: "block" }}
            />
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main grid ───────────────────────────────────────────────────────────── */

export default function ArtistsGrid() {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const { t } = useLanguage();

  return (
    <section className="px-5 md:px-16 lg:px-24 py-16 bg-off-white">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-6 mb-16"
        >
          <span className="text-xs tracking-[0.35em] text-olive-gold font-body uppercase whitespace-nowrap">
            {t.artists.sectionTitle}
          </span>
          <div className="flex-1 h-px bg-charcoal/10" />
          <span className="text-xs text-charcoal/20 font-body tabular-nums">
            {ARTISTS.length}
          </span>
        </motion.div>

        {/* Grid — 2 col mobile / 3 col tablet / 4 col desktop, no fillers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {ARTISTS.map((artist, i) => (
            <ArtistCard
              key={artist.name}
              artist={artist}
              index={i}
              onSelect={setSelectedArtist}
            />
          ))}
        </div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="text-xs tracking-[0.25em] text-charcoal/35 font-body uppercase mt-6 text-right"
        >
          {t.artists.andMore}
        </motion.p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedArtist && (
          <ArtistModal
            artist={selectedArtist}
            bio={t.artists.bios[selectedArtist.name] ?? selectedArtist.bio}
            onClose={() => setSelectedArtist(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
