"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const MASK = "linear-gradient(to bottom, black 0%, black 72%, rgba(0,0,0,0.88) 82%, rgba(0,0,0,0.5) 91%, transparent 98%)";

function TypeLine({
  text,
  progress,
  range,
  className,
  style,
}: {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  style?: React.CSSProperties;
}) {
  const charMv = useTransform(progress, range, [0, text.length]);
  const [chars, setChars] = useState(0);

  useMotionValueEvent(charMv, "change", (v) => setChars(Math.round(v)));

  const shown = text.slice(0, chars);
  const typing = chars > 0 && chars < text.length;

  return (
    <span className={className} style={style}>
      {shown}
      {typing && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="ml-0.5 text-crimson"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

const LABEL   = "Anky";
const HEADING = "MUSIC PRODUCER · DJ";
const P1 =
  "I MAKE MUSIC IN TWO WORLDS, ON ONE SIDE, THERE'S HIPHOP AND R&B WITH THE VIBE, 808s, AND BEATS BUILT TO GIVE ARTISTS ROOM TO PERFORM. MY JOB IS TO CREATE A SPACE WHERE YOU CAN EXPRESS YOURSELF FREELY AND TRULY. ON THE OTHER SIDE, THERE'S ELECTRONIC MUSIC WITH A LOT OF SOUND DESIGNS AND HEAVY BASS. TWO DIFFERENT ENERGIES, BUT THE SAME GOAL: MUSIC THAT YOU CAN F*CKING FEEL, NOT SOME AI BULLSH*T";
const P2 =
  "Whatever I'm working on, it always comes back to atmosphere. When you listen to one of my tracks or catch one of my sets, I want you to instantly picture the world you're standing in — the lights, the space, the mood. I've always loved the cinematic side of sound, the way a single texture or tone can tell a whole story before the first lyric even lands. That feeling is what I chase in every project.";

// Canvas: 350 vh mobile / 500 vh desktop (scroll travel 250 / 400 vh).
// All animations complete by progress ≈ 0.55 → hold at black.
export default function HeroIntro() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // ── Phase 1 ───────────────────────────────────────────────────────────────
  const darkOverlay    = useTransform(scrollYProgress, [0, 0.19],   [0, 1]);

  const ankyOpacity    = useTransform(scrollYProgress, [0.02, 0.21], [1, 0]);
  const ankyVisibility = useTransform(ankyOpacity, (v) => (v < 0.02 ? "hidden" : "visible"));

  const ctaOpacity     = useTransform(scrollYProgress, [0.02, 0.14], [1, 0]);
  const ctaVisibility  = useTransform(ctaOpacity,  (v) => (v < 0.02 ? "hidden" : "visible"));

  const imageX  = useTransform(scrollYProgress, [0.09, 0.23], ["0%", "-25%"]);
  const ankyY   = useTransform(scrollYProgress, [0, 0.21],   ["0px", "-140px"]);

  // ── Phase 2 ───────────────────────────────────────────────────────────────
  const panelOpacity = useTransform(scrollYProgress, [0.22, 0.26], [0, 1]);
  const dividerScale = useTransform(scrollYProgress, [0.24, 0.27], [0, 1]);
  const ctaFadeIn    = useTransform(scrollYProgress, [0.52, 0.55], [0, 1]);

  return (
    <div ref={ref} className="h-[350vh] lg:h-[500vh]" style={{ backgroundColor: "#080705" }}>
      <div
        className="sticky top-0 h-svh overflow-hidden"
        style={{ backgroundColor: "#FFFFFA" }}
      >
        {/* bg crossfade white → black */}
        <motion.div
          style={{ opacity: darkOverlay, backgroundColor: "#080705" }}
          className="absolute inset-0 z-0 pointer-events-none"
        />

        {/* ANKY — z-3 on mobile (above image), z-1 on sm+ (behind transparent PNG) */}
        <motion.div
          style={{ opacity: ankyOpacity, visibility: ankyVisibility, y: ankyY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-3 sm:z-1"
        >
          <h1
            className="font-heading font-black leading-none tracking-tight text-crimson text-render-opt anky-hero-size"
          >
            ANKY
          </h1>
        </motion.div>

        {/* Single image — slides from center to left */}
        <motion.div
          style={{ x: imageX }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="absolute left-0 right-0 bottom-0 top-16 z-2 pointer-events-none"
        >
          <div
            className="relative w-full h-full"
            style={{
              maskImage: MASK,
              WebkitMaskImage: MASK,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              transform: "scale(1.1)",
              transformOrigin: "center top",
            }}
          >
            {/* Mobile: cover+top fills screen width boldly.
                Desktop (sm+): contain+center shows transparent PNG with ANKY showing through. */}
            <Image
              src="/producer.png"
              alt="Anky — music producer and DJ"
              fill
              className="object-cover object-top sm:object-contain sm:object-center"
              priority
              sizes="100vw"
            />
          </div>
        </motion.div>

        {/* Hero CTA — "Contact Me" */}
        <motion.div
          style={{ opacity: ctaOpacity, visibility: ctaVisibility }}
          className="absolute bottom-10 left-0 right-0 flex justify-center sm:justify-end sm:pr-8 md:pr-16 lg:pr-24 z-3"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-crimson text-off-white font-body text-sm tracking-widest uppercase px-7 py-4 hover:bg-charcoal transition-colors duration-300"
          >
            Contact Me <span aria-hidden="true" className="hidden sm:inline">↗</span>
          </Link>
        </motion.div>

        {/* Entry rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
          style={{ transformOrigin: "left" }}
          className="absolute top-16 left-0 right-0 h-px bg-crimson/15 z-3"
        />

        {/* Right text panel */}
        <motion.div
          style={{ opacity: panelOpacity, backgroundColor: "#080705" }}
          className="absolute right-0 top-0 w-full sm:w-1/2 h-full z-4 flex flex-col justify-center pt-16 lg:pt-0 px-5 sm:px-6 lg:px-14 xl:px-20 pointer-events-none"
        >
          <p className="text-xs tracking-[0.35em] text-off-white/45 font-body uppercase mb-6">
            <TypeLine text={LABEL} progress={scrollYProgress} range={[0.23, 0.27]} />
          </p>

          {/* Title — Neue Plak + ALL CAPS */}
          <h2
            className="font-heading font-black leading-[0.92] tracking-tight text-off-white text-render-opt mb-4"
            style={{ fontSize: "clamp(1.8rem, 5vw, 6.5rem)" }}
          >
            <TypeLine text={HEADING} progress={scrollYProgress} range={[0.26, 0.33]} />
          </h2>

          <motion.div
            style={{ scaleX: dividerScale, transformOrigin: "left" }}
            className="w-12 h-px bg-crimson/40 mb-6"
          />

          {/* Descriptive text */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-2.5">
              <span className="triangle-blink mt-0.5" />
              <p className="font-heading font-black uppercase text-off-white/80 text-[0.72rem] sm:text-[0.8rem] lg:text-[0.9rem] leading-snug tracking-wider">
                <TypeLine text={P1} progress={scrollYProgress} range={[0.32, 0.46]} />
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="triangle-blink mt-0.5" />
              <p
                className="font-normal uppercase text-off-white/50 text-[0.68rem] sm:text-[0.75rem] lg:text-[0.85rem] leading-loose tracking-wide"
                style={{ fontFamily: '"Avant Garde Gothic", "Century Gothic", sans-serif' }}
              >
                <TypeLine text={P2} progress={scrollYProgress} range={[0.45, 0.54]} />
              </p>
            </div>
          </div>

          <motion.div style={{ opacity: ctaFadeIn }} className="pointer-events-auto absolute bottom-6 left-0 right-0 flex justify-center sm:static sm:block">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-crimson text-off-white font-body text-xs sm:text-sm tracking-widest uppercase px-4 sm:px-7 py-3 sm:py-4 hover:bg-crimson transition-colors duration-300"
            >
              Full Story <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
