"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../providers/LanguageProvider";

interface Props {
  className?: string;
  size?: "sm" | "lg";
}

function buildPaths(pathname: string) {
  const isVN = pathname.startsWith("/vn");
  // Strip /vn prefix; fall back to / when the result is empty
  const basePath = isVN ? pathname.slice(3) || "/" : pathname;
  const enHref = basePath;
  const vnHref = "/vn" + (basePath === "/" ? "" : basePath);
  return { isVN, enHref, vnHref };
}

export default function LanguageToggle({ className, size = "sm" }: Props) {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const { isVN, enHref, vnHref } = buildPaths(pathname);

  const pad = size === "lg" ? "px-5 py-2.5 text-sm" : "px-3 py-1.5 text-[0.62rem]";
  const base =
    "font-body font-semibold tracking-[0.18em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson";
  const active = "bg-crimson text-off-white";
  const inactive = "text-charcoal/40 hover:text-charcoal hover:bg-charcoal/5";

  return (
    <div
      role="group"
      aria-label="Language selector"
      className={[
        "inline-flex items-center overflow-hidden border border-charcoal/15 divide-x divide-charcoal/15",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Link
        href={enHref}
        aria-current={!isVN ? "page" : undefined}
        aria-label="Switch to English"
        className={[base, pad, !isVN ? active : inactive].join(" ")}
        prefetch={false}
      >
        EN
      </Link>
      <Link
        href={vnHref}
        aria-current={isVN ? "page" : undefined}
        aria-label="Chuyển sang Tiếng Việt"
        className={[base, pad, isVN ? active : inactive].join(" ")}
        prefetch={false}
      >
        VN
      </Link>
    </div>
  );
}
