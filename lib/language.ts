export const languages = ["vi", "th", "en", "ko"] as const;
export type Language = (typeof languages)[number];

export const languageNames: Record<Language, string> = {
  vi: "Tiếng Việt",
  th: "ไทย",
  en: "English",
  ko: "한국어",
};

export function detectLanguage(preferred: readonly string[]): Language {
  for (const locale of preferred) {
    const code = locale.toLowerCase().split("-")[0];
    if (languages.includes(code as Language)) return code as Language;
  }
  return "en";
}
