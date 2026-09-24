"use client";

import { useLanguage } from "@/components/language-provider";
import { loc } from "@/lib/i18n";
import { renderIconText } from "@/components/ui-icon";

export default function DualLanguage({ vi, en }: { vi: string; en: string }) {
  const { language } = useLanguage();
  return <>{renderIconText(loc(language, vi, en))}</>;
}
