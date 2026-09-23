"use client";

import { useLanguage } from "@/components/language-provider";

const quotes = {
  delay: {
    en: "Translation: Players who stream personally are encouraged to set a reasonable delay to prevent information exposure.",
    th: "คำแปล: ผู้เล่นที่สตรีมส่วนตัวควรตั้งค่าหน่วงเวลาที่เหมาะสมเพื่อป้องกันการเปิดเผยข้อมูล",
    ko: "번역: 개인 방송을 하는 선수는 정보가 노출되지 않도록 적절한 지연 시간을 설정할 것을 권장합니다.",
  },
  notices: {
    en: "Translation: All participants must familiarize themselves with this rulebook and every official notice posted on the tournament Discord.",
    th: "คำแปล: ผู้เข้าร่วมทุกคนต้องศึกษากฎการแข่งขันฉบับนี้และประกาศทางการทุกฉบับที่โพสต์ใน Discord ของการแข่งขัน",
    ko: "번역: 모든 참가자는 이 규정집과 대회 Discord에 게시된 모든 공식 공지를 숙지해야 합니다.",
  },
} as const;

export default function TranslatedQuote({ quote }: { quote: keyof typeof quotes }) {
  const { language } = useLanguage();
  if (language === "vi") return null;
  return <p className="translation-note">{quotes[quote][language]}</p>;
}
