"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAudioPlayer } from "../providers/AudioPlayerProvider";

function fmt(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

function SpeakerIcon({ volume }: { volume: number }) {
  if (volume === 0) {
    return (
      <svg width="15" height="13" viewBox="0 0 16 14" fill="none" aria-hidden>
        <path d="M1 4.5H3.5L7.5 1.5V12.5L3.5 9.5H1V4.5Z" fill="currentColor" />
        <path d="M10 5L13.5 8.5M13.5 5L10 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (volume <= 0.5) {
    return (
      <svg width="15" height="13" viewBox="0 0 16 14" fill="none" aria-hidden>
        <path d="M1 4.5H3.5L7.5 1.5V12.5L3.5 9.5H1V4.5Z" fill="currentColor" />
        <path d="M10 4.5a3.5 3.5 0 010 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  return (
    <svg width="15" height="13" viewBox="0 0 16 14" fill="none" aria-hidden>
      <path d="M1 4.5H3.5L7.5 1.5V12.5L3.5 9.5H1V4.5Z" fill="currentColor" />
      <path d="M10 4.5a3.5 3.5 0 010 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M12 2.5a6.5 6.5 0 010 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function MiniPlayer() {
  const {
    track, isPlaying, progress, duration, volume,
    pause, resume, seek, setVolume, close,
  } = useAudioPlayer();

  const prevVolumeRef  = useRef(1);
  const [showVol, setShowVol] = useState(false);

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  function handleScrub(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    seek(((e.clientX - rect.left) / rect.width) * duration);
  }

  function toggleMute() {
    if (volume > 0) { prevVolumeRef.current = volume; setVolume(0); }
    else              { setVolume(prevVolumeRef.current || 1); }
  }

  return (
    <AnimatePresence>
      {track && (
        <motion.div
          key="mini-player"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 text-off-white"
          style={{
            background: "rgba(64, 67, 78, 0.94)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,250,0.08)",
          }}
        >
          {/* Scrub bar */}
          <div
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            onClick={handleScrub}
            className="w-full h-0.5 bg-off-white/15 cursor-pointer group/scrub"
          >
            <div
              className="h-full bg-crimson/70 group-hover/scrub:bg-crimson transition-colors duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* Controls row */}
          <div className="px-6 md:px-16 lg:px-24 h-14 flex items-center gap-5">

            {/* Play / Pause */}
            <button
              onClick={isPlaying ? pause : resume}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full border border-off-white/25 hover:border-off-white transition-colors duration-200"
            >
              {isPlaying ? (
                <svg width="10" height="11" viewBox="0 0 10 11" fill="currentColor" aria-hidden>
                  <rect x="0" y="0" width="3.5" height="11" rx="0.5" />
                  <rect x="6.5" y="0" width="3.5" height="11" rx="0.5" />
                </svg>
              ) : (
                <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden>
                  <path d="M0 0L10 6L0 12V0Z" />
                </svg>
              )}
            </button>

            {/* Track info */}
            <div className="flex-1 min-w-0">
              <p className="font-heading font-bold text-sm leading-tight truncate text-render-opt">
                {track.title}
              </p>
              <p className="text-[0.62rem] text-off-white/45 font-body tracking-widest uppercase">
                {track.type} &middot; {track.year}
              </p>
            </div>

            {/* Time */}
            <span className="text-xs text-off-white/40 font-body tabular-nums shrink-0 hidden sm:block">
              {fmt(progress)} / {fmt(duration)}
            </span>

            {/* Volume — speaker icon + vertical fader popup */}
            <div
              className="relative hidden sm:flex items-center shrink-0"
              onMouseEnter={() => setShowVol(true)}
              onMouseLeave={() => setShowVol(false)}
            >
              <button
                onClick={toggleMute}
                aria-label={volume === 0 ? "Unmute" : "Mute"}
                className="text-off-white/50 hover:text-off-white transition-colors duration-200 p-1"
              >
                <SpeakerIcon volume={volume} />
              </button>

              <AnimatePresence>
                {showVol && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 flex flex-col items-center gap-2 px-3 pt-3 pb-2 rounded-sm"
                    style={{
                      background: "rgba(64, 67, 78, 0.96)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,250,0.1)",
                    }}
                  >
                    {/* Percentage label */}
                    <span className="text-[0.6rem] text-off-white/50 font-body tabular-nums">
                      {Math.round(volume * 100)}
                    </span>

                    {/* Vertical fader — rotated range input in a fixed-size box */}
                    <div className="h-[88px] w-5 flex items-center justify-center overflow-visible">
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.02}
                        value={volume}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v > 0) prevVolumeRef.current = v;
                          setVolume(v);
                        }}
                        aria-label="Volume"
                        className="volume-fader"
                      />
                    </div>

                    {/* Min label */}
                    <span className="text-[0.6rem] text-off-white/25 font-body">
                      0
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Close */}
            <button
              onClick={close}
              aria-label="Close player"
              className="shrink-0 text-off-white/30 hover:text-off-white transition-colors duration-200 p-1"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M1 1L11 11M11 1L1 11" />
              </svg>
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
