"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import { Language, sources, timeline, type SourceKey } from "@/data/timeline";
import { useLanguage } from "@/components/language-provider";
import LanguageSelector from "@/components/language-selector";
import LocalizedAnchor from "@/components/localized-anchor";
import ShareButton from "@/components/share-button";
import { loc, localized } from "@/lib/i18n";

const copy = {
  vi: {
    brandSub: "DÒNG THỜI GIAN",
    navTimeline: "DIỄN BIẾN VỤ VIỆC",
    navSources: "NGUỒN TÀI LIỆU",
    heroEyebrow: "JUSTICE FOR PUBG VN  /  17–23.09.2026",
    heroLineOne: "Công bằng cho",
    heroLineTwo: "Himass & TanVuu.",
    heroStatement: "Không bênh vực gian lận. Yêu cầu điều tra minh bạch và xử phạt tương xứng.",
    heroDescription: "Showmatch không miễn trách nhiệm thi đấu công bằng. Nhưng khi điều lệ thiếu cụ thể và hướng dẫn chưa nhất quán, một án cấm vĩnh viễn ảnh hưởng cả sự nghiệp cần được giải thích thuyết phục, không chỉ bằng một thông báo kết luận.",
    heroLabel: "MỞ ĐẦU",
    heroButton: "Xem diễn biến & tài liệu",
    heroSkip: "Đến dòng thời gian",
    heroScroll: "Cuộn để tiếp tục",
    heroVisualSource: "Hình minh họa do người dùng cung cấp",
    supportButton: "Đồng hành cùng họ",
    supportedButton: "Đã đồng hành",
    supportCount: "người ủng hộ",
    supportError: "Chưa thể cập nhật. Vui lòng thử lại.",
    independent: "Trang tổng hợp độc lập · không thuộc PUBG hoặc KRAFTON",
    timelineTitle: "DÒNG THỜI GIAN",
    source: "XEM NGUỒN",
    sources: "NGUỒN",
    footerNote: "Nội dung tóm tắt những gì PUBG công bố trong các thông báo được dẫn ở từng mốc. Trạng thái điều tra ngày 20/09 được đọc cùng kết luận mới hơn ngày 23/09.",
    progress: "MỐC SỰ VIỆC",
    next: "CUỘN ĐỂ XEM MỐC TIẾP THEO",
    evidence: "HÌNH ẢNH DO NGƯỜI DÙNG CUNG CẤP",
    evidenceOne: "Ảnh chụp màn hình chuyển ứng dụng trong video Soopi. Nguồn gốc và thời điểm chụp chưa được xác minh độc lập.",
    evidenceTwo: "Ảnh chụp một trang livestream xuất hiện trong video. Hình ảnh riêng lẻ không chứng minh mục đích hoặc kết luận vi phạm.",
    openImage: "MỞ ẢNH GỐC",
    evidenceArchive: "XEM THÔNG TIN HÌNH ẢNH",
    whatHappened: "ĐIỀU XẢY RA",
    responseLabel: "LẬP LUẬN / PHẢN HỒI",
    explanationLabel: "ĐIỀU CẦN HIỂU",
    readMore: "Đọc thêm",
    checkContext: "KIỂM TRA BỐI CẢNH",
  },
  en: {
    brandSub: "CASE TIMELINE",
    navTimeline: "CASE TIMELINE",
    navSources: "SOURCES",
    heroEyebrow: "JUSTICE FOR PUBG VN  /  17–23.09.2026",
    heroLineOne: "Fair treatment for",
    heroLineTwo: "Himass & TanVuu.",
    heroStatement: "Not a defense of cheating. A call for clear rules, transparent investigation, and proportionate sanctions.",
    heroDescription: "A showmatch still requires fair play. But a career-altering punishment demands clear reasoning, consistent standards, and a meaningful opportunity to respond.",
    heroLabel: "INTRODUCTION",
    heroButton: "View timeline & sources",
    heroSkip: "Skip to timeline",
    heroScroll: "Scroll to continue",
    heroVisualSource: "Campaign visual supplied by a user",
    supportButton: "Stand with them",
    supportedButton: "You stand with them",
    supportCount: "supporters",
    supportError: "Could not update. Please try again.",
    independent: "Independent summary · not affiliated with PUBG or KRAFTON",
    timelineTitle: "CASE TIMELINE",
    source: "VIEW SOURCE",
    sources: "SOURCES",
    footerNote: "This page summarizes PUBG's cited notices. The September 20 review status should be read alongside the later September 23 findings.",
    progress: "CASE MILESTONE",
    next: "SCROLL FOR THE NEXT MILESTONE",
    evidence: "USER-SUPPLIED IMAGES",
    evidenceOne: "A screenshot of an application switcher in Soopi footage. Its origin and capture time have not been independently verified.",
    evidenceTwo: "A screenshot showing a livestream page in footage. A still image alone does not establish intent or a rule violation.",
    openImage: "OPEN ORIGINAL IMAGE",
    evidenceArchive: "IMAGE PROVENANCE",
    whatHappened: "WHAT HAPPENED",
    responseLabel: "DEFENSE / RESPONSE",
    explanationLabel: "WHAT THIS MEANS",
    readMore: "Read more",
    checkContext: "CHECK THE CONTEXT",
  },
} as const;

const heroArguments = {
  vi: [
    { title: "Luật phải rõ ràng", body: "Không có điều khoản cụ thể không đồng nghĩa được phép gian lận. Nhưng sự nhập nhằng của điều lệ và trách nhiệm của ban tổ chức phải được cân nhắc khi xử phạt." },
    { title: "Điều tra phải công bằng", body: "Làm rõ chứng cứ của từng người, áp dụng cùng tiêu chuẩn cho mọi bên và bảo đảm quyền tiếp cận chứng cứ, giải trình, phản biện." },
    { title: "Án phạt phải tương xứng", body: "Vì sao vi phạm tại một showmatch phải dẫn đến cấm vĩnh viễn, thay vì đình chỉ có thời hạn? Mức phạt nặng nhất cần căn cứ tương xứng." },
  ],
  en: [
    { title: "Rules must be clear", body: "The absence of a specific clause does not make cheating permissible. Ambiguity in the rules and the organizer's responsibility should still be weighed when imposing sanctions." },
    { title: "The investigation must be fair", body: "Clarify the evidence for each person, apply the same standard to everyone, and ensure access to evidence and the chance to explain and challenge it." },
    { title: "The penalty must fit", body: "Why should a violation in a showmatch lead to a permanent ban rather than a time-limited suspension? The harshest penalty needs a proportionate basis." },
  ],
} as const;

const modules = {
  rulebook: {
    vi: { title: "Luật rõ ràng. Trách nhiệm chung.", body: "Không có điều khoản cụ thể không mặc nhiên cho phép thi đấu thiếu công bằng. Nhưng sự nhập nhằng của điều lệ hoặc hướng dẫn từ ban tổ chức phải được cân nhắc khi xác định trách nhiệm và mức phạt." },
    en: { title: "Clear rules. Shared accountability.", body: "The absence of an explicit clause does not automatically permit unfair play. But ambiguity in the rules or organizer guidance must be considered when assessing responsibility and punishment." },
    links: [
      { vi: "Điều lệ VI · §3.7", en: "VI rulebook · §3.7", href: "/sources#rulebook-vi-3-7" },
      { vi: "Nghĩa vụ · §4.1", en: "Participant duties · §4.1", href: "/sources#rulebook-vi-4-1" },
      { vi: "PUBG nói về điều lệ", en: "Organizer on rule clarity", href: "/sources#additional" },
    ],
  },
  "findings-september-23": {
    vi: { title: "Cho thấy cách đi đến kết luận.", body: "Một kết luận riêng lẻ chưa giải thích toàn bộ chứng cứ. Cần đánh giá hành vi của từng tuyển thủ và phân biệt việc nhận thông tin, chủ động tìm kiếm và sử dụng khi thi đấu." },
    en: { title: "Show how the conclusion was reached.", body: "A conclusion alone does not explain the evidence. Each player’s conduct should be assessed individually, with a clear distinction between receiving information, actively seeking it, and using it in play." },
    links: [
      { vi: "Nghi vấn ngày 20/09", en: "20 Sep allegations", href: "#additional-notice" },
      { vi: "Kết luận của PUBG", en: "PUBG findings", href: "/sources#findingsVi" },
      { vi: "Bản tiếng Hàn", en: "Korean notice", href: "/sources#findingsKo" },
    ],
  },
  "follow-up": {
    vi: { title: "Một tiêu chuẩn cho tất cả.", body: "Việc mở một trang stream tự nó chưa chứng minh đã khai thác thông tin. Cần hỏi như nhau về thời điểm, tư cách tham gia, việc chia sẻ thông tin và việc dùng thông tin trong trận đấu." },
    en: { title: "One standard for everyone.", body: "Opening a stream is not, by itself, proof of exploiting it. The same questions about timing, participation status, information sharing, and in-game use should be applied to every participant." },
    links: [
      { vi: "Ảnh Soopi · chuyển ứng dụng", en: "Soopi still · app switcher", href: "/sources#evidence-soopi-alt-tab" },
      { vi: "Ảnh Soopi · trang stream", en: "Soopi still · stream page", href: "/sources#evidence-soopi-watching-livestream" },
      { vi: "Tiêu chí PUBG công bố", en: "PUBG review criteria", href: "/sources#findingsVi" },
    ],
  },
  "sanctions-september-23": {
    vi: { title: "Chế tài phải tương xứng.", body: "Một án phạt vĩnh viễn ảnh hưởng sự nghiệp cần giải thích vì sao đình chỉ có thời hạn không đủ. Tuyển thủ cần được xem chứng cứ liên quan, phản biện cách diễn giải và nhận phản hồi có ý nghĩa." },
    en: { title: "A penalty must fit the violation.", body: "A permanent sanction affecting a professional career requires an explanation of why a time-limited suspension would not be sufficient. Players should be able to review the relevant evidence, challenge its interpretation, and receive a meaningful response." },
    links: [
      { vi: "Thông báo chế tài", en: "Sanction announcement", href: "/sources#findingsVi" },
      { vi: "Điều lệ · §4.1", en: "Rulebook · §4.1", href: "/sources#rulebook-vi-4-1" },
      { vi: "Biện pháp ngày 20/09", en: "20 Sep measures", href: "#actions" },
    ],
  },
} as const;

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M5 19 19 5M7 5h12v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
}

function SupportIcon({ supported }: { supported: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill={supported ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 8.6c0 4.1-4.8 7.9-8.8 11-4-3.1-8.8-6.9-8.8-11a4.8 4.8 0 0 1 8.8-2.5 4.8 4.8 0 0 1 8.8 2.5Z" />
    </svg>
  );
}

function scrollToHeroSlide(index: number) {
  const section = document.querySelector<HTMLElement>(".campaign-hero");
  const pin = section?.querySelector<HTMLElement>(".campaign-hero-pin");
  if (!section || !pin) return;
  const stageDistance = (section.offsetHeight - pin.offsetHeight) / 3;
  const top = section.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: index >= 4 ? top + section.offsetHeight : top + Math.max(0, stageDistance) * index,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

function SourceLink({ sourceKey, label }: { sourceKey: SourceKey; label: string }) {
  return (
    <LocalizedAnchor className="source-link" href={`/sources#${sourceKey}`}>
      <span>{label}</span>
      <ArrowIcon diagonal />
    </LocalizedAnchor>
  );
}

function ReportedSanctionChanges({ language, compact = false }: { language: Language; compact?: boolean }) {
  return <aside className={`reported-sanction-changes${compact ? " reported-sanction-changes-compact" : ""}`} aria-label={loc(language, "Thông tin về các mức phạt được kể lại, chưa xác minh", "Unverified account of earlier sanction lengths")}>
    <span className="reported-sanction-label">{loc(language, "PHẢN ÁNH CHƯA ĐƯỢC XÁC MINH", "UNVERIFIED PARTICIPANT ACCOUNT")}</span>
    <div className="reported-sanction-sequence" aria-label={loc(language, "Theo lời kể: một năm, sáu tháng, rồi vĩnh viễn", "Reported: one year, six months, then permanent")}>
      <strong>{loc(language, "1 năm", "1 year")}</strong><span aria-hidden="true">→</span><strong>{loc(language, "6 tháng", "6 months")}</strong><span aria-hidden="true">→</span><strong>{loc(language, "vĩnh viễn", "permanent")}</strong>
    </div>
    <p>{loc(language, "một số nguồn tin từ các cá nhân tham gia giải đấu từ đội tuyển việt nam đã thông tin về việc ban đầu btc đã đưa ra lệnh ban từ trước đó, tuy nhiên ban đầu là 1 năm, sau đó giảm xuống 6 tháng sau khi Himass và Tanvuu lên bài xin lỗi. Tuy nhiên sau đó lại đổi thành ban vĩnh viễn.", "Several sources among Vietnam team members who participated in the tournament said the organizers had initially issued a ban of one year, then reduced it to six months after Himass and Tanvuu posted apologies. It was later changed to a permanent ban.")}</p>
    <LocalizedAnchor href="/sources#reported-sanction-changes">{loc(language, "Xem nguồn gốc và giới hạn thông tin", "Read provenance and limits")} ↗</LocalizedAnchor>
  </aside>;
}

function CaseModule({ id, language, response, explanation }: { id: keyof typeof modules; language: Language; response: string; explanation: string }) {
  const module = modules[id];
  const title = loc(language, module.vi.title, module.en.title);
  const body = loc(language, module.vi.body, module.en.body);
  return <aside className={`case-module case-module-${id}`} aria-label={title}>
    <span className="case-module-eyebrow">{loc(language, "LẬP LUẬN CỦA TRANG", "THIS SITE'S ARGUMENT")}</span>
    <h3>{title}</h3>
    <p className="case-module-lead">{body}</p>
    {id === "rulebook" && <div className="module-document"><span>{loc(language, "ĐIỀU LỆ VI", "VI RULEBOOK")} · §3.7 · 14.09.2026 · P.16/17</span><blockquote lang="vi">“Khuyến nghị tất cả người chơi livestream cá nhân phải cài đặt độ trễ hợp lý để tránh bị lộ thông tin.”</blockquote><p>{loc(language, "Trích nguyên văn điều lệ tiếng Việt. §4.1 quy định nghĩa vụ đọc thông báo chính thức trên Discord; bản lưu hướng dẫn trước sự việc chưa có trên trang.", "Exact excerpt from the Vietnamese rulebook. §4.1 also requires participants to read official Discord notices; this site has no archived pre-event guidance.")}</p></div>}
    {id === "findings-september-23" && <div className="module-chain" aria-label={loc(language, "Cáo buộc, chứng cứ, kết luận", "Claim, evidence, finding")}>
      <div><span>{loc(language, "CÁO BUỘC", "CLAIM")}</span><p>{loc(language, "Himass và TanVuu xem và dùng thông tin ngoài game.", "Himass and TanVuu viewed and used out-of-game information.")}</p></div>
      <div><span>{loc(language, "CHỨNG CỨ PUBG NÊU", "EVIDENCE PUBG CITES")}</span><p>{loc(language, "Livestream, video người tham gia, dữ liệu trong game và replay; hồ sơ cá nhân đầy đủ chưa được công khai tại các nguồn lưu ở đây.", "Broadcasts, participant footage, in-game data and replays; the complete player-specific record is not public in the sources archived here.")}</p></div>
      <div><span>{loc(language, "KẾT LUẬN", "FINDING")}</span><p>{loc(language, "PUBG kết luận thông tin đã được áp dụng vào chiến thuật. Đây là kết luận được dẫn nguồn, không phải kết quả xác minh độc lập của trang.", "PUBG concluded the information informed play. This is an attributed finding, not this site's independent verification.")}</p></div>
    </div>}
    {id === "findings-september-23" && <p className="module-limits">{loc(language, "Trang này chưa có bản lưu chứng cứ theo từng tuyển thủ hoặc phản hồi xác thực riêng của từng người; vì vậy chưa thể đối chiếu độc lập các bước suy luận.", "This site has no archived player-specific evidence file or verified individual responses, so it cannot independently check each step of the reasoning.")}</p>}
    {id === "follow-up" && <div className="module-comparison">
      <span className="comparison-intro">{loc(language, "CÙNG BA CÂU HỎI CHO MỖI TRƯỜNG HỢP", "THE SAME THREE QUESTIONS FOR EACH CASE")}</span>
      <div className="comparison-cases">
        {[
          { name: "HIMASS & TANVUU", values: [loc(language, "PUBG gắn sự việc với Day 1", "PUBG dates conduct to Day 1"), loc(language, "PUBG nói đã xem stream người khác", "PUBG says another stream was viewed"), loc(language, "PUBG kết luận có áp dụng vào chiến thuật", "PUBG found strategic use")] },
          { name: loc(language, "ẢNH LIÊN QUAN SOOPI", "SOOPI-RELATED STILLS"), values: [loc(language, "Chưa được xác lập công khai", "Not publicly established"), loc(language, "Ảnh chỉ cho thấy giao diện; chưa xác lập nội dung đã chia sẻ", "Stills show an interface; sharing is not established"), loc(language, "Chưa được xác lập công khai", "Not publicly established")] },
        ].map((person) => <section className="comparison-case" key={person.name}><h4>{person.name}</h4><dl>{[
          loc(language, "Thời điểm / tư cách", "Timing / status"),
          loc(language, "Nội dung xem / chia sẻ", "Viewed / shared content"),
          loc(language, "Sử dụng trong trận", "In-game use"),
        ].map((label, fieldIndex) => <div key={label}><dt>{label}</dt><dd>{person.values[fieldIndex]}</dd></div>)}</dl></section>)}
      </div>
      <p>{loc(language, "Trong kết luận ngày 23/09, PUBG nói đã xem xét nghi vấn tương tự với người khác và không thấy thêm vi phạm cần chế tài; thông báo không nêu tên Soopi trong kết luận này.", "In its later 23 Sep findings, PUBG says it reviewed similar allegations involving others and found no further sanctionable violation; the notice does not name Soopi in that finding.")}</p>
      <div className="module-stills"><LocalizedAnchor href="/sources#evidence-soopi-alt-tab"><Image src="/attachments/evidences/soopi-alt-tab.png" alt={loc(language, "Ảnh do người dùng cung cấp: màn hình chuyển ứng dụng", "User-supplied app switcher still")} width={360} height={203} unoptimized /><span>{loc(language, "Ảnh chuyển ứng dụng · nguồn và thời điểm chưa xác minh", "App switcher · origin and timing unverified")}</span></LocalizedAnchor><LocalizedAnchor href="/sources#evidence-soopi-watching-livestream"><Image src="/attachments/evidences/soopi-watching-livestream.png" alt={loc(language, "Ảnh do người dùng cung cấp: trang livestream", "User-supplied livestream page still")} width={360} height={203} unoptimized /><span>{loc(language, "Trang stream · ảnh tĩnh không chứng minh việc sử dụng", "Stream page · still does not prove use")}</span></LocalizedAnchor></div>
    </div>}
    {id === "sanctions-september-23" && <div className="module-sanctions"><div><span>{loc(language, "TÀI KHOẢN GAME", "GAME ACCOUNTS")}</span><strong>{loc(language, "Khóa vĩnh viễn", "Permanent bans")}</strong></div><div><span>{loc(language, "GIẢI ESPORTS CHÍNH THỨC", "OFFICIAL ESPORTS")}</span><strong>{loc(language, "Tước quyền thi đấu vĩnh viễn", "Permanent ineligibility")}</strong></div><div><span>{loc(language, "VIETNAM PARTNER · 20/09", "VIETNAM PARTNER · 20 SEP")}</span><strong>{loc(language, "Thu hồi tư cách", "Status revoked")}</strong></div></div>}
    {id === "sanctions-september-23" && <ReportedSanctionChanges language={language} />}
    {id === "sanctions-september-23" && <p className="module-limits">{loc(language, "PUBG nêu quyền giải trình qua thủ tục Esports. Trang này chưa có kết quả khiếu nại hoặc tuyên bố đội tuyển được xác thực để dẫn nguồn.", "PUBG states that the players may use its esports response process. This site has no verified appeal outcome or team statement to cite.")}</p>}
    <div className="module-links"><span>{loc(language, "KIỂM TRA BỐI CẢNH", "CHECK THE CONTEXT")}</span><div>{module.links.map((link) => <LocalizedAnchor key={link.href} href={link.href}>{localized(link, language)} ↗</LocalizedAnchor>)}</div></div>
    <details className="case-read-more"><summary>{loc(language, "Đọc thêm", "Read more")}<span aria-hidden="true">+</span></summary><div><p><strong>{loc(language, "Phản hồi / lập luận:", "Response / argument:")}</strong> {response}</p><p><strong>{loc(language, "Bối cảnh:", "Context:")}</strong> {explanation}</p></div></details>
  </aside>;
}

export default function TimelineExperience() {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [heroActiveIndex, setHeroActiveIndex] = useState(0);
  const [support, setSupport] = useState<{ count: number; supported: boolean } | null>(null);
  const [supportPending, setSupportPending] = useState(false);
  const [supportError, setSupportError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/support", { cache: "no-store", signal: controller.signal })
      .then((result) => {
        if (!result.ok) throw new Error("Support count unavailable");
        return result.json();
      })
      .then((data) => setSupport((current) => current?.supported ? current : data))
      .catch((error) => { if (error.name !== "AbortError") setSupportError(true); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const panels = Array.from(document.querySelectorAll<HTMLElement>(".story-panel"));
    const heroSection = document.querySelector<HTMLElement>(".campaign-hero");
    const heroTrack = document.querySelector<HTMLElement>(".campaign-hero-track");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const storySection = document.querySelector<HTMLElement>(".story-section");
    let observer: IntersectionObserver | undefined;
    if (!reducedMotion.matches && storySection) {
      storySection.classList.add("motion-ready");
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      panels.forEach((panel) => observer?.observe(panel));
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      const measured = panels.map((panel) => ({ panel, rect: panel.getBoundingClientRect() }));
      const visibleIndex = measured.findIndex(({ rect }) => rect.top <= middle && rect.bottom >= middle);
      const nearest = visibleIndex >= 0 ? visibleIndex : measured.reduce((closest, { rect }, index) => {
        const distance = Math.abs(rect.top + rect.height / 2 - middle);
        const closestRect = measured[closest].rect;
        return distance < Math.abs(closestRect.top + closestRect.height / 2 - middle) ? index : closest;
      }, 0);
      if (!reducedMotion.matches) measured.forEach(({ panel, rect }) => {
        if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight * 2) return;
        const offset = Math.max(-180, Math.min(180, (middle - rect.top - rect.height / 2) * 0.3));
        panel.style.setProperty("--parallax-offset", `${offset.toFixed(1)}px`);
      });
      if (heroSection && heroTrack) {
        const rect = heroSection.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        const rawProgress = Math.max(0, Math.min(3, (-rect.top / travel) * 3));
        const progress = reducedMotion.matches ? Math.round(rawProgress) : rawProgress;
        heroTrack.style.transform = `translate3d(${-progress * 100}vw, 0, 0)`;
        heroSection.style.setProperty("--hero-progress", `${(rawProgress / 3) * 100}%`);
        const current = Math.round(rawProgress);
        setHeroActiveIndex((previous) => previous === current ? previous : current);
      }
      setActiveIndex((previous) => previous === nearest ? previous : nearest);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    let touchStart: { x: number; y: number } | null = null;
    const onHeroTouchStart = (event: TouchEvent) => {
      if (!window.matchMedia("(max-width: 600px)").matches || event.touches.length !== 1) return;
      if ((event.target as HTMLElement).closest("a, button, input, select, textarea")) return;
      touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    };
    const onHeroTouchEnd = (event: TouchEvent) => {
      if (!touchStart || !heroSection) return;
      const deltaX = event.changedTouches[0].clientX - touchStart.x;
      const deltaY = event.changedTouches[0].clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY) * 1.3) return;
      const stageDistance = (heroSection.offsetHeight - (heroSection.querySelector<HTMLElement>(".campaign-hero-pin")?.offsetHeight ?? window.innerHeight)) / 3;
      const current = Math.max(0, Math.min(3, Math.round(-heroSection.getBoundingClientRect().top / Math.max(1, stageDistance))));
      scrollToHeroSlide(Math.max(0, Math.min(4, current + (deltaX < 0 ? 1 : -1))));
    };
    let wheelLocked = false;
    let wheelTotal = 0;
    let wheelTimer = 0;
    const onHeroWheel = (event: WheelEvent) => {
      if (!heroSection || event.ctrlKey || event.metaKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
      const rect = heroSection.getBoundingClientRect();
      if (rect.top > 1 || rect.bottom <= 0) return;
      const slide = (event.target as HTMLElement).closest<HTMLElement>(".campaign-slide");
      if (slide && slide.scrollHeight > slide.clientHeight + 2) {
        const canScrollInside = event.deltaY > 0
          ? slide.scrollTop < slide.scrollHeight - slide.clientHeight - 2
          : slide.scrollTop > 2;
        if (canScrollInside) return;
      }
      const stageDistance = (rect.height - window.innerHeight) / 3;
      const position = stageDistance > 0 ? -rect.top / stageDistance : 0;
      const current = Math.max(0, Math.min(3, Math.round(position)));
      if (event.deltaY < 0 && current === 0) return;
      event.preventDefault();
      if (wheelLocked) return;
      wheelTotal += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (Math.abs(wheelTotal) < 32) return;
      const direction = Math.sign(wheelTotal);
      wheelTotal = 0;
      const next = Math.max(0, Math.min(3, current + direction));
      if (next === current && direction < 0) return;
      wheelLocked = true;
      const sectionTop = rect.top + window.scrollY;
      window.scrollTo({ top: next === current ? sectionTop + heroSection.offsetHeight : sectionTop + next * stageDistance, behavior: reducedMotion.matches ? "auto" : "smooth" });
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => { wheelLocked = false; }, 780);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    heroSection?.addEventListener("wheel", onHeroWheel, { passive: false });
    heroSection?.addEventListener("touchstart", onHeroTouchStart, { passive: true });
    heroSection?.addEventListener("touchend", onHeroTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      heroSection?.removeEventListener("wheel", onHeroWheel);
      heroSection?.removeEventListener("touchstart", onHeroTouchStart);
      heroSection?.removeEventListener("touchend", onHeroTouchEnd);
      window.clearTimeout(wheelTimer);
      if (frame) window.cancelAnimationFrame(frame);
      observer?.disconnect();
      storySection?.classList.remove("motion-ready");
    };
  }, []);

  const t = language === "vi" ? copy.vi : Object.fromEntries(Object.entries(copy.en).map(([key, value]) => [key, loc(language, value, value)])) as unknown as typeof copy.vi;
  const translatedHeroArguments = language === "vi" ? heroArguments.vi : heroArguments.en.map((item) => ({ title: loc(language, item.title, item.title), body: loc(language, item.body, item.body) }));

  const standWithThem = async () => {
    if (supportPending || support?.supported) return;
    setSupportPending(true);
    setSupportError(false);
    try {
      const result = await fetch("/api/support", { method: "POST", cache: "no-store" });
      if (!result.ok) throw new Error("Support count unavailable");
      setSupport(await result.json());
    } catch {
      setSupportError(true);
    } finally {
      setSupportPending(false);
    }
  };

  const skipToTimeline = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("timeline");
    if (!target) return;
    event.preventDefault();
    const root = document.documentElement;
    root.classList.add("is-skipping-intro");
    root.style.scrollBehavior = "auto";
    window.history.replaceState(null, "", "#timeline");
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: "auto" });
    window.requestAnimationFrame(() => { root.style.scrollBehavior = ""; root.classList.remove("is-skipping-intro"); });
  };

  return (
    <div id="top" className="site-shell">
      <header className="site-header">
        <LocalizedAnchor className="wordmark" href="#top" aria-label="Justice for PUBG VN">
          <span className="wordmark-main">JUSTICE<span>FORPUBGVN</span></span>
          <span className="wordmark-sub">{t.brandSub}</span>
        </LocalizedAnchor>
        <nav className="home-header-nav" aria-label={loc(language, "Điều hướng chính", "Main navigation")}>
          <LocalizedAnchor href="/players">{loc(language, "TUYỂN THỦ", "PLAYERS")}</LocalizedAnchor>
          <LocalizedAnchor href="/sources">{t.navSources}</LocalizedAnchor>
          <LocalizedAnchor href="/legal">{loc(language, "PHÁP LÝ", "LEGAL")}</LocalizedAnchor>
        </nav>
        <LanguageSelector />
      </header>

      <main>
        <section className={`campaign-hero campaign-hero-stage-${heroActiveIndex}`} aria-label={t.heroLabel}>
          <div className="campaign-hero-pin">
            <div className="campaign-hero-track">
              <article className="campaign-slide campaign-slide-intro" aria-hidden={heroActiveIndex !== 0} inert={heroActiveIndex !== 0}>
                <div className="campaign-hero-photo"><Image src="/attachments/himass-tanvuu.png" alt={loc(language, "Hình minh họa đen trắng của hai tuyển thủ do người dùng cung cấp", "User-supplied black-and-white campaign visual of two esports players")} fill sizes="100vw" unoptimized priority /></div>
                <div className="page-width campaign-slide-inner">
                  <div className="campaign-hero-copy">
                    <p className="eyebrow accent-text"><span className="eyebrow-line" />{t.heroEyebrow}</p>
                    <h1 id="hero-title"><span>{t.heroLineOne}</span><strong>{t.heroLineTwo}</strong></h1>
                    <p className="hero-statement">{t.heroStatement}</p>
                    <p className="hero-description">{t.heroDescription}</p>
                    <div className="hero-support">
                      <button type="button" className="hero-support-button" onClick={standWithThem} disabled={supportPending || support?.supported} aria-pressed={support?.supported ?? false}>
                        <SupportIcon supported={support?.supported ?? false} />{support?.supported ? t.supportedButton : t.supportButton}
                      </button>
                      <div className="hero-support-count" aria-live="polite"><strong>{support ? new Intl.NumberFormat({ vi: "vi-VN", th: "th-TH", en: "en-US", ko: "ko-KR" }[language]).format(support.count) : "…"}</strong><span>{t.supportCount}</span></div>
                    </div>
                    {supportError && <p className="hero-support-error" role="alert">{t.supportError}</p>}
                    <p className="hero-intro-credit">{t.independent} · {t.heroVisualSource}</p>
                  </div>
                </div>
              </article>

              <article className="campaign-slide campaign-slide-rule" aria-hidden={heroActiveIndex !== 1} inert={heroActiveIndex !== 1}>
                <div className="page-width campaign-slide-inner magazine-layout">
                  <div className="magazine-copy">
                    <p className="magazine-kicker">{loc(language, "ĐIỀU LỆ & HƯỚNG DẪN", "RULES & GUIDANCE")}</p>
                    <h2>{translatedHeroArguments[0].title}</h2>
                    <p className="magazine-lead">{translatedHeroArguments[0].body}</p>
                    <p className="magazine-context">{loc(language, "Điều lệ có nghĩa vụ chống gian lận và yêu cầu theo dõi thông báo Discord. PUBG sau đó thừa nhận các tiêu chuẩn công bằng chưa được cụ thể hóa đủ.", "The rulebook contains anti-cheating duties and requires participants to follow Discord notices. PUBG later acknowledged that its fairness standards were not specific enough.")}</p>
                    <LocalizedAnchor className="magazine-source" href="/sources#rulebook-vi-3-7">{loc(language, "Đọc điều lệ gốc · §3.7", "Read the rulebook · §3.7")} ↗</LocalizedAnchor>
                  </div>
                  <div className="magazine-rule-excerpt"><span>{loc(language, "ĐIỀU LỆ VI", "VI RULEBOOK")} · §3.7 · 14.09.2026</span><strong>§3.7</strong><blockquote lang="vi">“Khuyến nghị tất cả người chơi livestream cá nhân phải cài đặt độ trễ hợp lý để tránh bị lộ thông tin.”</blockquote><p>{loc(language, "Trích nguyên văn trang 16/17. Chưa có bản lưu hướng dẫn Discord trước sự việc để đối chiếu.", "Translation: Players who stream personally are encouraged to set a reasonable delay to prevent information exposure. Pre-event Discord guidance is not archived here.")}</p></div>
                </div>
              </article>

              <article className="campaign-slide campaign-slide-investigation" aria-hidden={heroActiveIndex !== 2} inert={heroActiveIndex !== 2}>
                <div className="page-width campaign-slide-inner magazine-layout">
                  <div className="magazine-copy">
                    <p className="magazine-kicker">{loc(language, "KẾT LUẬN & CHỨNG CỨ", "FINDINGS & EVIDENCE")}</p>
                    <h2>{translatedHeroArguments[1].title}</h2>
                    <p className="magazine-lead">{translatedHeroArguments[1].body}</p>
                    <p className="magazine-context">{loc(language, "Thông báo ngày 20/09 còn để ngỏ câu hỏi về việc xem stream người khác và sử dụng thông tin. Kết luận ngày 23/09 đã thay đổi trạng thái đó.", "The 20 September notice left questions about viewing another stream and using its information open. The 23 September findings superseded that status.")}</p>
                    <LocalizedAnchor className="magazine-source" href="/sources#findingsVi">{loc(language, "Đọc kết luận của PUBG", "Read PUBG's findings")} ↗</LocalizedAnchor>
                  </div>
                  <div className="magazine-evidence">
                    <div className="magazine-evidence-status"><span>20.09 · {loc(language, "còn điều tra", "under review")}</span><span>23.09 · {loc(language, "PUBG công bố kết luận", "PUBG published findings")}</span></div>
                    <LocalizedAnchor className="magazine-evidence-primary" href="/sources#evidence-soopi-watching-livestream" aria-label={loc(language, "Xem nguồn ảnh trang livestream liên quan Soopi", "View provenance for the Soopi-related livestream image")}>
                      <Image src="/attachments/evidences/soopi-watching-livestream.png" alt={loc(language, "Ảnh do người dùng cung cấp: trang livestream SOOP xuất hiện trong video liên quan Soopi", "User-supplied still of a SOOP livestream page in Soopi-related footage")} fill sizes="(max-width: 800px) 90vw, 42vw" unoptimized />
                    </LocalizedAnchor>
                    <div className="magazine-evidence-bottom">
                      <LocalizedAnchor className="magazine-evidence-secondary" href="/sources#evidence-soopi-alt-tab" aria-label={loc(language, "Xem nguồn ảnh chuyển ứng dụng liên quan Soopi", "View provenance for the Soopi-related app-switcher image")}><Image src="/attachments/evidences/soopi-alt-tab.png" alt={loc(language, "Ảnh do người dùng cung cấp: màn hình chuyển ứng dụng trong video liên quan Soopi", "User-supplied app-switcher still in Soopi-related footage")} fill sizes="(max-width: 800px) 45vw, 20vw" unoptimized /></LocalizedAnchor>
                      <p>{loc(language, "Ảnh liên quan Soopi do người dùng cung cấp. Ảnh cho thấy trang stream và thao tác chuyển ứng dụng; thời điểm, bối cảnh và việc sử dụng thông tin chưa được xác minh độc lập. Chúng không thay thế kết luận điều tra của PUBG.", "User-supplied Soopi-related stills show a stream page and an app switcher. Their timing, context and any use of information are not independently established. They do not replace PUBG's investigation findings.")}</p>
                    </div>
                  </div>
                </div>
              </article>

              <article className="campaign-slide campaign-slide-sanctions" aria-hidden={heroActiveIndex !== 3} inert={heroActiveIndex !== 3}>
                <div className="page-width campaign-slide-inner magazine-layout">
                  <div className="magazine-copy">
                    <p className="magazine-kicker">{loc(language, "CHẾ TÀI & QUYỀN GIẢI TRÌNH", "SANCTIONS & RIGHT TO RESPOND")}</p>
                    <h2>{translatedHeroArguments[2].title}</h2>
                    <p className="magazine-lead">{translatedHeroArguments[2].body}</p>
                    <p className="magazine-context">{loc(language, "PUBG công bố khóa vĩnh viễn tài khoản game và tước quyền thi đấu tại các giải esports chính thức. Thông báo cũng nêu quyền giải trình theo thủ tục esports.", "PUBG announced permanent game-account bans and permanent ineligibility for official esports events. Its notice also describes an esports response process.")}</p>
                    <LocalizedAnchor className="primary-cta" href="#timeline" onClick={skipToTimeline}><span>{t.heroButton}</span><ArrowIcon /></LocalizedAnchor>
                  </div>
                  <div className="magazine-sanctions"><div><span>{loc(language, "TÀI KHOẢN GAME", "GAME ACCOUNT")}</span><strong>{loc(language, "Khóa vĩnh viễn", "Permanent ban")}</strong></div><div><span>{loc(language, "GIẢI ESPORTS CHÍNH THỨC", "OFFICIAL ESPORTS")}</span><strong>{loc(language, "Tước quyền thi đấu vĩnh viễn", "Permanent ineligibility")}</strong></div><ReportedSanctionChanges language={language} compact /></div>
                </div>
              </article>
            </div>
            <nav className="campaign-slide-nav" aria-label={loc(language, "Chuyển trang mở đầu", "Introduction slides")}>
              <button type="button" onClick={() => scrollToHeroSlide(heroActiveIndex - 1)} disabled={heroActiveIndex === 0} aria-label={loc(language, "Trang trước", "Previous slide")}>‹</button>
              <span aria-live="polite">{String(heroActiveIndex + 1).padStart(2, "0")} / 04</span>
              <button type="button" onClick={() => scrollToHeroSlide(heroActiveIndex + 1)} disabled={heroActiveIndex === 3} aria-label={loc(language, "Trang tiếp", "Next slide")}>›</button>
            </nav>
            <div className="campaign-hero-footer"><span className="campaign-scroll-cue"><span className="desktop-scroll-cue">{t.heroScroll} <span aria-hidden="true">↓</span></span><span className="mobile-swipe-cue">{loc(language, "Vuốt để xem tiếp", "Swipe to continue")} <span aria-hidden="true">→</span></span></span><ShareButton className="campaign-share" /><LocalizedAnchor className="campaign-skip" href="#timeline" onClick={skipToTimeline}>{t.heroSkip} ↗</LocalizedAnchor></div>
            <div className="campaign-hero-progress" aria-hidden="true"><span /></div>
          </div>
          <div className="campaign-hero-markers" aria-hidden="true">{[0, 1, 2, 3].map((marker) => <div className="campaign-hero-marker" key={marker} />)}</div>
        </section>

        <section id="timeline" className="story-section" aria-label={t.timelineTitle}>
          <div className="story-progress">
            <div className="page-width story-progress-inner">
              <span>{t.progress} <strong>{String(activeIndex + 1).padStart(2, "0")} / {String(timeline.length).padStart(2, "0")}</strong></span>
              <nav aria-label={loc(language, "Chuyển đến mốc thời gian", "Jump to milestone")}>
                {timeline.map((event, index) => <LocalizedAnchor key={event.id} href={`#${event.id}`} className={index === activeIndex ? "current" : ""} aria-label={`${index + 1}. ${localized(event.title, language)}`} aria-current={index === activeIndex ? "step" : undefined} />)}
              </nav>
              <LocalizedAnchor href="/sources">{t.navSources} ↗</LocalizedAnchor>
            </div>
            <div className="story-progress-fill" style={{ width: `${((activeIndex + 1) / timeline.length) * 100}%` }} />
          </div>

          {timeline.map((event, index) => (
            <article className={`story-panel story-panel-${event.category}`} id={event.id} key={event.id}>
              <div className="page-width story-inner">
                <div className="story-content">
                  <div className="story-kicker"><span>{String(index + 1).padStart(2, "0")} / {String(timeline.length).padStart(2, "0")}</span><span>{localized(event.label, language)}</span></div>
                  <div className="story-date"><strong>{event.day}</strong><span>{{ vi: "THG 9", th: "ก.ย.", en: event.month, ko: "9월" }[language]}<br />2026</span></div>
                  <h2>{localized(event.title, language)}</h2>
                  <div className="story-main-point"><span>{t.whatHappened}</span><p className="story-description">{localized(event.description, language)}</p></div>
                  <div className="story-sources"><span>{event.sources.length === 1 ? t.source : t.sources}</span><div>{event.sources.map((sourceKey) => <SourceLink key={sourceKey} sourceKey={sourceKey} label={loc(language, sources[sourceKey].label, sources[sourceKey].label)} />)}</div></div>
                  {index < timeline.length - 1 && <LocalizedAnchor className="story-next" href={`#${timeline[index + 1].id}`}>{t.next} <span>↓</span></LocalizedAnchor>}
                </div>
                {event.id in modules ? (
                  <CaseModule id={event.id as keyof typeof modules} language={language} response={localized(event.response, language)} explanation={localized(event.explanation, language)} />
                ) : (
                  <div className="story-explainer story-explainer-compact">
                    <span className="story-explainer-top">{loc(language, "HỒ SƠ VỤ VIỆC", "CASE FILE")} / {String(index + 1).padStart(2, "0")}</span>
                    <p className="story-explainer-summary">{loc(language, "Diễn biến được ghi nhận từ tài liệu nguồn. Mở phần giải thích để xem lập luận và giới hạn của mốc này.", "This milestone draws on the linked source. Open the explanation for context and limits.")}</p>
                    <details className="case-read-more"><summary>{t.readMore}<span aria-hidden="true">+</span></summary><div><p><strong>{t.responseLabel}:</strong> {localized(event.response, language)}</p><p><strong>{t.explanationLabel}:</strong> {localized(event.explanation, language)}</p></div></details>
                    <span className="story-explainer-bottom">JUSTICE FOR PUBG VN · 2026</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>

      </main>

      <footer className="site-footer"><div className="page-width footer-inner"><div className="footer-brand">JUSTICE<span>FORPUBGVN</span><small>{t.brandSub}</small></div><p>{t.footerNote}</p><div className="home-footer-links"><LocalizedAnchor href="/players">{loc(language, "TUYỂN THỦ", "PLAYERS")} ↗</LocalizedAnchor><LocalizedAnchor href="/sources">{t.navSources} ↗</LocalizedAnchor><LocalizedAnchor href="/legal">{loc(language, "PHÁP LÝ", "LEGAL")} ↗</LocalizedAnchor><ShareButton /></div></div></footer>
    </div>
  );
}
