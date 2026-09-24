"use client";

import { createContext, useContext, type ReactNode } from "react";
import { languages, type Language } from "@/lib/language";

const languageCookie = "pas_timeline_lang";
const LanguageContext = createContext<{ language: Language; chooseLanguage: (next: Language) => void }>({
  language: "vi",
  chooseLanguage: () => {},
});

export function LanguageProvider({ children, initialLanguage }: { children: ReactNode; initialLanguage: Language }) {
  const chooseLanguage = (next: Language) => {
    document.cookie = `${languageCookie}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    const segments = location.pathname.split("/");
    const path = languages.some((language) => language === segments[1]) ? `/${segments.slice(2).join("/")}` : location.pathname;
    location.assign(`/${next}${path === "/" ? "" : path}${location.search}${location.hash}`);
  };

  return <LanguageContext.Provider value={{ language: initialLanguage, chooseLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
