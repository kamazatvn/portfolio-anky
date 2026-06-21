"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../providers/LanguageProvider";

/* ─── Icon components ─────────────────────────────────────────────────────── */

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="13" viewBox="0 0 24 17" fill="currentColor" aria-hidden>
      <path d="M23.495 2.656A3.016 3.016 0 0021.373.534C19.505.012 12 .012 12 .012S4.495.012 2.627.534A3.017 3.017 0 00.505 2.656C0 4.524 0 8.424 0 8.424s0 3.9.505 5.768a3.016 3.016 0 002.122 2.122C4.495 16.836 12 16.836 12 16.836s7.505 0 9.373-.522a3.015 3.015 0 002.122-2.122C24 12.324 24 8.424 24 8.424s0-3.9-.505-5.768zM9.545 12.01V4.838L15.818 8.424 9.545 12.01z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

/* ─── Data ────────────────────────────────────────────────────────────────── */

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/lh5.anky/",                                                            icon: <InstagramIcon /> },
  { label: "YouTube",   href: "https://www.youtube.com/channel/UCYOLHKT9zhHoOR2JLTlJnjA",                                       icon: <YouTubeIcon />   },
  { label: "TikTok",    href: "https://www.tiktok.com/@ankyofficially",                                                          icon: <TikTokIcon />    },
  { label: "Spotify",   href: "https://open.spotify.com/artist/6IUsCGkEa3mgApHKonXhLf?si=3vw3ECyORN-tSeT5dkOodw",              icon: <SpotifyIcon />   },
];

/* ─── Component ───────────────────────────────────────────────────────────── */

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer style={{ backgroundColor: "#912F40" }} className="text-off-white">
      <div className="px-5 md:px-16 lg:px-24 py-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">

          {/* Wordmark + tagline */}
          <div>
            <Link
              href="/"
              className="font-heading font-black text-lg text-off-white hover:text-off-white/70 transition-colors duration-200 text-render-opt"
            >
              ANKY
            </Link>
            <p className="text-[0.55rem] tracking-[0.22em] text-off-white/50 font-body uppercase mt-0.5">
              {t.footer.tagline}
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-off-white/60 hover:text-off-white transition-colors duration-200"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Contact + copyright */}
          <div className="flex flex-wrap items-center gap-4 text-[0.58rem] font-body tracking-[0.15em] text-off-white/55">
            <a href="mailto:anky.lohi5@gmail.com" className="hover:text-off-white transition-colors duration-200">
              anky.lohi5@gmail.com
            </a>
            <a href="tel:+420773115935" className="hover:text-off-white transition-colors duration-200">
              +420 773 115 935
            </a>
            <span className="text-off-white/30">
              © {new Date().getFullYear()} Anky
            </span>
          </div>

        </div>

        {/* Lohi5 Production credit */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-off-white/15 max-w-7xl mx-auto">
          <Image
            src="/lohi5-logo.png"
            alt="Lohi5 Production"
            width={18}
            height={18}
            className="opacity-55 object-contain"
          />
          <span className="text-[0.5rem] tracking-[0.22em] font-body uppercase text-off-white/40">
            {t.footer.poweredBy}
          </span>
        </div>

      </div>
    </footer>
  );
}
