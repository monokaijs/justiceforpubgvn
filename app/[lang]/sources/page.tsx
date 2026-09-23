import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import manifest from "@/public/attachments/manifest.json";
import evidenceManifest from "@/public/attachments/evidence-manifest.json";
import visualManifest from "@/public/attachments/visual-manifest.json";
import { sources } from "@/data/timeline";
import LanguageSelector from "@/components/language-selector";
import DualLanguage from "@/components/dual-language";
import TranslatedQuote from "@/components/translated-quote";
import LocalizedAnchor from "@/components/localized-anchor";
import { isLanguage } from "@/lib/language";
import { pageMetadata } from "@/lib/seo";

function L({ vi, en }: { vi: string; en: string }) {
  return <DualLanguage vi={vi} en={en} />;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return pageMetadata(lang, "sources");
}

type Archived = (typeof manifest)[number];

const records = [
  {
    id: "findingsVi",
    title: "Kết quả điều tra và biện pháp xử lý · 23/09/2026",
    titleEn: "Investigation findings and sanctions · 23 Sep 2026",
    subtitle: "Official PUBG notice · Vietnamese",
    source: sources.findingsVi.url,
    filename: "pubg-findings-2026-09-23-vi.html.txt",
    note: "Nguồn chính cho kết luận điều tra, án cấm và phần nhận trách nhiệm của KRAFTON.",
    noteEn: "Primary source for the investigation findings, sanctions and KRAFTON's acknowledgement of responsibility.",
  },
  {
    id: "findingsKo",
    title: "Kết quả điều tra và biện pháp xử lý · bản tiếng Hàn · 23/09/2026",
    titleEn: "Investigation findings · Korean · 23 Sep 2026",
    subtitle: "Official PUBG notice · Korean",
    source: sources.findingsKo.url,
    filename: "pubg-findings-2026-09-23-ko.html.txt",
    note: "Bản tiếng Hàn của thông báo kết quả điều tra để đối chiếu với bản tiếng Việt.",
    noteEn: "Korean version of the investigation notice for comparison with the Vietnamese notice.",
  },
  {
    id: "preliminary",
    title: "Thông báo ban đầu · 19/09/2026",
    titleEn: "Initial notice · 19 Sep 2026",
    subtitle: "Kakao PUBG repost of KRAFTON notice · Korean",
    source: sources.preliminary.url,
    filename: "kakao-notice-2026-09-19-ko.txt",
    note: "Kakao PUBG ghi rõ nội dung được KRAFTON chia sẻ. Bản lưu là văn bản bài viết chụp từ trang hiển thị; tải trực tiếp HTML trả HTTP 403.",
    noteEn: "Kakao PUBG identifies this as a KRAFTON notice. The local copy contains captured visible article text because direct HTML retrieval returned HTTP 403.",
  },
  {
    id: "additional",
    title: "Thông báo bổ sung và hủy Day 3 · 20/09/2026",
    titleEn: "Additional notice and Day 3 cancellation · 20 Sep 2026",
    subtitle: "Kakao PUBG repost of KRAFTON notice · Korean",
    source: sources.additional.url,
    filename: "kakao-notice-2026-09-20-ko.txt",
    note: "Liên kết được giữ từ HTML gốc. Bản lưu là văn bản bài viết chụp từ trang hiển thị; tải trực tiếp HTML trả HTTP 403.",
    noteEn: "The link comes from the original HTML. The local copy contains captured visible article text because direct HTML retrieval returned HTTP 403.",
  },
  {
    id: "eventNotice",
    title: "Lịch sự kiện gốc · 11/09/2026",
    titleEn: "Original event schedule · 11 Sep 2026",
    subtitle: "Official PUBG event notice · Vietnamese",
    source: "https://pubg.com/vi/events/notice/10926",
    filename: "pubg-asia-stars-event-notice-2026-09-11-vi.html.txt",
    note: "Tài liệu để đối chiếu lịch Day 1–3; không phải nguồn cho kết luận điều tra.",
    noteEn: "Source for checking the Day 1–3 schedule; it is not a source for the investigation findings.",
  },
  {
    id: "rulebook",
    title: "Điều lệ PUBG Asia Stars 2026",
    titleEn: "PUBG Asia Stars 2026 Rulebook",
    subtitle: "Public mirror · Liquipedia",
    source: sources.rulebook.url,
    filename: null,
    note: "Đây là bản mirror công khai, không phải trang PUBG. Hai bản PDF đính kèm nằm ở phần trích điều lệ bên dưới; chưa xác minh chúng trùng với bản trên mirror.",
    noteEn: "This is a public mirror, not a PUBG site. The two supplied PDFs are linked in the excerpt section below; their match with the mirror has not been verified.",
  },
  {
    id: "webEventRules",
    title: "Quy định chính thức của Web Event",
    titleEn: "Official Web Event Rules",
    subtitle: "Official PUBG PDF · web event",
    source: "https://www.pubg.com/static/guide-pubgasiastars/event/PUBG_ASIASTARS_Event_Official_Rules_en.pdf",
    filename: "pubg-asia-stars-web-event-rules.pdf",
    note: "PDF này là quy định của web event và phần thưởng; không phải tournament rulebook.",
    noteEn: "This PDF governs the web event and rewards. It is not the tournament rulebook.",
  },
] as const;

export default function SourcesPage() {
  const archiveByName = new Map<string, Archived>(manifest.map((item) => [item.filename, item]));
  const rulebookVi = "VI-PUBG-ASIA-STARS-2026-Rulebook-FINAL.pdf";
  const rulebookEn = "EN-PUBG-ASIA-STARS-2026-Rulebook-FINAL.pdf";
  const rulebookHash = (filename: string) => createHash("sha256").update(readFileSync(join(process.cwd(), "public", "attachments", filename))).digest("hex");

  return (
    <div className="archive-page">
      <header className="archive-header">
        <LocalizedAnchor className="wordmark" href="/" aria-label="Justice for PUBG VN timeline">
          <span className="wordmark-main">JUSTICE<span>FORPUBGVN</span></span>
          <span className="wordmark-sub"><L vi="KHO TÀI LIỆU" en="SOURCE ARCHIVE" /></span>
        </LocalizedAnchor>
        <div className="archive-header-actions"><LocalizedAnchor href="/" className="archive-back"><L vi="← DÒNG THỜI GIAN" en="← TIMELINE" /></LocalizedAnchor><LocalizedAnchor href="/players" className="archive-back"><L vi="TUYỂN THỦ" en="PLAYERS" /></LocalizedAnchor><LocalizedAnchor href="/legal" className="archive-back"><L vi="PHÁP LÝ" en="LEGAL" /></LocalizedAnchor><LanguageSelector /></div>
      </header>

      <main className="archive-main page-width">
        <p className="eyebrow dark-eyebrow">02 / <L vi="KHO TÀI LIỆU" en="SOURCE ARCHIVE" /></p>
        <h1><L vi="KHO TÀI LIỆU" en="SOURCE ARCHIVE" /><span> / <L vi="NGUỒN" en="SOURCES" /></span></h1>
        <p className="archive-intro"><L vi="Mỗi mục cho biết địa chỉ gốc, nơi xuất bản và bản lưu cục bộ khi có. Trang PUBG được lưu dưới dạng HTML thô; hai thông báo Kakao được lưu dưới dạng văn bản bài viết từ trang hiển thị vì tải trực tiếp trả HTTP 403. SHA-256 giúp kiểm tra bản lưu có thay đổi hay không." en="Each record identifies the original URL, publisher and local copy when available. PUBG pages are archived as raw HTML; two Kakao notices contain captured visible article text because direct HTML retrieval returned HTTP 403. SHA-256 hashes help verify the local files." /></p>
        <div className="archive-meta"><span>{records.length} <L vi="NGUỒN" en="SOURCES" /></span><span>{manifest.length + 2} <L vi="TỆP TÀI LIỆU CỤC BỘ" en="LOCAL DOCUMENT FILES" /></span><LocalizedAnchor href="/attachments/manifest.json" target="_blank" rel="noopener noreferrer"><L vi="TẢI MANIFEST NGUỒN ↗" en="SOURCE MANIFEST ↗" /></LocalizedAnchor></div>

        <div className="archive-list">
          {records.map((record, index) => {
            const archived = record.filename ? archiveByName.get(record.filename) : undefined;
            return (
              <article className="archive-record" id={record.id} key={record.id}>
                <div className="archive-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="archive-content">
                  <span className="archive-subtitle"><L vi={record.subtitle} en={record.subtitle} /></span>
                  <h2><L vi={record.title} en={record.titleEn} /></h2>
                  <p><L vi={record.note} en={record.noteEn} /></p>
                  <div className="archive-links">
                    <LocalizedAnchor href={record.source} target="_blank" rel="noopener noreferrer"><L vi="NGUỒN GỐC ↗" en="ORIGINAL SOURCE ↗" /></LocalizedAnchor>
                    {archived ? <LocalizedAnchor href={`/attachments/${archived.filename}`} download><L vi="TẢI BẢN LƯU ↓" en="LOCAL COPY ↓" /></LocalizedAnchor> : record.id === "rulebook" ? <LocalizedAnchor href="#rulebook-vi-3-7"><L vi="XEM PDF ĐÍNH KÈM ↓" en="VIEW SUPPLIED PDF ↓" /></LocalizedAnchor> : <span><L vi="CHƯA CÓ BẢN LƯU" en="LOCAL COPY UNAVAILABLE" /></span>}
                  </div>
                  {archived && <div className="archive-checksum"><span><L vi="LƯU LÚC" en="CAPTURED" /> {archived.retrieved_at_utc.replace("T", " ").replace("+00:00", " UTC")}</span><span>{archived.capture_method}</span><span>SHA-256 {archived.sha256}</span></div>}
                  <div className="archive-url">{record.source}</div>
                </div>
              </article>
            );
          })}
        </div>

        <section className="rulebook-source" aria-labelledby="rulebook-source-title">
          <p className="eyebrow dark-eyebrow">02A / <L vi="ĐIỀU LỆ GIẢI ĐẤU" en="TOURNAMENT RULEBOOK" /></p>
          <h2 id="rulebook-source-title"><L vi="ĐIỀU LỆ GIẢI ĐẤU" en="TOURNAMENT RULEBOOK" /></h2>
          <p><L vi="Hai bản PDF tiếng Việt và tiếng Anh có trong tệp đính kèm của dự án. Bìa ghi phiên bản 14.09.2026 (VI) và 2026.09.14 (EN). Liên kết Liquipedia ở mục trên là một bản mirror công khai; chúng tôi chưa xác minh được hai tệp cục bộ có được tải từ mirror đó hay được PUBG phát hành tại một URL cụ thể." en="The project attachments contain Vietnamese and English PDFs. Their covers show versions 14.09.2026 (VI) and 2026.09.14 (EN). The Liquipedia link above is a public mirror; we have not verified whether these supplied files came from that mirror or a specific PUBG URL." /></p>
          <div className="rulebook-files">
            <LocalizedAnchor href={`/attachments/${rulebookVi}#page=16`} target="_blank" rel="noopener noreferrer"><L vi="MỞ BẢN VI · TRANG 16 ↗" en="OPEN VI · PAGE 16 ↗" /></LocalizedAnchor>
            <LocalizedAnchor href={`/attachments/${rulebookEn}#page=18`} target="_blank" rel="noopener noreferrer"><L vi="MỞ BẢN EN · TRANG 18 ↗" en="OPEN EN · PAGE 18 ↗" /></LocalizedAnchor>
          </div>
          <div className="rulebook-checksums"><span>VI SHA-256 {rulebookHash(rulebookVi)}</span><span>EN SHA-256 {rulebookHash(rulebookEn)}</span></div>
          <article className="rulebook-excerpt" id="rulebook-vi-3-7">
            <span><L vi="ĐIỀU LỆ VI" en="VI RULEBOOK" /> · §3.7 · <L vi="TRANG 16/17" en="PAGE 16/17" /> · 14.09.2026</span>
            <h3><L vi="Biện pháp chống gian lận" en="Anti-cheating measures" /></h3>
            <blockquote lang="vi">“Khuyến nghị tất cả người chơi livestream cá nhân phải cài đặt độ trễ hợp lý để tránh bị lộ thông tin.”</blockquote>
            <TranslatedQuote quote="delay" />
            <p><L vi="Điều khoản cũng nói người chơi tự chịu rủi ro do livestream cá nhân và phải hợp tác khi ban tổ chức yêu cầu kiểm tra bổ sung. Trích đoạn trên chỉ nói về độ trễ stream cá nhân; không tự giải quyết câu hỏi sử dụng thông tin từ stream của người khác." en="The section also makes players responsible for risks from personal streams and requires cooperation with additional organizer checks. This excerpt concerns personal stream delay; it does not by itself settle use of information from someone else's stream." /></p>
            <LocalizedAnchor href={`/attachments/${rulebookVi}#page=16`} target="_blank" rel="noopener noreferrer"><L vi="ĐỌC NGUYÊN TRANG PDF ↗" en="READ FULL PDF PAGE ↗" /></LocalizedAnchor>
          </article>
          <article className="rulebook-excerpt" id="rulebook-vi-4-1">
            <span><L vi="ĐIỀU LỆ VI" en="VI RULEBOOK" /> · §4.1 · <L vi="TRANG 16/17" en="PAGE 16/17" /> · 14.09.2026</span>
            <h3><L vi="Quy tắc ứng xử và nghĩa vụ chung" en="Conduct and general duties" /></h3>
            <blockquote lang="vi">“Tất cả Người tham gia có nghĩa vụ tự tìm hiểu, ghi nhớ bộ quy tắc này và mọi thông báo chính thức được đăng trên kênh Discord của giải đấu.”</blockquote>
            <TranslatedQuote quote="notices" />
            <p><L vi="§4.1 còn quy định thông báo bổ sung của ban tổ chức có giá trị tương đương điều khoản trong luật. Trang này chưa có bản lưu thông báo hoặc hướng dẫn Discord trước sự việc, nên chưa thể đối chiếu chính xác nội dung người tham gia đã nhận." en="§4.1 also says additional organizer announcements carry the same force as rulebook provisions. This site has no archive of the pre-event Discord notices or guidance, so their exact contents cannot be checked here." /></p>
            <LocalizedAnchor href={`/attachments/${rulebookVi}#page=16`} target="_blank" rel="noopener noreferrer"><L vi="ĐỌC NGUYÊN TRANG PDF ↗" en="READ FULL PDF PAGE ↗" /></LocalizedAnchor>
          </article>
        </section>

        <section id="reported-sanction-changes" className="reported-source" aria-labelledby="reported-sanction-title">
          <p className="eyebrow dark-eyebrow">02B / <L vi="PHẢN ÁNH CHƯA XÁC MINH" en="UNVERIFIED ACCOUNT" /></p>
          <h2 id="reported-sanction-title"><L vi="CÁC MỨC PHẠT ĐƯỢC KỂ LẠI" en="REPORTED SANCTION CHANGES" /></h2>
          <blockquote className="reported-source-quote"><L vi="một số nguồn tin từ các cá nhân tham gia giải đấu từ đội tuyển việt nam đã thông tin về việc ban đầu btc đã đưa ra lệnh ban từ trước đó, tuy nhiên ban đầu là 1 năm, sau đó giảm xuống 6 tháng sau khi Himass và Tanvuu lên bài xin lỗi. Tuy nhiên sau đó lại đổi thành ban vĩnh viễn." en="Several sources among Vietnam team members who participated in the tournament said the organizers had initially issued a ban of one year, then reduced it to six months after Himass and Tanvuu posted apologies. It was later changed to a permanent ban." /></blockquote>
          <p><L vi="Đoạn trên là thông tin do người yêu cầu trang cung cấp. Trang này chưa có bản chụp, đường dẫn gốc hoặc văn bản quyết định xác nhận các mức phạt trước đó và thời điểm thay đổi." en="The account above was supplied by the site requester. We do not have original posts, screenshots or decision records confirming the earlier sanction lengths or when they changed." /></p>
          <p><L vi="Các thông báo chính thức được lưu ở đây xác nhận án cấm vĩnh viễn nhưng không ghi nhận những thay đổi trước đó. Ban tổ chức cần giải thích căn cứ và quy trình của từng lần thay đổi nếu trình tự này được xác nhận." en="The official notices archived here confirm the permanent bans but do not document the earlier changes. If this sequence is confirmed, organizers should explain the basis and process for each change." /></p>
          <LocalizedAnchor href="#findingsVi"><L vi="ĐỐI CHIẾU THÔNG BÁO CHÍNH THỨC · 23/09 ↗" en="CHECK THE OFFICIAL 23 SEP NOTICE ↗" /></LocalizedAnchor>
        </section>

        <section id="evidence" className="evidence-archive" aria-labelledby="evidence-title">
          <p className="eyebrow dark-eyebrow">03 / <L vi="TƯ LIỆU DO NGƯỜI DÙNG CUNG CẤP" en="USER-SUPPLIED MATERIAL" /></p>
          <h2 id="evidence-title"><L vi="HÌNH ẢNH ĐÍNH KÈM" en="SUPPLIED IMAGES" /></h2>
          <p className="evidence-archive-intro"><L vi="Hai ảnh được đưa vào thư mục dự án bởi người dùng. Chúng được lưu nguyên file và hiển thị tại mốc đối chiếu người tham gia. Không có URL gốc hoặc thông tin xác thực ngày chụp, nên chúng được tách khỏi các thông báo chính thức của PUBG." en="The user supplied these two images, which are preserved as provided and shown at the participant comparison milestone. Their original URLs and capture dates have not been independently verified, so they are separate from official PUBG notices." /></p>
          <div className="evidence-archive-grid">
            {evidenceManifest.map((item, index) => (
              <article className="evidence-archive-card" id={index === 0 ? "evidence-soopi-alt-tab" : "evidence-soopi-watching-livestream"} key={item.filename}>
                <LocalizedAnchor href={item.path} target="_blank" rel="noopener noreferrer"><img src={item.path} alt={index === 0 ? "Application switcher over a PUBG lobby in Soopi footage" : "SOOP livestream page visible in footage"} /></LocalizedAnchor>
                <div className="evidence-archive-card-body">
                  <span><L vi="ẢNH DO NGƯỜI DÙNG CUNG CẤP" en="USER-SUPPLIED IMAGE" /> / {String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.filename}</h3>
                  <p><L vi={index === 0 ? "Màn hình chuyển ứng dụng trong video Soopi; bối cảnh chụp chưa được xác minh độc lập." : "Trang livestream xuất hiện trong video; ảnh tĩnh không tự chứng minh mục đích hoặc vi phạm."} en={index === 0 ? "Application switcher in Soopi-related footage; capture context is unverified." : "A livestream page visible in footage; a still alone does not establish intent or misconduct."} /></p>
                  <LocalizedAnchor href={item.path} download><L vi="TẢI PNG GỐC ↓" en="DOWNLOAD ORIGINAL PNG ↓" /></LocalizedAnchor>
                  <div className="archive-checksum">SHA-256 {item.sha256}</div>
                </div>
              </article>
            ))}
          </div>
          <LocalizedAnchor className="evidence-manifest-link" href="/attachments/evidence-manifest.json" target="_blank" rel="noopener noreferrer">IMAGE FILE MANIFEST ↗</LocalizedAnchor>
        </section>

        <section id="campaign-image" className="evidence-archive" aria-labelledby="campaign-image-title">
          <p className="eyebrow dark-eyebrow">04 / <L vi="HÌNH MINH HỌA" en="CAMPAIGN VISUAL" /></p>
          <h2 id="campaign-image-title"><L vi="HÌNH MINH HỌA" en="CAMPAIGN VISUAL" /></h2>
          <p className="evidence-archive-intro"><L vi="Ảnh đen trắng dùng ở phần mở đầu do người dùng cung cấp. Đây là hình minh họa cho chiến dịch, không phải chứng cứ điều tra hoặc ảnh do PUBG xác nhận." en="The user supplied the black-and-white hero image. It is campaign artwork, not investigation evidence or a PUBG-verified image." /></p>
          <article className="evidence-archive-card campaign-archive-card">
            <LocalizedAnchor href={visualManifest.path} target="_blank" rel="noopener noreferrer"><img src={visualManifest.path} alt="Hình minh họa đen trắng của hai tuyển thủ" /></LocalizedAnchor>
            <div className="evidence-archive-card-body">
              <span><L vi="HÌNH MINH HỌA DO NGƯỜI DÙNG CUNG CẤP" en="USER-SUPPLIED CAMPAIGN VISUAL" /></span>
              <h3>{visualManifest.filename}</h3>
              <p><L vi="Bản lưu cục bộ nguyên file. Nguồn ảnh gốc và danh tính trong ảnh chưa được xác minh độc lập." en="The local original is preserved. Its source and the identities depicted have not been independently verified." /></p>
              <LocalizedAnchor href={visualManifest.path} download><L vi="TẢI PNG GỐC ↓" en="DOWNLOAD ORIGINAL PNG ↓" /></LocalizedAnchor>
              <div className="archive-checksum">SHA-256 {visualManifest.sha256}</div>
            </div>
          </article>
          <LocalizedAnchor className="evidence-manifest-link" href="/attachments/visual-manifest.json" target="_blank" rel="noopener noreferrer">VISUAL FILE MANIFEST ↗</LocalizedAnchor>
        </section>
      </main>
      <footer className="site-footer"><div className="page-width archive-footer"><L vi="Kho tư liệu độc lập cho dòng thời gian Justice for PUBG VN." en="Independent source archive for the Justice for PUBG VN timeline." /> <LocalizedAnchor href="/"><L vi="← DÒNG THỜI GIAN" en="← TIMELINE" /></LocalizedAnchor></div></footer>
    </div>
  );
}
