"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useVideoPlayer } from "../providers/VideoPlayerProvider";

export default function GlobalVideoPlayer() {
  const { activeVideo, isMinimized, minimize, expand, close } = useVideoPlayer();
  const pathname = usePathname();

  // Auto-minimize when leaving the Portfolio page
  useEffect(() => {
    if (activeVideo && !isMinimized && pathname !== "/projects") {
      minimize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const embedSrc = activeVideo
    ? activeVideo.playlistId
      ? `https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&list=${activeVideo.playlistId}&rel=0`
      : `https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`
    : "";

  return (
    <>
      {/* Backdrop — only when expanded */}
      <AnimatePresence>
        {activeVideo && !isMinimized && (
          <motion.div
            key="yt-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/85 z-[58]"
            onClick={minimize}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/*
        Player container — uses CSS transition for position/size so the
        iframe DOM node is never re-mounted during minimize/expand.
        This keeps YouTube playback uninterrupted.
      */}
      <div
        aria-label={activeVideo ? `Video player: ${activeVideo.title}` : undefined}
        style={{
          position: "fixed",
          zIndex: 59,
          overflow: "hidden",
          boxShadow: "0 25px 60px -12px rgba(0,0,0,0.6)",
          transition: "all 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, visibility 0.3s",
          visibility: activeVideo ? "visible" : "hidden",
          opacity: activeVideo ? 1 : 0,
          pointerEvents: activeVideo ? "auto" : "none",
          ...(isMinimized
            ? {
                bottom: 24,
                right: 24,
                left: "auto",
                top: "auto",
                width: 296,
                transform: "none",
              }
            : {
                top: "50%",
                left: "50%",
                bottom: "auto",
                right: "auto",
                width: "min(88vw, 920px)",
                transform: "translate(-50%, -50%)",
              }),
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-3 py-2 gap-2"
          style={{ background: "rgba(64,67,78,0.98)" }}
        >
          <span className="text-off-white/60 text-[0.65rem] font-body tracking-widest uppercase truncate min-w-0">
            {activeVideo?.title ?? "Now Playing"}
          </span>

          <div className="flex items-center gap-0.5 shrink-0">
            {isMinimized ? (
              <button
                onClick={expand}
                aria-label="Expand player"
                className="text-off-white/45 hover:text-off-white transition-colors duration-150 p-1.5"
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M1 10L10 1M10 1H5M10 1V6" />
                </svg>
              </button>
            ) : (
              <button
                onClick={minimize}
                aria-label="Minimize player"
                className="text-off-white/45 hover:text-off-white transition-colors duration-150 p-1.5"
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M10 1L1 10M1 10H6M1 10V5" />
                </svg>
              </button>
            )}

            <button
              onClick={close}
              aria-label="Close player"
              className="text-off-white/45 hover:text-off-white transition-colors duration-150 p-1.5"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M1 1L10 10M10 1L1 10" />
              </svg>
            </button>
          </div>
        </div>

        {/* 16:9 iframe wrapper */}
        <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000" }}>
          {activeVideo && (
            <iframe
              src={embedSrc}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
