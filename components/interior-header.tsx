import LanguageSelector from "@/components/language-selector";
import DualLanguage from "@/components/dual-language";
import LocalizedAnchor from "@/components/localized-anchor";

export default function InteriorHeader({ section }: { section: string }) {
  return <header className="interior-header">
    <LocalizedAnchor className="wordmark" href="/" aria-label="Justice for PUBG VN">
      <span className="wordmark-main">JUSTICE<span>FORPUBGVN</span></span>
      <span className="wordmark-sub"><DualLanguage vi={section} en={section} /></span>
    </LocalizedAnchor>
    <span id="interior-navigation-label" className="sr-only"><DualLanguage vi="Điều hướng chính" en="Main navigation" /></span>
    <nav className="interior-nav" aria-labelledby="interior-navigation-label">
      <LocalizedAnchor href="/"><DualLanguage vi="DÒNG THỜI GIAN" en="TIMELINE" /></LocalizedAnchor>
      <LocalizedAnchor href="/players"><DualLanguage vi="TUYỂN THỦ" en="PLAYERS" /></LocalizedAnchor>
      <LocalizedAnchor href="/sources"><DualLanguage vi="TÀI LIỆU" en="SOURCES" /></LocalizedAnchor>
      <LocalizedAnchor href="/legal"><DualLanguage vi="PHÁP LÝ" en="LEGAL" /></LocalizedAnchor>
    </nav>
    <LanguageSelector />
  </header>;
}
