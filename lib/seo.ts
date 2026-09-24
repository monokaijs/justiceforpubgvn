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
    ja: { title: "Himass と TanVuu の公正な判断を | Justice for PUBG VN", description: "PUBG Asia Stars 2026 事件の経緯、公式発表、原典資料を確認してください。透明な調査と均衡の取れた制裁を求めます。" },
    ru: { title: "Справедливость для Himass и TanVuu | Justice for PUBG VN", description: "Хронология событий PUBG Asia Stars 2026, официальные заявления и исходные документы. Призыв к прозрачному расследованию и соразмерным санкциям." },
    id: { title: "Keadilan untuk Himass & TanVuu | Justice for PUBG VN", description: "Telusuri linimasa PUBG Asia Stars 2026, pernyataan resmi, dan dokumen sumber. Menuntut penyelidikan yang transparan dan sanksi yang proporsional." },
    es: { title: "Justicia para Himass y TanVuu | Justice for PUBG VN", description: "Explora la cronología de PUBG Asia Stars 2026, las declaraciones oficiales y los documentos originales. Llamamiento a una investigación transparente y sanciones proporcionales." },
    tl: { title: "Katarungan para kina Himass & TanVuu | Justice for PUBG VN", description: "Tingnan ang timeline ng PUBG Asia Stars 2026, mga opisyal na pahayag at orihinal na dokumento. Panawagan para sa transparent na imbestigasyon at proporsyonal na parusa." },
  },
  sources: {
    vi: { title: "Kho tài liệu và nguồn gốc | Justice for PUBG VN", description: "Đối chiếu thông báo PUBG, điều lệ giải, bản lưu tài liệu, thời điểm truy xuất và mã kiểm tra SHA-256 liên quan PUBG Asia Stars 2026." },
    th: { title: "คลังเอกสารและแหล่งข้อมูล | Justice for PUBG VN", description: "ตรวจสอบประกาศของ PUBG กติกาการแข่งขัน สำเนาเอกสาร วันที่เข้าถึง และค่า SHA-256 ที่เกี่ยวข้องกับ PUBG Asia Stars 2026" },
    en: { title: "Source archive and documents | Justice for PUBG VN", description: "Check PUBG notices, tournament rules, archived copies, retrieval dates and SHA-256 checksums for the PUBG Asia Stars 2026 timeline." },
    ko: { title: "자료 및 출처 아카이브 | Justice for PUBG VN", description: "PUBG Asia Stars 2026 관련 PUBG 공지, 대회 규정, 보관된 문서, 열람 날짜와 SHA-256 해시를 확인하세요." },
    zh: { title: "资料与来源档案 | Justice for PUBG VN", description: "查阅 PUBG Asia Stars 2026 相关公告、赛事规则、存档文件、获取日期及 SHA-256 校验值。" },
    ja: { title: "資料および出典アーカイブ | Justice for PUBG VN", description: "PUBG Asia Stars 2026 に関連する PUBG 告知、大会ルール、保存文書、取得日時、SHA-256 チェックサムを確認。" },
    ru: { title: "Архив источников и документов | Justice for PUBG VN", description: "Официальные уведомления PUBG, регламент турнира, архивные копии, даты получения и контрольные суммы SHA-256 по делу PUBG Asia Stars 2026." },
    id: { title: "Arsip sumber dan dokumen | Justice for PUBG VN", description: "Periksa pemberitahuan PUBG, aturan turnamen, salinan arsip, tanggal pengambilan, dan checksum SHA-256 untuk linimasa PUBG Asia Stars 2026." },
    es: { title: "Archivo de fuentes y documentos | Justice for PUBG VN", description: "Consulta los comunicados de PUBG, el reglamento del torneo, copias archivadas, fechas de obtención y sumas SHA-256 sobre PUBG Asia Stars 2026." },
    tl: { title: "Archive ng sanggunian at mga dokumento | Justice for PUBG VN", description: "Suriin ang mga paunawa ng PUBG, patakaran ng torneo, mga naka-archive na kopya, petsa ng pagkuha at SHA-256 checksums para sa PUBG Asia Stars 2026." },
  },
  players: {
    vi: { title: "Hồ sơ Himass và TanVuu | Justice for PUBG VN", description: "Tìm hiểu sự nghiệp, thành tích và nguồn công khai về hai tuyển thủ PUBG Việt Nam Himass và TanVuu." },
    th: { title: "ประวัติ Himass และ TanVuu | Justice for PUBG VN", description: "ทำความรู้จักเส้นทางการแข่งขัน ผลงาน และแหล่งข้อมูลสาธารณะของ Himass และ TanVuu ผู้เล่น PUBG ชาวเวียดนาม" },
    en: { title: "Himass and TanVuu player profiles | Justice for PUBG VN", description: "Explore the careers, achievements and public sources for Vietnamese PUBG players Himass and TanVuu." },
    ko: { title: "Himass와 TanVuu 선수 프로필 | Justice for PUBG VN", description: "베트남 PUBG 선수 Himass와 TanVuu의 선수 경력과 성적, 공개 자료를 살펴보세요." },
    zh: { title: "Himass 与 TanVuu 选手档案 | Justice for PUBG VN", description: "了解越南 PUBG 选手 Himass 与 TanVuu 的职业经历、成绩和公开资料。" },
    ja: { title: "Himass と TanVuu 選手プロフィール | Justice for PUBG VN", description: "ベトナムの PUBG 選手 Himass と TanVuu の経歴、実績、公開資料を確認。" },
    ru: { title: "Профили игроков Himass и TanVuu | Justice for PUBG VN", description: "Карьера, достижения и открытые источники о вьетнамских игроках PUBG Himass и TanVuu." },
    id: { title: "Profil pemain Himass dan TanVuu | Justice for PUBG VN", description: "Pelajari karier, pencapaian, dan sumber publik mengenai dua pemain PUBG Vietnam, Himass và TanVuu." },
    es: { title: "Perfiles de los jugadores Himass y TanVuu | Justice for PUBG VN", description: "Conoce las carreras, logros y fuentes públicas de los jugadores vietnamitas de PUBG Himass y TanVuu." },
    tl: { title: "Mga profile ng manlalarong sina Himass at TanVuu | Justice for PUBG VN", description: "Alamin ang karera, mga tagumpay at pampublikong sanggunian tungkol sa mga manlalaro ng PUBG Vietnam na sina Himass at TanVuu." },
  },
  legal: {
    vi: { title: "Thông tin pháp lý và minh bạch | Justice for PUBG VN", description: "Đọc về tính độc lập, nguồn tư liệu, quyền hình ảnh, quyền riêng tư và quy trình chỉnh sửa của Justice for PUBG VN." },
    th: { title: "ข้อมูลทางกฎหมายและความโปร่งใส | Justice for PUBG VN", description: "อ่านนโยบายของ Justice for PUBG VN เกี่ยวกับความเป็นอิสระ แหล่งข้อมูล สิทธิในภาพ ความเป็นส่วนตัว และการแก้ไขเนื้อหา" },
    en: { title: "Legal information and transparency | Justice for PUBG VN", description: "Read about this site's independence, sourcing, image rights, privacy and correction process." },
    ko: { title: "법적 고지 및 투명성 | Justice for PUBG VN", description: "Justice for PUBG VN의 독립성, 자료 출처, 이미지 권리, 개인정보 보호 및 정정 절차를 확인하세요." },
    zh: { title: "法律信息与透明度 | Justice for PUBG VN", description: "了解本站的独立性、资料来源、图片权利、隐私与更正流程。" },
    ja: { title: "法的告知と透明性 | Justice for PUBG VN", description: "当サイトの独立性、資料の出典、画像権利、プライバシー、訂正手続きについて。" },
    ru: { title: "Юридическая информация и прозрачность | Justice for PUBG VN", description: "Независимость проекта, источники материалов, права на изображения, конфиденциальность и порядок внесения исправлений." },
    id: { title: "Informasi hukum dan transparansi | Justice for PUBG VN", description: "Baca tentang independensi, sumber data, hak gambar, privasi, dan proses perbaikan pada Justice for PUBG VN." },
    es: { title: "Información legal y transparencia | Justice for PUBG VN", description: "Conoce la independencia del sitio, procedencia de fuentes, derechos de imagen, privacidad y proceso de correcciones." },
    tl: { title: "Legal na impormasyon at transparency | Justice for PUBG VN", description: "Basahin ang tungkol sa kalayaan, sanggunian, karapatan sa larawan, privacy, at proseso ng pagwawasto ng Justice for PUBG VN." },
  },
  himass: {
    vi: { title: "Himass – hồ sơ tuyển thủ PUBG | Justice for PUBG VN", description: "Hồ sơ Lã Phương Tiến Đạt (Himass): sự nghiệp PUBG, chức vô địch PGS 3 và PNC 2025, cùng các nguồn công khai." },
    th: { title: "Himass – ประวัติผู้เล่น PUBG | Justice for PUBG VN", description: "ประวัติ Lã Phương Tiến Đạt (Himass) เส้นทางใน PUBG แชมป์ PGS 3 และ PNC 2025 พร้อมแหล่งข้อมูลสาธารณะ" },
    en: { title: "Himass – PUBG player profile | Justice for PUBG VN", description: "Read Lã Phương Tiến Đạt's PUBG career, PGS 3 and PNC 2025 titles, and the public sources behind his Himass profile." },
    ko: { title: "Himass – PUBG 선수 프로필 | Justice for PUBG VN", description: "Lã Phương Tiến Đạt(Himass)의 PUBG 경력, PGS 3 및 PNC 2025 우승 기록과 공개 자료를 살펴보세요." },
    zh: { title: "Himass – PUBG 选手档案 | Justice for PUBG VN", description: "了解 Lã Phương Tiến Đạt（Himass）的 PUBG 职业经历、PGS 3 与 PNC 2025 冠军成绩及公开资料。" },
    ja: { title: "Himass – PUBG 選手プロフィール | Justice for PUBG VN", description: "Lã Phương Tiến Đạt (Himass) の PUBG 競技歴、PGS 3 および PNC 2025 優勝実績と公開資料。" },
    ru: { title: "Himass — профиль игрока PUBG | Justice for PUBG VN", description: "Карьера Lã Phương Tiến Đạt (Himass) в PUBG, победы на PGS 3 и PNC 2025, а также открытые источники." },
    id: { title: "Himass – profil pemain PUBG | Justice for PUBG VN", description: "Profil Lã Phương Tiến Đạt (Himass): karier PUBG, gelar juara PGS 3 dan PNC 2025, serta sumber publik." },
    es: { title: "Himass – perfil de jugador PUBG | Justice for PUBG VN", description: "Historial de Lã Phương Tiến Đạt (Himass): trayectoria en PUBG, títulos de PGS 3 y PNC 2025 y fuentes públicas." },
    tl: { title: "Himass – profile ng manlalaro ng PUBG | Justice for PUBG VN", description: "Profile ni Lã Phương Tiến Đạt (Himass): karera sa PUBG, mga titulo sa PGS 3 at PNC 2025, at mga pampublikong sanggunian." },
  },
  tanvuu: {
    vi: { title: "TanVuu – hồ sơ tuyển thủ PUBG | Justice for PUBG VN", description: "Hồ sơ Trần Tấn Vũ (TanVuu): sự nghiệp PUBG, chức vô địch PGC 2024 và PNC 2025, cùng các nguồn công khai." },
    th: { title: "TanVuu – ประวัติผู้เล่น PUBG | Justice for PUBG VN", description: "ประวัติ Trần Tấn Vũ (TanVuu) เส้นทางใน PUBG แชมป์ PGC 2024 และ PNC 2025 พร้อมแหล่งข้อมูลสาธารณะ" },
    en: { title: "TanVuu – PUBG player profile | Justice for PUBG VN", description: "Read Trần Tấn Vũ's PUBG career, PGC 2024 and PNC 2025 titles, and the public sources behind his TanVuu profile." },
    ko: { title: "TanVuu – PUBG 선수 프로필 | Justice for PUBG VN", description: "Trần Tấn Vũ(TanVuu)의 PUBG 경력, PGC 2024 및 PNC 2025 우승 기록과 공개 자료를 살펴보세요." },
    zh: { title: "TanVuu – PUBG 选手档案 | Justice for PUBG VN", description: "了解 Trần Tấn Vũ（TanVuu）的 PUBG 职业经历、PGC 2024 与 PNC 2025 冠军成绩及公开资料。" },
    ja: { title: "TanVuu – PUBG 選手プロフィール | Justice for PUBG VN", description: "Trần Tấn Vũ (TanVuu) の PUBG 競技歴、PGC 2024 および PNC 2025 優勝実績と公開資料。" },
    ru: { title: "TanVuu — профиль игрока PUBG | Justice for PUBG VN", description: "Карьера Trần Tấn Vũ (TanVuu) в PUBG, победы на PGC 2024 и PNC 2025, а также открытые источники." },
    id: { title: "TanVuu – profil pemain PUBG | Justice for PUBG VN", description: "Profil Trần Tấn Vũ (TanVuu): karier PUBG, gelar juara PGC 2024 dan PNC 2025, serta sumber publik." },
    es: { title: "TanVuu – perfil de jugador PUBG | Justice for PUBG VN", description: "Historial de Trần Tấn Vũ (TanVuu): trayectoria en PUBG, títulos de PGC 2024 y PNC 2025 y fuentes públicas." },
    tl: { title: "TanVuu – profile ng manlalaro ng PUBG | Justice for PUBG VN", description: "Profile ni Trần Tấn Vũ (TanVuu): karera sa PUBG, mga titulo sa PGC 2024 at PNC 2025, at mga pampublikong sanggunian." },
  },
};

const paths: Record<PageKey, string> = {
  home: "", sources: "/sources", players: "/players", legal: "/legal",
  himass: "/players/himass", tanvuu: "/players/tanvuu",
};

const ogLocales: Record<Language, string> = {
  vi: "vi_VN",
  th: "th_TH",
  en: "en_US",
  ko: "ko_KR",
  zh: "zh_CN",
  ja: "ja_JP",
  ru: "ru_RU",
  id: "id_ID",
  es: "es_ES",
  tl: "tl_PH",
};

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
