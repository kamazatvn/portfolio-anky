"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useLanguage } from "../../providers/LanguageProvider";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Scroll-bold: shared progress + explicit per-word range ─────────────── */

function WordSpan({
  word,
  progress,
  start,
  end,
  bold = false,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  bold?: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  return (
    <motion.span style={{ opacity, fontWeight: bold ? 700 : undefined }}>
      {word}{" "}
    </motion.span>
  );
}

function ScrollBoldParagraph({
  text,
  progress,
  rangeStart,
  rangeEnd,
  className,
}: {
  text: string;
  progress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
  className?: string;
}) {
  const words = text.split(" ");
  const span = rangeEnd - rangeStart;

  return (
    <p className={className}>
      {words.map((word, i) => {
        const wordStart = rangeStart + (i / words.length) * 0.85 * span;
        const wordEnd   = rangeStart + Math.min(((i + 3) / words.length) * 0.85, 1) * span;
        return (
          <WordSpan key={i} word={word} progress={progress} start={wordStart} end={wordEnd} bold={word.startsWith("ANKY")} />
        );
      })}
    </p>
  );
}

function SequentialBoldText({ className, imageSlot }: { className?: string; imageSlot?: React.ReactNode }) {
  const { t } = useLanguage();
  const P1 = t.about.p1;
  const P2 = t.about.p2;
  const P3 = t.about.p3;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.15"],
  });

  return (
    <div ref={containerRef} className={className}>
      <div className="flex items-start gap-2.5">
        <span className="triangle-blink mt-1.5" />
        <ScrollBoldParagraph
          text={P1}
          progress={scrollYProgress}
          rangeStart={0}
          rangeEnd={0.30}
          className="text-charcoal/70 font-body text-[1.05rem] leading-relaxed flex-1"
        />
      </div>
      {imageSlot}
      <div className="flex items-start gap-2.5 mt-5">
        <span className="triangle-blink mt-1.5" />
        <ScrollBoldParagraph
          text={P2}
          progress={scrollYProgress}
          rangeStart={0.35}
          rangeEnd={0.65}
          className="text-charcoal/55 font-body text-base leading-relaxed flex-1"
        />
      </div>
      <div className="flex items-start gap-2.5 mt-5">
        <span className="triangle-blink mt-1.5" />
        <ScrollBoldParagraph
          text={P3}
          progress={scrollYProgress}
          rangeStart={0.70}
          rangeEnd={1.0}
          className="text-charcoal/45 font-body text-base leading-relaxed flex-1"
        />
      </div>
    </div>
  );
}

function PhilosophySection() {
  const { t } = useLanguage();
  const QUOTE = t.about.philosophyQuote;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.25"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]
  );

  const qClass =
    "font-heading font-bold text-[clamp(1.6rem,3.5vw,2.75rem)] leading-[1.15] text-render-opt";

  return (
    <section
      ref={sectionRef}
      className="px-8 md:px-16 lg:px-24 py-24 border-t border-charcoal/10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-2">
            <span className="text-xs tracking-[0.35em] text-olive-gold font-body uppercase">
              {t.about.philosophy}
            </span>
          </div>

          <div className="lg:col-span-9 lg:col-start-4">
            {/* Three layers in the same grid cell: spacer → outline → solid (clipped) */}
            <div className="grid grid-cols-1">
              {/* Spacer — invisible, establishes container height */}
              <blockquote className={`row-start-1 col-start-1 invisible ${qClass}`} aria-hidden>
                {QUOTE}
              </blockquote>
              {/* Outline layer — stroke only, no fill */}
              <blockquote
                className={`row-start-1 col-start-1 ${qClass}`}
                style={{ color: "transparent", WebkitTextStroke: "1.5px #912F40" }}
                aria-hidden
              >
                {QUOTE}
              </blockquote>
              {/* Solid fill layer — revealed top-to-bottom as user scrolls */}
              <motion.blockquote
                className={`row-start-1 col-start-1 text-crimson ${qClass}`}
                style={{ clipPath }}
              >
                {QUOTE}
              </motion.blockquote>
            </div>

            <p className="mt-8 text-charcoal/50 font-body text-base leading-relaxed max-w-2xl">
              {t.about.philosophyBody}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Animated stat counter ──────────────────────────────────────────────── */

function StatCounter({
  target,
  suffix,
  label,
  delay = 0,
}: {
  target: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      delay,
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });

    return () => controls.stop();
  }, [isInView, target, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="bg-off-white px-6 py-10"
    >
      <p className="font-heading font-black text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-crimson text-render-opt">
        {display}
        {suffix}
      </p>
      <p className="text-xs tracking-[0.2em] text-charcoal/40 font-body uppercase mt-3">
        {label}
      </p>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export default function AboutHero() {
  const { t } = useLanguage();
  return (
    <>
      {/* ── 1. Intro ──────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-24 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs tracking-[0.35em] text-olive-gold font-body uppercase mb-12"
          >
            {t.about.eyebrow}
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            <div className="lg:col-span-7 flex flex-col gap-10">
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                className="font-heading font-black text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight text-crimson text-render-opt"
              >
                {t.about.headingLine1}
                <br />
                {t.about.headingLine2}
                <br />
                {t.about.headingLine3}
              </motion.h1>

              <SequentialBoldText
                className="max-w-lg"
                imageSlot={
                  <div className="lg:hidden my-8 relative aspect-3/4 overflow-hidden">
                    <Image
                      src="/ankyphoto2.JPG"
                      alt="Anky"
                      fill
                      className="object-cover object-top"
                      sizes="100vw"
                    />
                  </div>
                }
              />

              {/* Lohi5 Production credit */}
              <div className="flex items-center gap-3 pt-6 border-t border-charcoal/10">
                <Image
                  src="/lohi5-logo.png"
                  alt="Lohi5 Production"
                  width={28}
                  height={28}
                  className="opacity-60 object-contain"
                />
                <p className="text-[0.6rem] tracking-[0.22em] text-charcoal/40 font-body uppercase">
                  {t.about.poweredBy} <span className="text-charcoal/65 font-medium">Lohi5 Production</span>
                </p>
              </div>
            </div>

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.3 }}
              className="hidden lg:block lg:col-span-5"
            >
              <div className="relative aspect-3/4 overflow-hidden">
                <Image
                  src="/ankyphoto2.JPG"
                  alt="Anky"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Stats ──────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-24 py-8 sm:py-20 border-t border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-charcoal/8">
            <StatCounter target={8}   suffix="+"  label={t.about.yearsActive}      delay={0}   />
            <StatCounter target={200} suffix="+"  label={t.about.tracksProduced}   delay={0.1} />
            <StatCounter target={10}  suffix="+"  label={t.about.livePerformances} delay={0.2} />
          </div>
        </div>
      </section>

      {/* ── 3. Philosophy (fill-text reveal) ──────────────────────── */}
      <PhilosophySection />

      {/* ── 4. Photo pair ─────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-24 pb-28 border-t border-charcoal/10 pt-20">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 items-start">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative aspect-4/5 overflow-hidden"
            >
              <Image
                src="/anky1.jpg"
                alt="Anky"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              className="relative aspect-3/4 overflow-hidden sm:mt-20"
            >
              <Image
                src="/anky2.jpg"
                alt="Anky"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
