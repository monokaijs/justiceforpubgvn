"use client";

import type { AnchorHTMLAttributes } from "react";
import { useLanguage } from "@/components/language-provider";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function LocalizedAnchor({ href, ...props }: Props) {
  const { language } = useLanguage();
  const localizedHref = href.startsWith("/") && !href.startsWith("//") &&
    !/^\/(vi|th|en|ko|zh)(?=\/|$)/.test(href) &&
    !/^\/(attachments|api|_next)(?=\/|$)/.test(href)
    ? `/${language}${href === "/" ? "" : href}`
    : href;
  return <a href={localizedHref} {...props} />;
}
