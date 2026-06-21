"use client";

import { useLanguage } from "../providers/LanguageProvider";

export default function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={[
        "flex items-center gap-1 text-[0.6rem] tracking-[0.2em] font-body select-none",
        className,
      ].join(" ")}
    >
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        aria-label="Switch to English"
        className={[
          "transition-colors duration-200",
          lang === "en"
            ? "text-crimson"
            : "text-charcoal/30 hover:text-charcoal",
        ].join(" ")}
      >
        EN
      </button>
      <span className="text-charcoal/20" aria-hidden="true">
        /
      </span>
      <button
        onClick={() => setLang("vi")}
        aria-pressed={lang === "vi"}
        aria-label="Chuyển sang Tiếng Việt"
        className={[
          "transition-colors duration-200",
          lang === "vi"
            ? "text-crimson"
            : "text-charcoal/30 hover:text-charcoal",
        ].join(" ")}
      >
        VN
      </button>
    </div>
  );
}
