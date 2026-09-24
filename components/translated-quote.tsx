"use client";

import { useLanguage } from "@/components/language-provider";

import type { Language } from "@/lib/language";

type NonViLanguage = Exclude<Language, "vi">;

const quotes: Record<string, Record<NonViLanguage, string>> = {
  delay: {
    en: "Translation: Players who stream personally are encouraged to set a reasonable delay to prevent information exposure.",
    th: "คำแปล: ผู้เล่นที่สตรีมส่วนตัวควรตั้งค่าหน่วงเวลาที่เหมาะสมเพื่อป้องกันการเปิดเผยข้อมูล",
    ko: "번역: 개인 방송을 하는 선수는 정보가 노출되지 않도록 적절한 지연 시간을 설정할 것을 권장합니다.",
    zh: "译文：建议个人直播的选手设置合理的延迟，以防信息泄露。",
    ja: "訳文：個人配信を行う選手は、情報漏洩を防ぐため適切な遅延を設定することが推奨されます。",
    ru: "Перевод: Игрокам, ведущим личные трансляции, рекомендуется установить разумную задержку для предотвращения утечки информации.",
    id: "Terjemahan: Pemain yang melakukan streaming pribadi disarankan untuk mengatur penundaan (delay) yang wajar guna mencegah paparan informasi.",
    es: "Traducción: Se recomienda a los jugadores que transmitan a nivel personal que configuren un retraso razonable para evitar la exposición de información.",
    tl: "Salin: Ang mga manlalarong personal na nag-i-stream ay hinihikayat na magtakda ng makatwirang delay upang maiwasan ang pagkakalantad ng impormasyon.",
  },
  notices: {
    en: "Translation: All participants must familiarize themselves with this rulebook and every official notice posted on the tournament Discord.",
    th: "คำแปล: ผู้เข้าร่วมทุกคนต้องศึกษากฎการแข่งขันฉบับนี้และประกาศทางการทุกฉบับที่โพสต์ใน Discord ของการแข่งขัน",
    ko: "번역: 모든 참가자는 이 규정집과 대회 Discord에 게시된 모든 공식 공지를 숙지해야 합니다.",
    zh: "译文：所有参赛者必须熟悉本规则手册及发布在赛事 Discord 上的所有官方公告。",
    ja: "訳文：すべての参加者は本ルールブックおよび大会 Discord に掲載されるすべての公式告知を熟知する必要があります。",
    ru: "Перевод: Все участники должны ознакомиться с данным регламентом и всеми официальными уведомлениями, опубликованными в турнирном Discord.",
    id: "Terjemahan: Semua peserta wajib memahami buku peraturan ini dan setiap pengumuman resmi yang diposting di Discord turnamen.",
    es: "Traducción: Todos los participantes deben familiarizarse con este reglamento y con todos los avisos oficiales publicados en el Discord del torneo.",
    tl: "Salin: Dapat pamilyar ang lahat ng kalahok sa rulebook na ito at sa bawat opisyal na paunawang nai-post sa Discord ng torneo.",
  },
};

export default function TranslatedQuote({ quote }: { quote: keyof typeof quotes }) {
  const { language } = useLanguage();
  if (language === "vi") return null;
  return <p className="translation-note">{quotes[quote][language]}</p>;
}
