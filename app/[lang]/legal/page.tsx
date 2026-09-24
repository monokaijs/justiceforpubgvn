import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DualLanguage from "@/components/dual-language";
import InteriorHeader from "@/components/interior-header";
import LocalizedAnchor from "@/components/localized-anchor";
import { isLanguage } from "@/lib/language";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return pageMetadata(lang, "legal");
}

const sections = [
  {
    id: "independence", number: "01", title: { vi: "Tính độc lập", en: "Independence" },
    paragraphs: [
      { vi: "Justice for PUBG VN là trang tổng hợp và bình luận độc lập về các sự kiện liên quan PUBG Asia Stars 2026. Trang không do PUBG, KRAFTON, đơn vị tổ chức giải, Himass hoặc TanVuu vận hành hay xác nhận.", en: "Justice for PUBG VN is an independent account and commentary site about events surrounding PUBG Asia Stars 2026. It is not operated or endorsed by PUBG, KRAFTON, the tournament organizer, Himass, or TanVuu." },
      { vi: "Tên giải đấu, nhãn hiệu và tên đội tuyển được dùng để nhận diện đối tượng được đề cập. Quan điểm và lời kêu gọi trên trang là của dự án này.", en: "Tournament names, trademarks, and team names identify the subjects discussed. Views and calls to action on this site belong to this project." },
    ],
  },
  {
    id: "sources", number: "02", title: { vi: "Nguồn và độ chính xác", en: "Sources and accuracy" },
    paragraphs: [
      { vi: "Dòng thời gian dẫn đến thông báo của PUBG, điều lệ giải và tài liệu lưu tại trang Nguồn. Các kết luận điều tra được ghi rõ là kết luận do PUBG công bố; trang này không có toàn bộ hồ sơ chứng cứ để xác minh độc lập từng nhận định.", en: "The timeline links to PUBG notices, tournament rules, and documents in the source archive. Investigation findings are attributed to PUBG; this site does not possess the full evidence file needed to verify each finding independently." },
      { vi: "Ảnh chụp do người dùng cung cấp được ghi nhãn riêng, kèm giới hạn về nguồn gốc và thời điểm. Nội dung có thể được sửa khi có tài liệu đáng tin cậy hơn; ngày và nội dung của nguồn gốc vẫn nên được người đọc kiểm tra trực tiếp.", en: "User-supplied screenshots are labeled separately, including limits on their origin and timing. Content may be corrected when stronger documentation becomes available; readers should check the dates and wording of original sources directly." },
    ],
  },
  {
    id: "media", number: "03", title: { vi: "Hình ảnh và bản quyền", en: "Images and copyright" },
    paragraphs: [
      { vi: "Ảnh chân dung trên hồ sơ tuyển thủ được lấy từ hồ sơ PUBG Esports; mỗi trang hồ sơ có liên kết đến tệp ảnh gốc. Ảnh chiến dịch ở trang đầu do người dùng cung cấp và được ghi rõ là hình minh họa. Tài liệu, hình ảnh và nhãn hiệu của bên thứ ba thuộc về chủ sở hữu tương ứng.", en: "Player portraits come from PUBG Esports profiles; each player page links to its original image file. The home page campaign visual was supplied by a user and is labeled as illustration. Third-party documents, images, and marks remain with their respective owners." },
      { vi: "Việc trích dẫn và liên kết nhằm giúp người đọc kiểm tra thông tin. Nếu bạn là chủ sở hữu quyền và cho rằng một nội dung cần được sửa hoặc gỡ, vui lòng liên hệ người vận hành trang qua kênh đã dùng để chia sẻ dự án này, kèm URL và thông tin chứng minh quyền liên quan.", en: "Excerpts and links help readers verify information. If you own rights to material that should be corrected or removed, contact the site operator through the channel used to share this project, including the URL and information establishing the relevant right." },
    ],
  },
  {
    id: "privacy", number: "04", title: { vi: "Quyền riêng tư", en: "Privacy" },
    paragraphs: [
      { vi: "Nút “Đồng hành cùng họ” lưu một cookie trong trình duyệt trong tối đa một năm để hạn chế đếm lặp. Máy chủ lưu tổng số lượt ủng hộ và địa chỉ IP đã ủng hộ để giới hạn một lượt cho mỗi IP; tính năng này không thu thập tên hoặc địa chỉ email. Ở lần truy cập đầu, trang chọn ngôn ngữ theo mã quốc gia dựa trên IP do Cloudflare cung cấp. Lựa chọn thủ công được lưu trong cookie của trình duyệt.", en: "The “Stand with them” button sets a browser cookie for up to one year to limit repeat counts. The server stores the total count and voting IP addresses to enforce one support per IP; this feature does not collect names or email addresses. On a first visit, the site selects a language using Cloudflare's IP-based country code. A manual choice is saved in a browser cookie." },
      { vi: "Cloudflare Turnstile kiểm tra lượt ủng hộ mới để hạn chế lưu lượng tự động. Máy chủ xác minh mã do Turnstile cấp với Cloudflare và không lưu mã này.", en: "Cloudflare Turnstile checks new support submissions for automated traffic. The server verifies the resulting token with Cloudflare and does not store it." },
      { vi: "Trang không tích hợp công cụ phân tích hành vi trong mã nguồn hiện tại. Khi mở liên kết ngoài, chính sách quyền riêng tư của trang đích sẽ áp dụng. Hạ tầng lưu trữ có thể xử lý nhật ký kết nối theo cấu hình của nhà cung cấp dịch vụ.", en: "The current site code does not include an analytics tool. External sites apply their own privacy policies when opened. Hosting infrastructure may process connection logs according to its provider configuration." },
    ],
  },
  {
    id: "corrections", number: "05", title: { vi: "Phản hồi và chỉnh sửa", en: "Responses and corrections" },
    paragraphs: [
      { vi: "Chúng tôi khuyến khích gửi tài liệu gốc, đường dẫn công khai và mốc thời gian cụ thể khi yêu cầu chỉnh sửa. Quan điểm của các bên liên quan cần được thể hiện đúng nguồn, đúng thời điểm và được cập nhật nếu có thông tin mới.", en: "Correction requests are most useful when they include primary documents, public links, and specific dates. Statements by involved parties should be attributed, dated, and updated when new information emerges." },
      { vi: "Nội dung này cung cấp thông tin về cách trang hoạt động; đây không phải tư vấn pháp lý hoặc tuyên bố thay mặt bất kỳ bên liên quan nào.", en: "This page explains how the site operates. It is not legal advice or a statement on behalf of any party involved." },
    ],
  },
] as const;

export default function LegalPage() {
  return <div className="interior-page legal-page">
    <InteriorHeader section="LEGAL / ABOUT" />
    <main>
      <section className="legal-hero"><div className="page-width"><p className="interior-kicker"><DualLanguage vi="MINH BẠCH" en="TRANSPARENCY" /> / 24.09.2026</p><h1><DualLanguage vi="THÔNG TIN PHÁP LÝ" en="LEGAL INFORMATION" /><span>.</span></h1><p><DualLanguage vi="Cách trang này sử dụng nguồn, hình ảnh và dữ liệu; cùng những giới hạn cần biết khi đọc hồ sơ vụ việc." en="How this site uses sources, images, and data, and the limits to keep in mind when reading the case file." /></p></div></section>
      <div className="legal-layout page-width"><aside className="legal-toc"><span><DualLanguage vi="TRÊN TRANG NÀY" en="ON THIS PAGE" /></span>{sections.map((section) => <LocalizedAnchor href={`#${section.id}`} key={section.id}><small>{section.number}</small><DualLanguage {...section.title} /></LocalizedAnchor>)}<LocalizedAnchor className="legal-source-link" href="/sources"><DualLanguage vi="KHO TÀI LIỆU ↗" en="SOURCE ARCHIVE ↗" /></LocalizedAnchor></aside><div className="legal-content">{sections.map((section) => <section id={section.id} className="legal-section" key={section.id}><span className="legal-section-number">{section.number} / 05</span><h2><DualLanguage {...section.title} /></h2>{section.paragraphs.map((paragraph, index) => <p key={index}><DualLanguage {...paragraph} /></p>)}{section.id === "privacy" && <p><a href="https://www.cloudflare.com/turnstile-privacy-policy/" target="_blank" rel="noopener noreferrer">Cloudflare Turnstile Privacy Addendum ↗</a></p>}</section>)}</div></div>
      <div className="legal-end page-width"><span>JUSTICE FOR PUBG VN / <DualLanguage vi="HỒ SƠ ĐỘC LẬP" en="INDEPENDENT CASE FILE" /></span><LocalizedAnchor href="/"><DualLanguage vi="← VỀ DÒNG THỜI GIAN" en="← BACK TO TIMELINE" /></LocalizedAnchor></div>
    </main>
  </div>;
}
