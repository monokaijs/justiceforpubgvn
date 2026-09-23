import { translations } from "@/data/ui-translations";
import type { Language } from "@/lib/language";

type Bilingual = { vi: string; en: string };

export function loc(language: Language, vi: string, en: string): string {
  if (language === "vi") return vi;
  if (language === "en") return en;
  return translations[en]?.[language] || en;
}

export function localized(value: Bilingual, language: Language): string {
  return loc(language, value.vi, value.en);
}
