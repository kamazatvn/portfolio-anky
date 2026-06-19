"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type VideoTrack = {
  id: string;
  title: string;
  playlistId?: string;
};

type VideoCtx = {
  activeVideo: VideoTrack | null;
  isMinimized: boolean;
  playVideo: (video: VideoTrack) => void;
  minimize: () => void;
  expand: () => void;
  close: () => void;
};

const VideoContext = createContext<VideoCtx | null>(null);

export function useVideoPlayer() {
  const ctx = useContext(VideoContext);
  if (!ctx) throw new Error("useVideoPlayer must be inside VideoPlayerProvider");
  return ctx;
}

export function VideoPlayerProvider({ children }: { children: ReactNode }) {
  const [activeVideo, setActiveVideo] = useState<VideoTrack | null>(null);
  const [isMinimized, setIsMinimized]  = useState(false);

  const playVideo = useCallback((video: VideoTrack) => {
    setActiveVideo(video);
    setIsMinimized(false);
  }, []);

  const minimize = useCallback(() => setIsMinimized(true), []);
  const expand   = useCallback(() => setIsMinimized(false), []);

  const close = useCallback(() => {
    setActiveVideo(null);
    setIsMinimized(false);
  }, []);

  return (
    <VideoContext.Provider
      value={{ activeVideo, isMinimized, playVideo, minimize, expand, close }}
    >
      {children}
    </VideoContext.Provider>
  );
}
