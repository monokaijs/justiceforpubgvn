export const languages = ["vi", "th", "en", "ko", "zh", "ja", "de", "ms", "fil", "ru"] as const;
export type Language = (typeof languages)[number];

export function isLanguage(value: string): value is Language {
  return languages.includes(value as Language);
}

export const languageNames: Record<Language, string> = {
  vi: "Tiếng Việt",
  th: "ไทย",
  en: "English",
  ko: "한국어",
  zh: "简体中文",
  ja: "日本語",
  de: "Deutsch",
  ms: "Bahasa Melayu",
  fil: "Filipino",
  ru: "Русский",
};
