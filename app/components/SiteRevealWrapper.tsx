"use client";

import { useState, useEffect } from "react";
import Preloader from "./Preloader";

let preloaderHasRun = false;

export default function SiteRevealWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    if (!preloaderHasRun) {
      const id = setTimeout(() => setShowPreloader(true));
      return () => clearTimeout(id);
    }
  }, []);

  function handleComplete() {
    preloaderHasRun = true;
    // Do NOT unmount here — Preloader fades itself out over 1.2 s then
    // sets mounted=false internally. Removing it from here would cut the
    // animation short.
  }

  return (
    <>
      <div className="flex flex-col flex-1 min-h-screen">
        {children}
      </div>

      {showPreloader && <Preloader onComplete={handleComplete} />}
    </>
  );
}
