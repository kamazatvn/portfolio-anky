import type { MetadataRoute } from "next";

const BASE = "https://ankymusic.com";

const PAGES = [
  { path: "",         changeFrequency: "monthly" as const, priority: 1.0 },
  { path: "/about",   changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/projects",changeFrequency: "weekly"  as const, priority: 0.8 },
  { path: "/book",    changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly"  as const, priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, changeFrequency, priority } of PAGES) {
    // English canonical
    entries.push({
      url: `${BASE}${path || "/"}`,
      lastModified: now,
      changeFrequency,
      priority,
    });
    // Vietnamese alternate
    entries.push({
      url: `${BASE}/vn${path}`,
      lastModified: now,
      changeFrequency,
      priority: Math.round(priority * 0.9 * 10) / 10,
    });
  }

  return entries;
}
