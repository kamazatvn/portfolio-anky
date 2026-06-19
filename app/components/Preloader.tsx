"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/* ─── SVG coordinate system ───────────────────────────────────────────────── */
const VW        = 880;    // viewBox width  (wide enough for large text)
const VH        = 275;    // viewBox height
const TEXT_X    = VW / 2;
const TEXT_Y    = 228;    // baseline
const FONT_SIZE = 242;    // much larger than before (was 188)

/* ─── Wave parameters ─────────────────────────────────────────────────────── */
const WAVE_AMP   = 16;    // amplitude in SVG units
const NUM_CYCLES = 1.5;   // horizontal periods across the width
const WAVE_SPEED = 3.8;   // phase advance (rad/s)
const FILL_MS    = 4600;  // +2000 ms — slower, more cinematic rise (was 2600)
const WAVE_START = VH + 30;   // 305  — wave begins below viewBox (nothing visible)
const WAVE_END   = 38;         // 38   — wave ends above all text (fully filled)
const NUM_SEGS   = 12;         // bezier segments across the wave

/* ─── Definitively-empty initial clip path ────────────────────────────────── */
// A solid rectangle placed well below the viewBox (y=325–375) so the fill
// layer is guaranteed to be invisible before the animation starts.
const INIT_PATH = `M 0 ${VH + 50} L ${VW} ${VH + 50} L ${VW} ${VH + 100} L 0 ${VH + 100} Z`;

/* ─── Path builder ────────────────────────────────────────────────────────── */
function buildWavePath(waveY: number, phase: number): string {
  const segW = VW / NUM_SEGS;
  const freq = (NUM_CYCLES * 2 * Math.PI) / VW;

  let d = `M 0 ${VH} L 0 ${(waveY + WAVE_AMP * Math.sin(phase)).toFixed(2)}`;

  for (let i = 1; i <= NUM_SEGS; i++) {
    const x   = i * segW;
    const px  = (i - 1) * segW;
    const c1x = px + segW / 3;
    const c2x = px + (2 * segW) / 3;
    const c1y = waveY + WAVE_AMP * Math.sin(freq * c1x + phase);
    const c2y = waveY + WAVE_AMP * Math.sin(freq * c2x + phase);
    const ey  = waveY + WAVE_AMP * Math.sin(freq * x + phase);
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${x.toFixed(2)} ${ey.toFixed(2)}`;
  }

  d += ` L ${VW} ${VH} Z`;
  return d;
}

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function Preloader({ onComplete = () => {} }: { onComplete?: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);
  const pathRef = useRef<SVGPathElement>(null);
  const rafRef  = useRef<number>(0);
  const t0Ref   = useRef<number | null>(null);

  useEffect(() => {
    function tick(ts: number) {
      if (!t0Ref.current) t0Ref.current = ts;
      const elapsed = ts - t0Ref.current;
      const raw     = Math.min(elapsed / FILL_MS, 1);

      // Cubic ease-in-out: slow start → fast middle → slow near top
      const eased = raw < 0.5
        ? 4 * raw ** 3
        : 1 - (-2 * raw + 2) ** 3 / 2;

      const waveY = WAVE_START + (WAVE_END - WAVE_START) * eased;
      const phase = (elapsed / 1000) * WAVE_SPEED;

      if (pathRef.current) {
        pathRef.current.setAttribute("d", buildWavePath(waveY, phase));
      }

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Hold briefly on fully-filled state, then start cross-fade exit
        setTimeout(() => {
          setExiting(true);
          onComplete();
        }, 320);
      }
    }

    // Start animation after fonts load, or after 400ms — whichever comes first.
    // Prevents a stalled document.fonts.ready from blocking the animation.
    let started = false;
    function startRaf() {
      if (started) return;
      started = true;
      setTimeout(() => { rafRef.current = requestAnimationFrame(tick); }, 260);
    }

    const fontTimeout = setTimeout(startRaf, 400);
    document.fonts.ready.then(startRaf);

    return () => {
      clearTimeout(fontTimeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  if (!mounted) return null;

  const sharedTextStyle: React.CSSProperties = {
    fontFamily: `"Neue Plak", "Arial Black", sans-serif`,
    fontWeight: 900,
    fontSize: FONT_SIZE,
    letterSpacing: -6,
  };

  return (
    <motion.div
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.6, 1] }}
      onAnimationComplete={() => { if (exiting) setMounted(false); }}
      className="fixed inset-0 z-200 flex items-center justify-center select-none"
      style={{ backgroundColor: "#FFFFFA" }}
    >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ANKY"
        role="img"
        className="w-[min(88vw,860px)]"
        style={{ overflow: "visible" }}
      >
        <defs>
          <clipPath id="anky-liquid-fill">
            {/* Rectangle well below the viewBox: fill layer is invisible until
                the RAF loop starts moving the wave upward */}
            <path ref={pathRef} d={INIT_PATH} />
          </clipPath>
        </defs>

        {/* Layer 1 — outline stroke, always visible */}
        <text
          x={TEXT_X}
          y={TEXT_Y}
          textAnchor="middle"
          style={sharedTextStyle}
          fill="none"
          stroke="#912F40"
          strokeWidth="2.2"
        >
          ANKY
        </text>

        {/* Layer 2 — solid fill, revealed by the rising liquid wave */}
        <text
          x={TEXT_X}
          y={TEXT_Y}
          textAnchor="middle"
          style={sharedTextStyle}
          fill="#912F40"
          clipPath="url(#anky-liquid-fill)"
        >
          ANKY
        </text>
      </svg>
    </motion.div>
  );
}
