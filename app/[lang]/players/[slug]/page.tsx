import type { Metadata } from "next";
import Image from "next/image";
import { UiIcon } from "@/components/ui-icon";
import { notFound } from "next/navigation";
import DualLanguage from "@/components/dual-language";
import InteriorHeader from "@/components/interior-header";
import LocalizedAnchor from "@/components/localized-anchor";
import { players, type Player } from "@/data/players";
import { isLanguage } from "@/lib/language";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() { return Object.keys(players).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) notFound();
  const player = players[slug as Player["slug"]];
  if (!player) notFound();
  return pageMetadata(lang, player.slug);
}

export default async function PlayerPage({ params }: Props) {
  const { slug } = await params;
  const player = players[slug as Player["slug"]];
  if (!player) notFound();
  const other = players[player.slug === "himass" ? "tanvuu" : "himass"];

  return <div className={`interior-page player-page player-page-${player.slug}`}>
    <InteriorHeader section="PLAYER PROFILE" />
    <main>
      <section className="player-hero">
        <div className="player-hero-grid page-width">
          <div className="player-hero-copy">
            <div className="player-breadcrumb"><LocalizedAnchor href="/players"><DualLanguage vi="TUYỂN THỦ" en="PLAYERS" /></LocalizedAnchor><span>/</span><span>{player.number}</span></div>
            <p className="interior-kicker"><DualLanguage vi="VIỆT NAM" en="VIETNAM" /> / PUBG ESPORTS</p>
            <h1>{player.name}<span>.</span></h1>
            <p className="player-real-name">{player.fullName} <span>/</span> {player.team}</p>
            <p className="player-intro"><DualLanguage {...player.intro} /></p>
            <div className="player-hero-actions"><LocalizedAnchor className="profile-primary" href="#biography"><DualLanguage vi="ĐỌC TIỂU SỬ" en="READ BIOGRAPHY" /> <UiIcon name="down" /></LocalizedAnchor><LocalizedAnchor className="profile-secondary" href={player.youtube} target="_blank" rel="noopener noreferrer">YOUTUBE ↗</LocalizedAnchor></div>
          </div>
          <div className="player-hero-visual"><span className="player-visual-number">{player.number}</span><Image src={player.image} alt={`${player.name} (${player.fullName})`} width={500} height={500} priority /><div className="player-visual-caption"><span><DualLanguage vi="ẢNH CHÂN DUNG TỪ PUBG ESPORTS" en="OFFICIAL PUBG ESPORTS PORTRAIT" /></span><LocalizedAnchor href={player.imageSource} target="_blank" rel="noopener noreferrer"><DualLanguage vi="NGUỒN ẢNH ↗" en="IMAGE SOURCE ↗" /></LocalizedAnchor></div></div>
        </div>
      </section>
      <section id="biography" className="player-biography page-width">
        <div className="player-section-heading"><p className="interior-kicker">01 / <DualLanguage vi="GIỚI THIỆU" en="INTRODUCTION" /></p><h2><DualLanguage vi="CON NGƯỜI PHÍA SAU TÊN THI ĐẤU" en="BEYOND THE GAMERTAG" /></h2></div>
        <div className="player-bio-text">{player.bio.map((paragraph, index) => <p key={index}><DualLanguage {...paragraph} /></p>)}<div className="player-bio-sources"><LocalizedAnchor href={player.profileUrl} target="_blank" rel="noopener noreferrer"><DualLanguage vi="HỒ SƠ PUBG ESPORTS" en="PUBG ESPORTS PROFILE" /> ↗</LocalizedAnchor><LocalizedAnchor href={player.featureUrl} target="_blank" rel="noopener noreferrer"><DualLanguage vi="BÀI GIỚI THIỆU PNC 2026" en="PNC 2026 PREVIEW" /> ↗</LocalizedAnchor></div></div>
      </section>
      <section className="player-achievements"><div className="page-width"><div className="player-section-heading"><p className="interior-kicker">02 / <DualLanguage vi="DẤU MỐC" en="MILESTONES" /></p><h2><DualLanguage vi="NHỮNG CỘT MỐC SỰ NGHIỆP" en="CAREER MILESTONES" /></h2></div><div className="player-milestones">{player.highlights.map((item) => <LocalizedAnchor href={item.source} target="_blank" rel="noopener noreferrer" className="player-milestone" key={item.year}><span>{item.year}</span><div><h3><DualLanguage {...item.title} /></h3><p><DualLanguage {...item.detail} /></p></div><UiIcon name="external" /></LocalizedAnchor>)}</div><p className="player-record-note"><DualLanguage vi="Các mốc trên dựa vào hồ sơ và thông báo của PUBG Esports. Liên kết mở tài liệu nguồn." en="These milestones are based on PUBG Esports profiles and announcements. Each item links to its source." /></p></div></section>
      <section className="player-connect page-width"><div><p className="interior-kicker">03 / <DualLanguage vi="KÊNH & HỒ SƠ" en="CHANNELS & PROFILES" /></p><h2><DualLanguage vi="THEO DÕI HÀNH TRÌNH" en="FOLLOW THE JOURNEY" /></h2><p><DualLanguage vi="Kênh YouTube được PUBG Esports liệt kê trong danh sách POV PNC 2026. Hồ sơ thi đấu dẫn đến trang thống kê chính thức." en="PUBG Esports lists this YouTube channel in its PNC 2026 POV directory. The competitive profile links to its official statistics page." /></p></div><div className="player-connect-links"><LocalizedAnchor href={player.youtube} target="_blank" rel="noopener noreferrer"><span>01</span><strong>YouTube</strong><UiIcon name="external" /></LocalizedAnchor><LocalizedAnchor href={player.profileUrl} target="_blank" rel="noopener noreferrer"><span>02</span><strong>PUBG Esports</strong><UiIcon name="external" /></LocalizedAnchor><LocalizedAnchor href="https://pubgesports.com/vi/news/10178" target="_blank" rel="noopener noreferrer"><span>03</span><strong><DualLanguage vi="DANH SÁCH KÊNH POV" en="POV CHANNEL DIRECTORY" /></strong><UiIcon name="external" /></LocalizedAnchor></div></section>
      <section className="player-case-link"><div className="page-width"><p className="interior-kicker"><DualLanguage vi="VỤ VIỆC" en="THE CASE" /> / 2026</p><h2><DualLanguage vi="HIỂU TOÀN BỘ BỐI CẢNH." en="SEE THE FULL CONTEXT." /></h2><p><DualLanguage vi="Dòng thời gian trình bày diễn biến PUBG Asia Stars 2026, các thông báo chính thức và giới hạn của tài liệu công khai." en="The timeline covers PUBG Asia Stars 2026, official announcements, and the limits of the public record." /></p><LocalizedAnchor href="/"><DualLanguage vi="XEM DÒNG THỜI GIAN" en="EXPLORE THE TIMELINE" /> ↗</LocalizedAnchor></div></section>
    </main>
    <footer className="interior-footer page-width"><LocalizedAnchor href={`/players/${other.slug}`}>← {other.name}</LocalizedAnchor><LocalizedAnchor href="/players"><DualLanguage vi="TẤT CẢ TUYỂN THỦ" en="ALL PLAYERS" /></LocalizedAnchor><LocalizedAnchor href="/legal"><DualLanguage vi="PHÁP LÝ" en="LEGAL" /></LocalizedAnchor></footer>
  </div>;
}
