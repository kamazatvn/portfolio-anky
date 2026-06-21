"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../providers/LanguageProvider";

const SITE = "https://ankymusic.com";

export default function LanguageMeta() {
  const { lang, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    // ── 1. html[lang] ──────────────────────────────────────────────────────
    document.documentElement.lang = lang;

    // ── 2. <title> + <meta name="description"> ────────────────────────────
    document.title = t.seo.title;
    const metaDesc = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (metaDesc) metaDesc.content = t.seo.description;

    // ── 3. Canonical + hreflang ───────────────────────────────────────────
    const isVN = pathname.startsWith("/vn");
    const basePath = isVN ? pathname.slice(3) || "/" : pathname;
    const enUrl  = `${SITE}${basePath}`;
    const vnUrl  = `${SITE}/vn${basePath === "/" ? "" : basePath}`;
    const selfUrl = isVN ? vnUrl : enUrl;

    // Remove previously injected tags
    document.querySelectorAll("link[data-i18n]").forEach((el) => el.remove());

    function addLink(rel: string, attrs: Record<string, string>) {
      const el = document.createElement("link");
      el.rel = rel;
      el.dataset.i18n = "true";
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      document.head.appendChild(el);
    }

    addLink("canonical",  { href: selfUrl });
    addLink("alternate",  { hreflang: "en",        href: enUrl  });
    addLink("alternate",  { hreflang: "vi",        href: vnUrl  });
    addLink("alternate",  { hreflang: "x-default", href: enUrl  });
  }, [lang, t, pathname]);

  return null;
}
