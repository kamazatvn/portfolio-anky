"use client";

import { useEffect } from "react";
import { useLanguage } from "../providers/LanguageProvider";

export default function LanguageMeta() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.seo.title;
    const metaDesc = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (metaDesc) metaDesc.content = t.seo.description;
  }, [lang, t]);

  return null;
}
