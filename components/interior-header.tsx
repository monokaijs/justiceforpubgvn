import ArchiveLanguageSwitch from "@/components/archive-language-switch";
import DualLanguage from "@/components/dual-language";

export default function InteriorHeader({ section }: { section: string }) {
  return <header className="interior-header">
    <a className="wordmark" href="/" aria-label="Justice for PUBG VN">
      <span className="wordmark-main">JUSTICE<span>FORPUBGVN</span></span>
      <span className="wordmark-sub"><DualLanguage vi={section} en={section} /></span>
    </a>
    <nav className="interior-nav" aria-label="Main navigation">
      <a href="/"><DualLanguage vi="DÒNG THỜI GIAN" en="TIMELINE" /></a>
      <a href="/players"><DualLanguage vi="TUYỂN THỦ" en="PLAYERS" /></a>
      <a href="/sources"><DualLanguage vi="TÀI LIỆU" en="SOURCES" /></a>
      <a href="/legal"><DualLanguage vi="PHÁP LÝ" en="LEGAL" /></a>
    </nav>
    <ArchiveLanguageSwitch />
  </header>;
}
