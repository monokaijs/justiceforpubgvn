"use client";

import { Children, type AnchorHTMLAttributes } from "react";
import { useLanguage } from "@/components/language-provider";
import { renderIconText } from "@/components/ui-icon";
import { languages } from "@/lib/language";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const languagePattern = new RegExp(`^/(${languages.join("|")})(?=/|$)`);
const staticPattern = /^\/(attachments|api|_next)(?=\/|$)/;

export default function LocalizedAnchor({ href, children, ...props }: Props) {
  const { language } = useLanguage();
  const localizedHref = href.startsWith("/") && !href.startsWith("//") &&
    !languagePattern.test(href) &&
    !staticPattern.test(href)
    ? `/${language}${href === "/" ? "" : href}`
    : href;
  return <a href={localizedHref} {...props}>{Children.map(children, (child) => typeof child === "string" ? renderIconText(child) : child)}</a>;
}
