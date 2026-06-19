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

// ← Replace with your actual domain once you know it
const SITE_URL = "https://ankymusic.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Person", "MusicGroup"],
      "@id": `${SITE_URL}/#person`,
      name: "Anky",
      url: SITE_URL,
      jobTitle: "Music Producer & DJ",
      description:
        "Official portfolio of Anky — music producer and DJ specializing in hip-hop, R&B, and electronic music. Based in Prague, Czech Republic.",
      image: `${SITE_URL}/anky1.jpg`,
      sameAs: [
        "https://www.instagram.com/YOUR_HANDLE",
        "https://open.spotify.com/artist/YOUR_ID",
        "https://www.youtube.com/@YOUR_HANDLE",
        "https://soundcloud.com/YOUR_HANDLE",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Anky — Music Production & DJ Services",
      url: SITE_URL,
      description: "Professional music production, mixing, and DJ services worldwide.",
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Music Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Beat Production",
              description: "Original beats in hip-hop, R&B, and electronic genres.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mixing",
              description: "Professional audio mixing for artists and labels.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "DJ Performance",
              description: "Live DJ sets for events, clubs, and festivals.",
            },
          },
        ],
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Anky | Music Producer & DJ",
    template: "%s | Anky",
  },
  description:
    "Official portfolio of Anky — music producer and DJ specializing in hip-hop, R&B, and electronic music. Based in Prague, Czech Republic.",
  keywords: [
    "music producer",
    "DJ",
    "Anky",
    "hip-hop producer",
    "R&B beats",
    "electronic music",
    "Prague DJ",
    "beatmaker",
    "Producer Anky",
  ],
  authors: [{ name: "Anky", url: SITE_URL }],
  creator: "Anky",
  openGraph: {
    type: "website",
    siteName: "Anky",
    title: "Anky | Music Producer & DJ",
    description:
      "Official portfolio of Anky — music producer and DJ specializing in hip-hop, R&B, and electronic music.",
    url: SITE_URL,
    images: [
      {
        url: "/anky1.jpg",
        width: 1200,
        height: 630,
        alt: "Anky — Music Producer & DJ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anky | Music Producer & DJ",
    description:
      "Official portfolio of Anky — music producer and DJ specializing in hip-hop, R&B, and electronic music.",
    images: ["/anky1.jpg"],
  },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080705" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFA" },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
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
