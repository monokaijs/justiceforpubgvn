export const languages = ["vi", "th", "en", "ko"] as const;
export type Language = (typeof languages)[number];

export function isLanguage(value: string): value is Language {
  return languages.includes(value as Language);
}

export const languageNames: Record<Language, string> = {
  vi: "Tiếng Việt",
  th: "ไทย",
  en: "English",
  ko: "한국어",
};
