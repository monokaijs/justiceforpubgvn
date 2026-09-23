"use client";

import { useLanguage } from "@/components/language-provider";
import { loc } from "@/lib/i18n";

export default function DualLanguage({ vi, en }: { vi: string; en: string }) {
  const { language } = useLanguage();
  return <>{loc(language, vi, en)}</>;
}
