"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../providers/LanguageProvider";
import LanguageToggle from "./LanguageToggle";

type NavLink = { href: string; label: string };

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const links: NavLink[] = [
    { href: "/about",    label: t.nav.about     },
    { href: "/projects", label: t.nav.portfolio  },
    { href: "/book",     label: t.nav.book       },
    { href: "/contact",  label: t.nav.contact    },
  ];

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-off-white/90 backdrop-blur-md border-b border-charcoal/[0.07]" />

        <nav className="relative px-5 md:px-16 lg:px-24 h-16 flex items-center">

          {/* ── Mobile layout: [spacer] [ANKY centered] [hamburger] ── */}
          {/* ── Desktop layout: [ANKY] [nav links right] ──────────── */}

          {/* Left spacer — matches hamburger width so logo is perfectly centred on mobile */}
          <span className="sm:hidden w-10 shrink-0" />

          {/* Wordmark */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-heading font-black text-xl text-crimson hover:text-charcoal transition-colors duration-300 text-render-opt
                       flex-1 text-center sm:flex-none sm:text-left sm:mr-auto"
          >
            ANKY
          </Link>

          {/* Desktop nav links + language toggle */}
          <ul className="hidden sm:flex items-center gap-4 md:gap-8">
            {links.map(({ href, label }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      "relative text-xs tracking-[0.2em] font-body uppercase transition-colors duration-300 pb-0.5",
                      isActive ? "text-crimson" : "text-charcoal/45 hover:text-charcoal",
                    ].join(" ")}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-crimson"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
            <li>
              <span className="text-charcoal/15 text-xs" aria-hidden="true">|</span>
            </li>
            <li>
              <LanguageToggle />
            </li>
          </ul>

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            className="sm:hidden w-10 h-10 shrink-0 flex items-center justify-center"
          >
            <motion.div
              className="flex flex-col justify-between w-5.5 h-3.5"
              animate={open ? "open" : "closed"}
            >
              <motion.span
                className="block h-[1.5px] w-full bg-charcoal rounded-full origin-center"
                variants={{ open: { rotate: 45, y: 6.25 }, closed: { rotate: 0, y: 0 } }}
                transition={{ duration: 0.28, ease: EASE }}
              />
              <motion.span
                className="block h-[1.5px] w-full bg-charcoal rounded-full"
                variants={{ open: { scaleX: 0, opacity: 0 }, closed: { scaleX: 1, opacity: 1 } }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-[1.5px] w-full bg-charcoal rounded-full origin-center"
                variants={{ open: { rotate: -45, y: -6.25 }, closed: { rotate: 0, y: 0 } }}
                transition={{ duration: 0.28, ease: EASE }}
              />
            </motion.div>
          </button>

        </nav>
      </header>

      {/* ── Mobile full-screen overlay menu ──────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden fixed inset-0 z-40 bg-off-white flex flex-col items-center justify-center gap-6 pt-16"
          >
            {links.map(({ href, label }, i) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, delay: i * 0.06, ease: EASE }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={[
                      "font-heading font-black text-[clamp(2.6rem,12vw,4rem)] leading-none tracking-tight text-render-opt transition-colors duration-200",
                      isActive ? "text-crimson" : "text-charcoal/20 hover:text-crimson",
                    ].join(" ")}
                  >
                    {label.toUpperCase()}
                  </Link>
                </motion.div>
              );
            })}

            {/* Language toggle + email — mobile overlay footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              className="absolute bottom-10 flex flex-col items-center gap-3"
            >
              <LanguageToggle />
              <p className="text-[0.6rem] tracking-[0.3em] text-charcoal/20 font-body uppercase">
                anky.lohi5@gmail.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
