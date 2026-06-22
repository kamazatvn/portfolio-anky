"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../providers/LanguageProvider";

const SRC_PRIMARY  = "/producer-tag.mp3";
const SRC_FALLBACK = "/ANKY%20PRODUCER%20TAG.wav";

// ─── Shadow + gradient constants ───────────────────────────────────────────────
// Light source assumed upper-left, consistent with the reference image.

// Outer bezel — dark powder-coated cylinder
const BEZEL_SHADOW = [
  "0 20px 55px rgba(0,0,0,0.90)",
  "0 10px 26px rgba(0,0,0,0.74)",
  "0 4px 10px rgba(0,0,0,0.62)",
  "inset 0 1px 0 rgba(255,255,255,0.07)",
  "inset 0 -3px 6px rgba(0,0,0,0.82)",
].join(", ");

// Brushed stainless ring — conic sweep mimics lathe-turned machining marks
const METALLIC_BG = [
  "conic-gradient(",
  "  from 195deg at 50% 50%,",
  "  #2c2c32 0deg,",
  "  #7c7c88 28deg,",
  "  #babac8 52deg,",
  "  #d6d6e4 72deg,",   // primary reflection band
  "  #aeaebb 92deg,",
  "  #666672 122deg,",
  "  #343438 168deg,",
  "  #1c1c20 210deg,",
  "  #505058 252deg,",
  "  #909098 296deg,",
  "  #c2c2ce 330deg,",
  "  #9696a2 352deg,",
  "  #2c2c32 360deg",
  ")",
].join("");

// ─── Dome cap gradients — four compound layers, top-to-bottom blend order ────

// ① Intense specular spike (pure overhead studio light, upper-left focus)
const G_SPECULAR =
  "radial-gradient(circle at 28% 20%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.88) 3.5%, transparent 14%)";

// ② Large primary highlight — the broad bright zone of the convex dome
const G_HIGHLIGHT =
  "radial-gradient(ellipse 66% 52% at 32% 26%, rgba(255,200,182,0.97) 0%, rgba(255,118,88,0.52) 48%, transparent 72%)";

// ③ Soft left-rim ambient — wrap-around from the environment
const G_RIM =
  "radial-gradient(ellipse 30% 66% at 5% 52%, rgba(255,118,96,0.28) 0%, transparent 100%)";

// ④ Base sphere shading — lit centre fading to near-black at the edges
const G_BASE =
  "radial-gradient(ellipse 100% 94% at 38% 28%, #ff2e2e 0%, #cc0000 28%, #880000 56%, #3e0000 80%, #190000 100%)";

const CAP_BG_IDLE    = [G_SPECULAR, G_HIGHLIGHT, G_RIM, G_BASE].join(", ");

// Hover: highlight lifts very slightly in brightness
const CAP_BG_HOVER   = [
  "radial-gradient(circle at 28% 20%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.92) 4%, transparent 15%)",
  "radial-gradient(ellipse 68% 54% at 32% 26%, rgba(255,212,196,0.99) 0%, rgba(255,134,102,0.60) 48%, transparent 72%)",
  "radial-gradient(ellipse 30% 66% at 5% 52%, rgba(255,134,110,0.36) 0%, transparent 100%)",
  "radial-gradient(ellipse 100% 94% at 38% 28%, #ff3838 0%, #dd0000 28%, #960000 56%, #450000 80%, #1c0000 100%)",
].join(", ");

// Pressed: specular shifts & dims — dome is "compressed", viewed head-on
const CAP_BG_PRESSED = [
  "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.44) 5%, transparent 18%)",
  "radial-gradient(ellipse 60% 46% at 36% 34%, rgba(255,175,155,0.82) 0%, rgba(255,68,46,0.30) 55%, transparent 75%)",
  "radial-gradient(ellipse 100% 94% at 42% 36%, #e81818 0%, #ba0000 32%, #720000 60%, #2c0000 82%, #110000 100%)",
].join(", ");

// ─── Cap box-shadows per state ─────────────────────────────────────────────────

const CAP_SHADOW_IDLE = [
  "0 8px 24px rgba(0,0,0,0.80)",          // cap casting shadow on the well floor
  "0 3px 8px rgba(0,0,0,0.58)",
  "0 -1px 0 rgba(255,76,56,0.18)",        // very faint upper-rim back-light
  "inset 0 -8px 18px rgba(0,0,0,0.50)",   // interior darkening at the bottom
  "inset 0 2px 6px rgba(255,158,136,0.26)",// light collecting at the top interior
].join(", ");

const CAP_SHADOW_HOVER = [
  "0 0 32px rgba(200,28,8,0.62)",          // powered-up red halo
  "0 8px 24px rgba(0,0,0,0.80)",
  "0 3px 8px rgba(0,0,0,0.58)",
  "inset 0 -8px 18px rgba(0,0,0,0.46)",
  "inset 0 2px 6px rgba(255,176,152,0.34)",
].join(", ");

const CAP_SHADOW_PRESSED = [
  "0 0 26px rgba(200,52,18,0.72)",         // glow from the well cavity
  "0 2px 8px rgba(0,0,0,0.70)",
  "inset 0 4px 16px rgba(0,0,0,0.60)",     // cavity inset when depressed
  "inset 0 8px 24px rgba(0,0,0,0.44)",
].join(", ");

const CAP_SHADOW_FLASH = [
  "0 0 56px rgba(255,188,128,0.94)",       // brilliant mechanical flash
  "0 0 24px rgba(255,88,28,1.0)",
  "0 2px 8px rgba(0,0,0,0.65)",
  "inset 0 3px 12px rgba(0,0,0,0.42)",
].join(", ");

// ─── Inner-well LED glow (changes with state) ──────────────────────────────────

function wellShadow(hovered: boolean, pressed: boolean, flashing: boolean): string {
  const base = "inset 0 4px 14px rgba(0,0,0,0.92)";
  if (flashing)  return `${base}, inset 0 0 32px rgba(255,148,78,0.88)`;
  if (pressed)   return `${base}, inset 0 0 24px rgba(200,48,16,0.80)`;
  if (hovered)   return `${base}, inset 0 0 20px rgba(162,14,4,0.68)`;
  return               `${base}, inset 0 0 10px rgba(102,0,0,0.38)`;
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ProducerTagButton() {
  const { t } = useLanguage();
  const audioRef    = useRef<HTMLAudioElement | null>(null);
  const flashTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [hovered,  setHovered]  = useState(false);
  const [pressed,  setPressed]  = useState(false);
  const [flashing, setFlashing] = useState(false);
  const [played,   setPlayed]   = useState(false);

  useEffect(() => {
    const audio = new Audio(SRC_PRIMARY);
    audio.preload = "auto";
    audio.addEventListener("error", () => { audio.src = SRC_FALLBACK; }, { once: true });
    audioRef.current = audio;
    return () => {
      audio.src = "";
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  const trigger = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setPlayed(true);
  }, []);

  const handleDown = useCallback(() => {
    setPressed(true);
    setFlashing(true);
    trigger();
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlashing(false), 148);
  }, [trigger]);

  const handleUp         = useCallback(() => setPressed(false), []);
  const handleEnter      = useCallback(() => setHovered(true), []);
  const handleLeaveOrUp  = useCallback(() => { setHovered(false); setPressed(false); }, []);

  // ── Derived per-frame values ───────────────────────────────────────────────
  const capBg     = pressed ? CAP_BG_PRESSED : hovered ? CAP_BG_HOVER : CAP_BG_IDLE;
  const capShadow = flashing ? CAP_SHADOW_FLASH : pressed ? CAP_SHADOW_PRESSED : hovered ? CAP_SHADOW_HOVER : CAP_SHADOW_IDLE;

  // Idle: cap rides 5 px proud of the bezel. Pressed: collapses 4 px into well.
  const capY = pressed ? "translateY(4px)" : "translateY(-5px)";
  const capTx = pressed
    ? "transform 46ms linear, box-shadow 46ms linear, background 46ms linear"
    : "transform 122ms cubic-bezier(0.2, 0, 0, 1), box-shadow 122ms ease-out, background 200ms ease-out";

  return (
    <div className="flex items-center gap-7 select-none">

      {/* ── Padding wrapper lets the raised cap breathe above the layout line ── */}
      <div style={{ paddingTop: 7, marginTop: -7 }}>
        <button
          aria-label={t.about.producerTagAriaLabel}
          onPointerDown={handleDown}
          onPointerUp={handleUp}
          onPointerLeave={handleLeaveOrUp}
          onPointerEnter={handleEnter}
          onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); handleDown(); } }}
          onKeyUp={(e)   => { if (e.key === " " || e.key === "Enter") handleUp(); }}
          style={{
            position: "relative",
            display: "block",
            width: 90,
            height: 90,
            borderRadius: "50%",
            // ── Outer bezel: dark powder-coated machined metal ──
            background: "radial-gradient(ellipse 78% 72% at 36% 26%, #252528 0%, #16161a 58%, #0b0b0e 100%)",
            boxShadow: BEZEL_SHADOW,
          }}
          className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-off-white"
        >

          {/* ── Layer 1: brushed stainless steel ring (inset 4 px) ─────────── */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 4,
              borderRadius: "50%",
              background: METALLIC_BG,
              boxShadow: [
                "inset 0 2px 5px rgba(255,255,255,0.10)",
                "inset 0 -2px 5px rgba(0,0,0,0.72)",
              ].join(", "),
            }}
          />

          {/* ── Layer 2: inner dark cavity / well (inset 9 px) ─────────────── */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 9,
              borderRadius: "50%",
              background: "radial-gradient(circle at 44% 38%, #07000a 0%, #000 100%)",
              boxShadow: wellShadow(hovered, pressed, flashing),
              transition: "box-shadow 200ms ease",
            }}
          />

          {/* ── Layer 3: ruby-red acrylic dome cap (inset 14 px) ───────────── */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 14,
              borderRadius: "50%",
              background: capBg,
              boxShadow: capShadow,
              transform: capY,
              transition: capTx,
              zIndex: 2,
            }}
          />

        </button>
      </div>

      {/* ── Silkscreen micro-copy ──────────────────────────────────────────── */}
      <AnimatePresence>
        {!played && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6, transition: { duration: 0.28, ease: "easeIn" } }}
            transition={{ duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/*
              Double-layer silkscreen illusion:
              A ghost copy offset by ~0.6 px simulates the slight ink bleed and
              registration variance of a physical screen-print on metal.
            */}
            <span
              aria-hidden
              className="absolute font-body uppercase whitespace-nowrap pointer-events-none"
              style={{
                fontSize: "0.56rem",
                letterSpacing: "0.26em",
                color: "rgba(64,67,78,0.08)",
                transform: "translate(0.6px, 0.7px)",
              }}
            >
              {t.about.producerTagHint}
            </span>

            <motion.span
              className="relative block font-body uppercase whitespace-nowrap"
              style={{
                fontSize: "0.56rem",
                letterSpacing: "0.26em",
                color: "rgba(64,67,78,0.26)",
                // Ink-on-metal: very faint hot-spot below each character
                textShadow: "0 0.5px 0 rgba(255,255,255,0.52)",
              }}
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.8 }}
            >
              {t.about.producerTagHint}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
