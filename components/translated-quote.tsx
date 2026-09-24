"use client";

import { useLanguage } from "@/components/language-provider";
import { loc } from "@/lib/i18n";

const quotes = {
  delay: {
    en: "Translation: Players who stream personally are encouraged to set a reasonable delay to prevent information exposure.",
    th: "คำแปล: ผู้เล่นที่สตรีมส่วนตัวควรตั้งค่าหน่วงเวลาที่เหมาะสมเพื่อป้องกันการเปิดเผยข้อมูล",
    ko: "번역: 개인 방송을 하는 선수는 정보가 노출되지 않도록 적절한 지연 시간을 설정할 것을 권장합니다.",
    zh: "译文：建议个人直播的选手设置合理的延迟，以防信息泄露。",
  },
  notices: {
    en: "Translation: All participants must familiarize themselves with this rulebook and every official notice posted on the tournament Discord.",
    th: "คำแปล: ผู้เข้าร่วมทุกคนต้องศึกษากฎการแข่งขันฉบับนี้และประกาศทางการทุกฉบับที่โพสต์ใน Discord ของการแข่งขัน",
    ko: "번역: 모든 참가자는 이 규정집과 대회 Discord에 게시된 모든 공식 공지를 숙지해야 합니다.",
    zh: "译文：所有参赛者必须熟悉本规则手册及发布在赛事 Discord 上的所有官方公告。",
  },
} as const;

export default function TranslatedQuote({ quote }: { quote: keyof typeof quotes }) {
  const { language } = useLanguage();
  if (language === "vi") return null;
  const text = quotes[quote];
  const existing = language === "th" || language === "ko" || language === "zh" ? text[language] : undefined;
  return <p className="translation-note">{existing ?? loc(language, text.en, text.en)}</p>;
}
