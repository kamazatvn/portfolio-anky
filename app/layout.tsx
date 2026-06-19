import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider  from "./providers/SmoothScrollProvider";
import { AudioPlayerProvider } from "./providers/AudioPlayerProvider";
import { VideoPlayerProvider } from "./providers/VideoPlayerProvider";
import SiteRevealWrapper    from "./components/SiteRevealWrapper";
import Nav               from "./components/Nav";
import MiniPlayer        from "./components/MiniPlayer";
import GlobalVideoPlayer from "./components/GlobalVideoPlayer";
import CustomCursor      from "./components/CustomCursor";
import Footer            from "./components/Footer";

export const metadata: Metadata = {
  title: "Anky — Music Producer & DJ",
  description:
    "Official portfolio of Anky — music producer, DJ, and sound architect. Listen to releases, explore the work, and book for your next project or event.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full antialiased flex flex-col">
        <SmoothScrollProvider>
          <AudioPlayerProvider>
            <VideoPlayerProvider>
              <SiteRevealWrapper>
                <Nav />
                <div className="flex-1">{children}</div>
                <Footer />
                <MiniPlayer />
                <GlobalVideoPlayer />
                <CustomCursor />
              </SiteRevealWrapper>
            </VideoPlayerProvider>
          </AudioPlayerProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
