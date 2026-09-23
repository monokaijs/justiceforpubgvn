"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { languageNames, languages, type Language } from "@/lib/language";

function Flag({ language }: { language: Language }) {
  if (language === "vi") return <svg className="language-flag" viewBox="0 0 30 20" aria-hidden="true"><path fill="#da251d" d="M0 0h30v20H0z"/><path fill="#ff0" d="m15 3.2 1.59 4.9h5.15l-4.17 3.03 1.6 4.9L15 13l-4.17 3.03 1.6-4.9L8.26 8.1h5.15z"/></svg>;
  if (language === "th") return <svg className="language-flag" viewBox="0 0 30 20" aria-hidden="true"><path fill="#a51931" d="M0 0h30v20H0z"/><path fill="#fff" d="M0 3h30v14H0z"/><path fill="#2d2a4a" d="M0 6h30v8H0z"/></svg>;
  if (language === "ko") return <svg className="language-flag" viewBox="0 0 30 20" aria-hidden="true"><path fill="#fff" d="M0 0h30v20H0z"/><circle cx="15" cy="10" r="5" fill="#cd2e3a"/><path fill="#0047a0" d="M10 10a5 5 0 0 0 10 0 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 0-5 0"/><g stroke="#111" strokeWidth="1.1"><path d="m4 3 5 3m-6 0 5 3m13-6 5 3m-6 0 5 3M4 17l5-3m-6 0 5-3m13 6 5-3m-6 0 5-3"/></g></svg>;
  if (language === "zh") return <svg className="language-flag" viewBox="0 0 30 20" aria-hidden="true"><path fill="#de2910" d="M0 0h30v20H0z"/><path fill="#ffde00" d="m7 2 1.2 3.7H12L8.9 8l1.2 3.7L7 9.4l-3.1 2.3L5.1 8 2 5.7h3.8z"/><circle cx="14" cy="3" r=".8" fill="#ffde00"/><circle cx="16" cy="6" r=".8" fill="#ffde00"/><circle cx="16" cy="10" r=".8" fill="#ffde00"/><circle cx="13" cy="13" r=".8" fill="#ffde00"/></svg>;
  return <svg className="language-flag" viewBox="0 0 30 20" aria-hidden="true"><path fill="#012169" d="M0 0h30v20H0z"/><path stroke="#fff" strokeWidth="4" d="M0 0 30 20M30 0 0 20"/><path stroke="#c8102e" strokeWidth="1.5" d="M0 0 30 20M30 0 0 20"/><path stroke="#fff" strokeWidth="6" d="M15 0v20M0 10h30"/><path stroke="#c8102e" strokeWidth="3" d="M15 0v20M0 10h30"/></svg>;
}

export default function LanguageSelector() {
  const { language, chooseLanguage } = useLanguage();
  const label = { vi: "Ngôn ngữ", th: "ภาษา", en: "Language", ko: "언어", zh: "语言" }[language];
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const focusOption = (index: number) => root.current?.querySelectorAll<HTMLButtonElement>(".language-menu button")[index]?.focus();

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); root.current?.querySelector<HTMLButtonElement>(".language-trigger")?.focus(); } };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape); };
  }, [open]);

  return <div className="language-selector" ref={root}>
    <button className="language-trigger" type="button" aria-label={`${label}: ${languageNames[language]}`} aria-haspopup="listbox" aria-controls="site-language-options" aria-expanded={open} onClick={() => setOpen(!open)} onKeyDown={(event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setOpen(true); window.requestAnimationFrame(() => focusOption(event.key === "ArrowDown" ? 0 : languages.length - 1)); }
    }}>
      <Flag language={language} /><span>{languageNames[language]}</span><svg className="language-chevron" viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
    </button>
    {open && <div className="language-menu" id="site-language-options" role="listbox" aria-label={label}>
      {languages.map((option, index) => <button key={option} type="button" role="option" aria-selected={language === option} onClick={() => { chooseLanguage(option); setOpen(false); root.current?.querySelector<HTMLButtonElement>(".language-trigger")?.focus(); }} onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); focusOption((index + (event.key === "ArrowDown" ? 1 : -1) + languages.length) % languages.length); }
        if (event.key === "Home") { event.preventDefault(); focusOption(0); }
        if (event.key === "End") { event.preventDefault(); focusOption(languages.length - 1); }
      }}><Flag language={option} /><span>{languageNames[option]}</span>{language === option && <span className="language-check" aria-hidden="true">✓</span>}</button>)}
    </div>}
  </div>;
}
