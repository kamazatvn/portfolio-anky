import type { MetadataRoute } from "next";

const BASE = "https://ankymusic.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,                  lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/about`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/projects`,    lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/book`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,     lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
  ];
}
