"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { translations, type Lang, type Translations } from "../i18n/translations";

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Language is entirely URL-driven: /vn/* → vi, everything else → en
  const lang: Lang = pathname.startsWith("/vn") ? "vi" : "en";

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
