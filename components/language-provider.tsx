"use client";

import { createContext, useContext, type ReactNode } from "react";
import { type Language } from "@/lib/language";

const languageCookie = "pas_timeline_lang";
const LanguageContext = createContext<{ language: Language; chooseLanguage: (next: Language) => void }>({
  language: "vi",
  chooseLanguage: () => {},
});

export function LanguageProvider({ children, initialLanguage }: { children: ReactNode; initialLanguage: Language }) {
  const chooseLanguage = (next: Language) => {
    document.cookie = `${languageCookie}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    const path = location.pathname.replace(/^\/(vi|th|en|ko)(?=\/|$)/, "");
    location.assign(`/${next}${path === "/" ? "" : path}${location.search}${location.hash}`);
  };

  return <LanguageContext.Provider value={{ language: initialLanguage, chooseLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
