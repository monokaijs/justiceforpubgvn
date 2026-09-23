import type { Metadata } from "next";
import { languages, type Language } from "@/lib/language";

export const siteUrl = (process.env.SITE_URL || "https://justiceforpubgvn.com").replace(/\/$/, "");
export const siteName = "Justice for PUBG VN";

type PageKey = "home" | "sources" | "players" | "legal" | "himass" | "tanvuu";
type Copy = { title: string; description: string };

const copy: Record<PageKey, Record<Language, Copy>> = {
  home: {
    vi: { title: "Công bằng cho Himass & TanVuu | Justice for PUBG VN", description: "Theo dõi diễn biến PUBG Asia Stars 2026, đối chiếu thông báo chính thức và tài liệu gốc. Kêu gọi điều tra minh bạch và án phạt tương xứng." },
    th: { title: "ความเป็นธรรมสำหรับ Himass และ TanVuu | Justice for PUBG VN", description: "ติดตามเหตุการณ์ PUBG Asia Stars 2026 ตรวจสอบประกาศอย่างเป็นทางการและเอกสารต้นฉบับ พร้อมเรียกร้องการสอบสวนที่โปร่งใสและบทลงโทษที่ได้สัดส่วน" },
    en: { title: "Fairness for Himass & TanVuu | Justice for PUBG VN", description: "Explore the PUBG Asia Stars 2026 timeline, official statements and source documents. Call for a transparent investigation and proportionate sanctions." },
    ko: { title: "Himass와 TanVuu를 위한 공정성 | Justice for PUBG VN", description: "PUBG Asia Stars 2026 사건의 경과와 공식 발표, 원문 자료를 확인하세요. 투명한 조사와 비례적인 제재를 요구합니다." },
    zh: { title: "为 Himass 和 TanVuu 争取公正 | Justice for PUBG VN", description: "了解 PUBG Asia Stars 2026 事件时间线、官方声明和原始资料，呼吁透明调查与适度处罚。" },
  },
  sources: {
    vi: { title: "Kho tài liệu và nguồn gốc | Justice for PUBG VN", description: "Đối chiếu thông báo PUBG, điều lệ giải, bản lưu tài liệu, thời điểm truy xuất và mã kiểm tra SHA-256 liên quan PUBG Asia Stars 2026." },
    th: { title: "คลังเอกสารและแหล่งข้อมูล | Justice for PUBG VN", description: "ตรวจสอบประกาศของ PUBG กติกาการแข่งขัน สำเนาเอกสาร วันที่เข้าถึง และค่า SHA-256 ที่เกี่ยวข้องกับ PUBG Asia Stars 2026" },
    en: { title: "Source archive and documents | Justice for PUBG VN", description: "Check PUBG notices, tournament rules, archived copies, retrieval dates and SHA-256 checksums for the PUBG Asia Stars 2026 timeline." },
    ko: { title: "자료 및 출처 아카이브 | Justice for PUBG VN", description: "PUBG Asia Stars 2026 관련 PUBG 공지, 대회 규정, 보관된 문서, 열람 날짜와 SHA-256 해시를 확인하세요." },
    zh: { title: "资料与来源档案 | Justice for PUBG VN", description: "查阅 PUBG Asia Stars 2026 相关公告、赛事规则、存档文件、获取日期及 SHA-256 校验值。" },
  },
  players: {
    vi: { title: "Hồ sơ Himass và TanVuu | Justice for PUBG VN", description: "Tìm hiểu sự nghiệp, thành tích và nguồn công khai về hai tuyển thủ PUBG Việt Nam Himass và TanVuu." },
    th: { title: "ประวัติ Himass และ TanVuu | Justice for PUBG VN", description: "ทำความรู้จักเส้นทางการแข่งขัน ผลงาน และแหล่งข้อมูลสาธารณะของ Himass และ TanVuu ผู้เล่น PUBG ชาวเวียดนาม" },
    en: { title: "Himass and TanVuu player profiles | Justice for PUBG VN", description: "Explore the careers, achievements and public sources for Vietnamese PUBG players Himass and TanVuu." },
    ko: { title: "Himass와 TanVuu 선수 프로필 | Justice for PUBG VN", description: "베트남 PUBG 선수 Himass와 TanVuu의 선수 경력과 성적, 공개 자료를 살펴보세요." },
    zh: { title: "Himass 与 TanVuu 选手档案 | Justice for PUBG VN", description: "了解越南 PUBG 选手 Himass 与 TanVuu 的职业经历、成绩和公开资料。" },
  },
  legal: {
    vi: { title: "Thông tin pháp lý và minh bạch | Justice for PUBG VN", description: "Đọc về tính độc lập, nguồn tư liệu, quyền hình ảnh, quyền riêng tư và quy trình chỉnh sửa của Justice for PUBG VN." },
    th: { title: "ข้อมูลทางกฎหมายและความโปร่งใส | Justice for PUBG VN", description: "อ่านนโยบายของ Justice for PUBG VN เกี่ยวกับความเป็นอิสระ แหล่งข้อมูล สิทธิในภาพ ความเป็นส่วนตัว และการแก้ไขเนื้อหา" },
    en: { title: "Legal information and transparency | Justice for PUBG VN", description: "Read about this site's independence, sourcing, image rights, privacy and correction process." },
    ko: { title: "법적 고지 및 투명성 | Justice for PUBG VN", description: "Justice for PUBG VN의 독립성, 자료 출처, 이미지 권리, 개인정보 보호 및 정정 절차를 확인하세요." },
    zh: { title: "法律信息与透明度 | Justice for PUBG VN", description: "了解本站的独立性、资料来源、图片权利、隐私与更正流程。" },
  },
  himass: {
    vi: { title: "Himass – hồ sơ tuyển thủ PUBG | Justice for PUBG VN", description: "Hồ sơ Lã Phương Tiến Đạt (Himass): sự nghiệp PUBG, chức vô địch PGS 3 và PNC 2025, cùng các nguồn công khai." },
    th: { title: "Himass – ประวัติผู้เล่น PUBG | Justice for PUBG VN", description: "ประวัติ Lã Phương Tiến Đạt (Himass) เส้นทางใน PUBG แชมป์ PGS 3 และ PNC 2025 พร้อมแหล่งข้อมูลสาธารณะ" },
    en: { title: "Himass – PUBG player profile | Justice for PUBG VN", description: "Read Lã Phương Tiến Đạt's PUBG career, PGS 3 and PNC 2025 titles, and the public sources behind his Himass profile." },
    ko: { title: "Himass – PUBG 선수 프로필 | Justice for PUBG VN", description: "Lã Phương Tiến Đạt(Himass)의 PUBG 경력, PGS 3 및 PNC 2025 우승 기록과 공개 자료를 살펴보세요." },
    zh: { title: "Himass – PUBG 选手档案 | Justice for PUBG VN", description: "了解 Lã Phương Tiến Đạt（Himass）的 PUBG 职业经历、PGS 3 与 PNC 2025 冠军成绩及公开资料。" },
  },
  tanvuu: {
    vi: { title: "TanVuu – hồ sơ tuyển thủ PUBG | Justice for PUBG VN", description: "Hồ sơ Trần Tấn Vũ (TanVuu): sự nghiệp PUBG, chức vô địch PGC 2024 và PNC 2025, cùng các nguồn công khai." },
    th: { title: "TanVuu – ประวัติผู้เล่น PUBG | Justice for PUBG VN", description: "ประวัติ Trần Tấn Vũ (TanVuu) เส้นทางใน PUBG แชมป์ PGC 2024 และ PNC 2025 พร้อมแหล่งข้อมูลสาธารณะ" },
    en: { title: "TanVuu – PUBG player profile | Justice for PUBG VN", description: "Read Trần Tấn Vũ's PUBG career, PGC 2024 and PNC 2025 titles, and the public sources behind his TanVuu profile." },
    ko: { title: "TanVuu – PUBG 선수 프로필 | Justice for PUBG VN", description: "Trần Tấn Vũ(TanVuu)의 PUBG 경력, PGC 2024 및 PNC 2025 우승 기록과 공개 자료를 살펴보세요." },
    zh: { title: "TanVuu – PUBG 选手档案 | Justice for PUBG VN", description: "了解 Trần Tấn Vũ（TanVuu）的 PUBG 职业经历、PGC 2024 与 PNC 2025 冠军成绩及公开资料。" },
  },
};

const paths: Record<PageKey, string> = {
  home: "", sources: "/sources", players: "/players", legal: "/legal",
  himass: "/players/himass", tanvuu: "/players/tanvuu",
};

const ogLocales: Record<Language, string> = { vi: "vi_VN", th: "th_TH", en: "en_US", ko: "ko_KR", zh: "zh_CN" };

export function pageUrl(language: Language, page: PageKey): string {
  return `${siteUrl}/${language}${paths[page]}`;
}

export function pageMetadata(language: Language, page: PageKey): Metadata {
  const { title, description } = copy[page][language];
  return {
    title,
    description,
    alternates: {
      canonical: pageUrl(language, page),
      languages: {
        ...Object.fromEntries(languages.map((locale) => [locale, pageUrl(locale, page)])),
        "x-default": pageUrl("en", page),
      },
    },
    openGraph: {
      type: "website",
      url: pageUrl(language, page),
      siteName,
      title,
      description,
      locale: ogLocales[language],
      alternateLocale: languages.filter((locale) => locale !== language).map((locale) => ogLocales[locale]),
    },
    twitter: { card: "summary", title, description },
  };
}

export const indexablePages = Object.keys(paths) as PageKey[];
