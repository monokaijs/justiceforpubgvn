import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import DualLanguage from "@/components/dual-language";
import InteriorHeader from "@/components/interior-header";
import LocalizedAnchor from "@/components/localized-anchor";
import { players } from "@/data/players";
import { isLanguage } from "@/lib/language";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return pageMetadata(lang, "players");
}

export default function PlayersPage() {
  return <div className="interior-page player-index">
    <InteriorHeader section="PLAYER PROFILES" />
    <main>
      <section className="index-intro page-width">
        <p className="interior-kicker">01 / <DualLanguage vi="TUYỂN THỦ" en="THE PLAYERS" /></p>
        <h1><DualLanguage vi="HAI TUYỂN THỦ. HAI HÀNH TRÌNH." en="TWO PLAYERS. TWO JOURNEYS." /></h1>
        <p><DualLanguage vi="Đằng sau những cái tên trong dòng thời gian là hai sự nghiệp thi đấu với những cột mốc đáng ghi nhận. Khám phá hồ sơ và nguồn công khai của từng tuyển thủ." en="Behind the names in the timeline are two competitive careers with milestones worth understanding. Explore each player's profile and public sources." /></p>
      </section>
      <section className="player-index-grid page-width" aria-label="Player profiles / Hồ sơ tuyển thủ">
        {Object.values(players).map((player) => <LocalizedAnchor className={`player-index-card player-index-card-${player.slug}`} href={`/players/${player.slug}`} key={player.slug}>
          <div className="player-index-art"><span className="player-index-watermark">{player.number}</span><Image src={player.image} alt={`${player.name} portrait from PUBG Esports`} width={500} height={500} priority /></div>
          <div className="player-index-content"><span><DualLanguage vi="VIỆT NAM" en="VIETNAM" /> / PUBG ESPORTS</span><h2>{player.name}</h2><p>{player.fullName} · {player.team}</p><strong><DualLanguage vi="XEM HỒ SƠ" en="VIEW PROFILE" /> <span aria-hidden="true">↗</span></strong></div>
        </LocalizedAnchor>)}
      </section>
      <div className="index-bottom page-width"><LocalizedAnchor href="/"><DualLanguage vi="← VỀ DÒNG THỜI GIAN" en="← BACK TO TIMELINE" /></LocalizedAnchor><LocalizedAnchor href="/legal"><DualLanguage vi="THÔNG TIN PHÁP LÝ ↗" en="LEGAL INFORMATION ↗" /></LocalizedAnchor></div>
    </main>
  </div>;
}
