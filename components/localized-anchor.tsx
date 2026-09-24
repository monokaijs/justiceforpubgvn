"use client";

import { Children, type AnchorHTMLAttributes } from "react";
import { useLanguage } from "@/components/language-provider";
import { renderIconText } from "@/components/ui-icon";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function LocalizedAnchor({ href, children, ...props }: Props) {
  const { language } = useLanguage();
  const localizedHref = href.startsWith("/") && !href.startsWith("//") &&
    !/^\/(vi|th|en|ko|zh)(?=\/|$)/.test(href) &&
    !/^\/(attachments|api|_next)(?=\/|$)/.test(href)
    ? `/${language}${href === "/" ? "" : href}`
    : href;
  return <a href={localizedHref} {...props}>{Children.map(children, (child) => typeof child === "string" ? renderIconText(child) : child)}</a>;
}
