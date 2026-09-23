import type { Metadata } from "next";
import Image from "next/image";
import DualLanguage from "@/components/dual-language";
import InteriorHeader from "@/components/interior-header";
import { players } from "@/data/players";

export const metadata: Metadata = {
  title: "Himass & TanVuu | Justice for PUBG VN",
  description: "Hồ sơ Himass và TanVuu: sự nghiệp, thành tích, hình ảnh và liên kết kênh được PUBG Esports công bố.",
};

export default function PlayersPage() {
  return <div className="interior-page player-index">
    <InteriorHeader section="PLAYER PROFILES" />
    <main>
      <section className="index-intro page-width">
        <p className="interior-kicker">01 / THE PLAYERS</p>
        <h1><DualLanguage vi="HAI TUYỂN THỦ. HAI HÀNH TRÌNH." en="TWO PLAYERS. TWO JOURNEYS." /></h1>
        <p><DualLanguage vi="Đằng sau những cái tên trong dòng thời gian là hai sự nghiệp thi đấu với những cột mốc đáng ghi nhận. Khám phá hồ sơ và nguồn công khai của từng tuyển thủ." en="Behind the names in the timeline are two competitive careers with milestones worth understanding. Explore each player's profile and public sources." /></p>
      </section>
      <section className="player-index-grid page-width" aria-label="Player profiles">
        {Object.values(players).map((player) => <a className={`player-index-card player-index-card-${player.slug}`} href={`/players/${player.slug}`} key={player.slug}>
          <div className="player-index-art"><span className="player-index-watermark">{player.number}</span><Image src={player.image} alt={`${player.name} portrait from PUBG Esports`} width={500} height={500} priority /></div>
          <div className="player-index-content"><span>VIETNAM / PUBG ESPORTS</span><h2>{player.name}</h2><p>{player.fullName} · {player.team}</p><strong><DualLanguage vi="XEM HỒ SƠ" en="VIEW PROFILE" /> <span aria-hidden="true">↗</span></strong></div>
        </a>)}
      </section>
      <div className="index-bottom page-width"><a href="/"><DualLanguage vi="← VỀ DÒNG THỜI GIAN" en="← BACK TO TIMELINE" /></a><a href="/legal"><DualLanguage vi="THÔNG TIN PHÁP LÝ ↗" en="LEGAL INFORMATION ↗" /></a></div>
    </main>
  </div>;
}
