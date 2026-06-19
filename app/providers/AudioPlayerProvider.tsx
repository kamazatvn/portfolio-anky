"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Track = {
  id: number;
  title: string;
  type: string;
  year: string;
  src: string;
};

type AudioCtx = {
  track: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  play: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  seek: (seconds: number) => void;
  setVolume: (v: number) => void;
  close: () => void;
};

const AudioContext = createContext<AudioCtx | null>(null);

export function useAudioPlayer() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudioPlayer must be inside AudioPlayerProvider");
  return ctx;
}

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [track, setTrack]         = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [duration, setDuration]   = useState(0);
  const [volume, setVolumeState]  = useState(1);
  const audioRef                  = useRef<HTMLAudioElement>(null);

  const play = useCallback(
    (next: Track) => {
      const el = audioRef.current;
      if (!el) return;

      if (track?.id === next.id) {
        // Toggle same track
        if (isPlaying) {
          el.pause();
          setIsPlaying(false);
        } else {
          void el.play().then(() => setIsPlaying(true));
        }
      } else {
        // Switch to new track
        el.pause();
        setTrack(next);
        setProgress(0);
        el.src = next.src;
        void el.play().then(() => setIsPlaying(true));
      }
    },
    [track, isPlaying],
  );

  const pause  = useCallback(() => { audioRef.current?.pause(); setIsPlaying(false); }, []);
  const resume = useCallback(() => { void audioRef.current?.play().then(() => setIsPlaying(true)); }, []);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (audioRef.current) audioRef.current.volume = clamped;
  }, []);

  const seek = useCallback((s: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = s;
    setProgress(s);
  }, []);

  const close = useCallback(() => {
    audioRef.current?.pause();
    setTrack(null);
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);
  }, []);

  return (
    <AudioContext.Provider
      value={{ track, isPlaying, progress, duration, volume, play, pause, resume, seek, setVolume, close }}
    >
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={() => setProgress(audioRef.current?.currentTime ?? 0)}
        onDurationChange={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setIsPlaying(false)}
      />
    </AudioContext.Provider>
  );
}
