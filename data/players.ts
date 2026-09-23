export type Localized = { vi: string; en: string };

export type Player = {
  slug: "himass" | "tanvuu";
  name: string;
  fullName: string;
  team: string;
  number: string;
  image: string;
  imageSource: string;
  profileUrl: string;
  featureUrl: string;
  youtube: string;
  intro: Localized;
  bio: Localized[];
  highlights: { year: string; title: Localized; detail: Localized; source: string }[];
};

export const players: Record<Player["slug"], Player> = {
  himass: {
    slug: "himass",
    name: "Himass",
    fullName: "Lã Phương Tiến Đạt",
    team: "Anyone's Legend",
    number: "01",
    image: "/players/himass.png",
    imageSource: "https://wstatic-prod-boc.krafton.com/common/player/20260317/BcFuJ8zI/AL_Himass.png",
    profileUrl: "https://pubgesports.com/en/players/472",
    featureUrl: "https://pubgesports.com/en/news/10327",
    youtube: "https://www.youtube.com/@himass6999",
    intro: {
      vi: "Một trong những gương mặt tiêu biểu của PUBG Việt Nam, Himass ghi dấu bằng khả năng giao tranh và những màn trình diễn ở các sân khấu quốc tế.",
      en: "One of Vietnam's standout PUBG competitors, Himass has made his mark through decisive fights and performances on the international stage.",
    },
    bio: [
      {
        vi: "Lã Phương Tiến Đạt, được biết đến với tên thi đấu Himass, là tuyển thủ PUBG: BATTLEGROUNDS người Việt Nam. Hồ sơ PUBG Esports ghi nhận anh thi đấu cho Anyone's Legend trong mùa giải 2026; trước đó, anh từng cùng CERBERUS Esports vô địch PUBG Global Series 3 năm 2024.",
        en: "Lã Phương Tiến Đạt, known in competition as Himass, is a Vietnamese PUBG: BATTLEGROUNDS player. PUBG Esports records his 2026 appearances with Anyone's Legend; earlier, he won PUBG Global Series 3 with CERBERUS Esports in 2024.",
      },
      {
        vi: "Trong màu áo đội tuyển Việt Nam, anh góp mặt trong đội hình vô địch PUBG Nations Cup 2025 và được PUBG Esports ghi nhận là MVP của giải. Những cột mốc ấy lý giải vì sao quyết định liên quan đến anh tại PUBG Asia Stars 2026 thu hút sự quan tâm lớn. Trang này tách thành tích thi đấu khỏi phần tranh luận về vụ việc và dẫn độc giả đến hồ sơ nguồn để tự đối chiếu.",
        en: "Representing Vietnam, he was part of the PUBG Nations Cup 2025 championship roster and is listed by PUBG Esports as the tournament MVP. Those achievements help explain the attention surrounding the PUBG Asia Stars 2026 decision. This page keeps his competitive record separate from the case discussion and links to the underlying sources.",
      },
    ],
    highlights: [
      { year: "2024", title: { vi: "Vô địch PGS 3", en: "PGS 3 champion" }, detail: { vi: "Cùng CERBERUS Esports; MVP giải đấu theo hồ sơ PUBG Esports.", en: "With CERBERUS Esports; tournament MVP on his PUBG Esports profile." }, source: "https://pubgesports.com/en/news/7407" },
      { year: "2025", title: { vi: "Vô địch PNC", en: "PNC champion" }, detail: { vi: "Thành viên đội tuyển Việt Nam vô địch và MVP PUBG Nations Cup 2025.", en: "Vietnam's title winning roster and PUBG Nations Cup 2025 MVP." }, source: "https://pubgesports.com/en/news/8985" },
    ],
  },
  tanvuu: {
    slug: "tanvuu",
    name: "TanVuu",
    fullName: "Trần Tấn Vũ",
    team: "The Expendables",
    number: "02",
    image: "/players/tanvuu.png",
    imageSource: "https://wstatic-prod-boc.krafton.com/common/player/20260317/cly0cpqS/TE_TanVuu.png",
    profileUrl: "https://pubgesports.com/en/players/1070",
    featureUrl: "https://pubgesports.com/en/news/10327",
    youtube: "https://www.youtube.com/@TanVuu",
    intro: {
      vi: "Từ chức vô địch thế giới cùng The Expendables đến chiếc cúp quốc gia của Việt Nam, TanVuu đã góp mặt trong hai cột mốc lớn của PUBG Esports.",
      en: "From a world title with The Expendables to Vietnam's Nations Cup trophy, TanVuu has helped shape two major PUBG Esports milestones.",
    },
    bio: [
      {
        vi: "Trần Tấn Vũ, thi đấu với tên TanVuu, là tuyển thủ PUBG: BATTLEGROUNDS người Việt Nam gắn với The Expendables. Anh cùng đội vô địch PUBG Global Championship 2024, trước khi khoác áo tuyển Việt Nam trong hành trình vô địch PUBG Nations Cup 2025.",
        en: "Trần Tấn Vũ, competing as TanVuu, is a Vietnamese PUBG: BATTLEGROUNDS player associated with The Expendables. He won the PUBG Global Championship 2024 with the team, then represented Vietnam in its PUBG Nations Cup 2025 title run.",
      },
      {
        vi: "Bài giới thiệu PNC 2026 của PUBG Esports nêu bật bản năng sinh tồn và khả năng giao tranh của anh; tại PNC 2025, anh đứng đầu về tổng số mạng hạ gục và thứ hai về tổng thời gian sống sót theo bài viết này. Hồ sơ này ghi lại sự nghiệp công khai của TanVuu, đồng thời đặt diễn biến Asia Stars trong phần tài liệu riêng để người đọc có đủ bối cảnh.",
        en: "PUBG Esports' PNC 2026 preview highlighted his survival instincts and combat sense; it reported that he led PNC 2025 in total kills and placed second in total survival time. This profile records TanVuu's public competitive career and points readers to the separate Asia Stars case file for context.",
      },
    ],
    highlights: [
      { year: "2024", title: { vi: "Vô địch PGC", en: "PGC champion" }, detail: { vi: "Cùng The Expendables vô địch PUBG Global Championship 2024.", en: "Won the PUBG Global Championship 2024 with The Expendables." }, source: "https://pubgesports.com/en/news/8133" },
      { year: "2025", title: { vi: "Vô địch PNC", en: "PNC champion" }, detail: { vi: "Góp mặt trong đội tuyển Việt Nam vô địch PUBG Nations Cup 2025.", en: "Part of Vietnam's PUBG Nations Cup 2025 winning roster." }, source: "https://pubgesports.com/en/news/8985" },
    ],
  },
};
