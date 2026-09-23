"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { detectLanguage, languages, type Language } from "@/lib/language";

const storageKey = "pas_timeline_lang";
const LanguageContext = createContext<{ language: Language; chooseLanguage: (next: Language) => void }>({
  language: "vi",
  chooseLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const next = languages.includes(saved as Language) ? saved as Language : detectLanguage(navigator.languages?.length ? navigator.languages : [navigator.language]);
    setLanguage(next);
    document.documentElement.lang = next;
    const sync = (event: StorageEvent) => {
      if (event.key === storageKey) {
        const updated = languages.includes(event.newValue as Language) ? event.newValue as Language : detectLanguage(navigator.languages);
        setLanguage(updated);
        document.documentElement.lang = updated;
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const chooseLanguage = (next: Language) => {
    setLanguage(next);
    document.documentElement.lang = next;
    window.localStorage.setItem(storageKey, next);
  };

  return <LanguageContext.Provider value={{ language, chooseLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
