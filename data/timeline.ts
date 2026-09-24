import type { Language } from "@/lib/language";
export type { Language } from "@/lib/language";
export type Localized = Record<"vi" | "en", string>;
export type Category = "event" | "finding" | "action" | "context";

export const sources = {
  preliminary: {
    label: "Kakao PUBG notice · 19 Sep (Korean)",
    url: "https://bbs-pubg.kakaogames.com/gaia/do/pubg/notice/read?articleId=4372&bbsId=PN001&pageIndex=1",
    kind: "official",
  },
  additional: {
    label: "Kakao PUBG notice · 20 Sep (Korean)",
    url: "https://bbs-pubg.kakaogames.com/gaia/do/pubg/notice/read?articleId=4373&bbsId=PN001&objCate1=223&pageIndex=1",
    kind: "official",
  },
  rulebook: {
    label: "Tournament rulebook (public mirror)",
    url: "https://liquipedia.net/commons/File:PUBG_ASIA_STARS_2026_Rulebook.pdf",
    kind: "mirror",
  },
  findingsVi: {
    label: "PUBG investigation results · 23 Sep (Vietnamese)",
    url: "https://pubg.com/vi/news/11155",
    kind: "official",
  },
  findingsKo: {
    label: "PUBG investigation results · 23 Sep (Korean)",
    url: "https://www.pubg.com/ko/news/11155",
    kind: "official",
  },
  eventNotice: {
    label: "PUBG Asia Stars event schedule · 11 Sep (Vietnamese)",
    url: "https://pubg.com/vi/events/notice/10926",
    kind: "official",
  },
  apology: {
    label: "KRAFTON apology · 21 Sep (Korean)",
    url: "https://bbs-pubg.kakaogames.com/gaia/do/pubg/competition/read?articleId=4375&bbsId=PN001&objCate1=223&pageIndex=1",
    kind: "official",
  },
  dayOneReport: {
    label: "Hoa Học Trò · 21 Sep (Vietnamese)",
    url: "https://hoahoctro.tienphong.vn/toan-canh-vu-2-tuyen-thu-pubg-viet-nam-duoc-cho-la-bi-xu-ep-khien-cong-dong-game-thu-phan-no-post1878133.tpo",
    kind: "report",
  },
  chipReport: {
    label: "Sforum · 21 Sep (Vietnamese)",
    url: "https://cellphones.com.vn/sforum/pubg-asia-stars-2026-drama-da-stream",
    kind: "report",
  },
  initialReport: {
    label: "Inven · 19 Sep (Korean)",
    url: "https://www.inven.co.kr/webzine/news/?news=321194",
    kind: "report",
  },
  teamResponse: {
    label: "VTC News · 23 Sep (Vietnamese)",
    url: "https://vtcnews.vn/hai-tuyen-thu-pubg-viet-nam-bi-cam-thi-dau-vinh-vien-don-vi-chu-quan-len-tieng-ar1041456.html",
    kind: "report",
  },
} as const;

export type SourceKey = keyof typeof sources;

export interface TimelineEvent {
  id: string;
  date: string;
  day: string;
  month: string;
  category: Category;
  title: Localized;
  description: Localized;
  response: Localized;
  explanation: Localized;
  additional?: { heading: Localized; text: Localized }[];
  label: Localized;
  sources: SourceKey[];
}

export const timeline: TimelineEvent[] = [
  {
    id: "day-one",
    date: "2026-09-17",
    day: "17",
    month: "SEP",
    category: "event",
    label: { vi: "Ngày thi đấu 01", en: "Competition day 01" },
    title: { vi: "Day 1 diễn ra", en: "Day 1 takes place" },
    description: {
      vi: "Tranh cãi bùng lên sau Day 1 khi Soopi phàn nàn việc đội Việt Nam phá chip hồi sinh và nghi ngờ họ đã theo dõi livestream để lấy thông tin (stream sniping). PUBG sau đó nói Himass và TanVuu đã kiểm tra thông tin ngoài game qua nội dung stream cá nhân trong ngày thi đấu này.",
      en: "The dispute grew after Day 1 when Soopi complained that the Vietnamese team destroyed a revive chip and suspected they had watched a livestream for information (stream sniping). PUBG later said Himass and TanVuu checked out-of-game information through personal stream content that day.",
    },
    response: {
      vi: "Ảnh trích từ livestream liên quan Soopi cho thấy cô chuyển ứng dụng và xem stream giải đấu trên SOOP. Việc xem stream được ghi lại rõ; riêng ảnh tĩnh không cho thấy cô có dùng thông tin đó để quyết định chiến thuật trong trận hay không.",
      en: "Stills from Soopi-related livestream footage show her switching applications and watching the tournament stream on SOOP. The viewing is visible; the stills alone do not show whether she used that information for tactical decisions in a match.",
    },
    explanation: {
      vi: "Đây là ngày phát sinh sự việc, không phải ngày PUBG đưa ra kết luận cuối cùng. Thông báo ngày 23/09 nói các nghi vấn tương tự với người khác đã được kiểm tra nhưng không phát hiện thêm vi phạm cần chế tài.",
      en: "This is when the issue arose, not when PUBG reached its final finding. The September 23 notice says similar allegations involving others were reviewed, with no additional violations requiring sanctions found.",
    },
    additional: [
      {
        heading: { vi: "Khởi đầu tranh cãi", en: "How the dispute began" },
        text: { vi: "PUBG Asia Stars quy tụ tuyển thủ và streamer từ sáu khu vực. Soopi phàn nàn việc đội Việt Nam phá chip — lấy và hủy chip của người bị hạ để ngăn đồng đội hồi sinh — và nghi ngờ họ xem stream để biết thông tin. Đây là lời phàn nàn và nghi vấn mở đầu tranh cãi, cần đọc riêng với kết luận PUBG công bố ngày 23/09.", en: "PUBG Asia Stars brought together players and streamers from six regions. Soopi complained that the Vietnamese team destroyed a chip taken from a downed player, preventing a teammate from reviving them, and suspected they watched a stream for information. Her initial complaint is distinct from PUBG's September 23 finding." },
      },
      {
        heading: { vi: "Mốc thời gian", en: "Date of the event" },
        text: { vi: "Ngày 17/09 là ngày thi đấu liên quan; các bài đăng, ảnh và kết luận về vụ việc xuất hiện vào những ngày sau đó.", en: "September 17 is the date of the relevant play. Posts, images and findings about it appeared on later dates." },
      },
    ],
    sources: ["eventNotice", "dayOneReport", "chipReport", "findingsVi"],
  },
  {
    id: "initial-removal",
    date: "2026-09-19",
    day: "19",
    month: "SEP",
    category: "action",
    label: { vi: "Quyết định ban đầu", en: "Initial decision" },
    title: { vi: "Himass và TanVuu bị loại khỏi giải đấu", en: "Himass and TanVuu are removed from the event" },
    description: {
      vi: "Trong thông báo ngày 19/09 do Kakao PUBG đăng lại từ KRAFTON, ban tổ chức quyết định loại hai người khỏi các trận còn lại và nói sẽ tiếp tục điều tra sự việc.",
      en: "In a September 19 notice reposted by Kakao PUBG from KRAFTON, organizers removed both players from the remaining matches and said the investigation would continue.",
    },
    response: {
      vi: "Thông báo này thừa nhận ban tổ chức chưa cụ thể hóa đủ tiêu chuẩn vận hành để bảo đảm công bằng. KRAFTON nói việc loại hai người là biện pháp có thể áp dụng ngay, không có nghĩa cuộc điều tra đã kết thúc.",
      en: "The notice acknowledged that organizers had not specified fairness standards clearly enough. KRAFTON described removal as an immediate operational step, not the end of the investigation.",
    },
    explanation: {
      vi: "Cần tách quyết định loại khỏi lịch còn lại ngày 19/09 khỏi chế tài vĩnh viễn được công bố sau cuộc điều tra ngày 23/09.",
      en: "The September 19 removal from the remaining schedule is distinct from the permanent sanctions announced after the September 23 investigation.",
    },
    additional: [
      {
        heading: { vi: "Lời giải thích của tuyển thủ", en: "The players' reported explanation" },
        text: { vi: "Inven thuật lại rằng trong lời xin lỗi, hai tuyển thủ nói họ đã mở chat livestream cá nhân, nhận thông tin từ người xem và hiểu rằng điều lệ khi ấy chưa cấm rõ tình huống này. Đây là lời giải thích được báo dẫn lại, không phải kết luận điều tra của KRAFTON.", en: "Inven reports that the players said in their apologies that they had kept their personal livestream chats open, received information from viewers and understood the rules not to expressly prohibit that situation. This is their reported account, not KRAFTON's finding." },
      },
      {
        heading: { vi: "Phản ứng từ đội Hàn Quốc", en: "Korean team's response" },
        text: { vi: "Đội Hàn Quốc không tham dự Day 2. KRAFTON sau đó thừa nhận đã gọi việc phía Hàn Quốc dự định tẩy chay là ‘rút lui’ và truyền đạt thiếu nhất quán giữa các bên, các ngôn ngữ.", en: "The Korean team did not take part in Day 2. KRAFTON later acknowledged describing the Korean side's planned boycott as a 'withdrawal' and communicating inconsistently across parties and languages." },
      },
    ],
    sources: ["preliminary", "initialReport", "apology"],
  },
  {
    id: "additional-notice",
    date: "2026-09-20",
    day: "20",
    month: "SEP",
    category: "finding",
    label: { vi: "Thông báo chính thức", en: "Official notice" },
    title: { vi: "PUBG công bố kết quả xác minh ban đầu", en: "PUBG publishes its initial findings" },
    description: {
      vi: "PUBG xác nhận việc kiểm tra thông tin ngoài game qua nội dung stream cá nhân. Họ cho biết vẫn đang xem xét liệu hai người có trực tiếp xem stream người tham gia khác và liệu thông tin đó có được sử dụng khi thi đấu hay không.",
      en: "PUBG confirms that out-of-game information was checked through personal stream content. It says it is still reviewing whether the two directly watched another participant’s stream and whether any information was used in play.",
    },
    response: {
      vi: "PUBG xin lỗi vì đã truyền đạt nội dung chưa được xác minh đầy đủ quá sớm trước Day 2, rồi lại chia sẻ tiến độ quá chậm. Họ nói sẽ phân biệt rõ điều đã xác nhận với điều còn điều tra.",
      en: "PUBG apologized for communicating unverified information too early before Day 2, then providing updates too slowly. It said it would distinguish confirmed facts from matters still under investigation.",
    },
    explanation: {
      vi: "Trạng thái ‘đang xem xét’ chỉ mô tả ngày 20/09. PUBG công bố kết luận mới hơn vào ngày 23/09; không nên dùng mốc cũ như trạng thái hiện tại.",
      en: "The 'under review' status describes September 20 only. PUBG issued later findings on September 23, so this older milestone should not be read as the current status.",
    },
    additional: [
      { heading: { vi: "Điều đã xác nhận và điều còn mở", en: "Confirmed and still under review" }, text: { vi: "KRAFTON xác nhận hai người đã tiếp nhận thông tin ngoài game qua nội dung phát sóng cá nhân. Tại thời điểm thông báo, hãng vẫn kiểm tra liệu họ có trực tiếp xem stream người khác và dùng thông tin đó trong trận hay không.", en: "KRAFTON confirmed the players had received out-of-game information through personal broadcast content. At the time of this notice, it was still checking whether they directly watched another participant's stream and used that information in play." } },
    ],
    sources: ["additional"],
  },
  {
    id: "actions",
    date: "2026-09-20",
    day: "20",
    month: "SEP",
    category: "action",
    label: { vi: "Biện pháp xử lý", en: "Corrective actions" },
    title: { vi: "Các biện pháp xử lý được công bố", en: "Corrective actions are announced" },
    description: {
      vi: "Theo PUBG, Himass và TanVuu bị loại khỏi phần còn lại của giải, một số điểm số liên quan được điều chỉnh, stream delay và giám sát được tăng cường, và tư cách PUBG Vietnam Partner của hai người bị thu hồi.",
      en: "PUBG says Himass and TanVuu were removed from the remaining event, some related scores were adjusted, stream delay and monitoring were increased, and their PUBG Vietnam Partner status was revoked.",
    },
    response: {
      vi: "KRAFTON cũng nhận trách nhiệm về việc chuẩn bị tiêu chuẩn công bằng và triển khai các biện pháp phòng ngừa chưa đầy đủ trước đó. Việc thêm delay và giám sát là phần sửa cách vận hành, tách với xử lý cá nhân.",
      en: "KRAFTON also accepted responsibility for insufficiently defined fairness standards and safeguards. Adding delay and monitoring addressed event operations separately from the actions against individuals.",
    },
    explanation: {
      vi: "Mốc này tổng hợp nhiều biện pháp, trong đó việc loại khỏi phần còn lại đã được nêu từ thông báo 19/09. Các chế tài vĩnh viễn chỉ được công bố ngày 23/09.",
      en: "This milestone groups several operational measures; removal from the remaining matches had already been announced on September 19. Permanent sanctions came on September 23.",
    },
    additional: [
      { heading: { vi: "Phạm vi từng biện pháp", en: "Scope of each measure" }, text: { vi: "Thay người thi đấu, điều chỉnh điểm, tăng độ trễ phát sóng và giám sát là các thay đổi đối với sự kiện. Thu hồi tư cách PUBG Vietnam Partner là xử lý riêng đối với hai người. Những biện pháp này có phạm vi khác với án cấm toàn bộ giải chính thức được công bố ngày 23/09.", en: "Player substitutions, score changes, added broadcast delay and monitoring affected event operations. Revoking PUBG Vietnam Partner status affected the two players personally. These measures differ in scope from the ban across official events announced on September 23." } },
      { heading: { vi: "Ngày công bố", en: "Announcement date" }, text: { vi: "Thông báo ngày 20/09 tổng hợp các biện pháp đã triển khai; không khẳng định tất cả bắt đầu có hiệu lực trong ngày đó.", en: "The September 20 notice summarized measures already taken; it does not establish that all of them first took effect that day." } },
    ],
    sources: ["additional"],
  },
  {
    id: "rulebook",
    date: "2026-09-20",
    day: "20",
    month: "SEP",
    category: "context",
    label: { vi: "Bối cảnh điều luật", en: "Rulebook context" },
    title: { vi: "PUBG giải thích giới hạn của rulebook", en: "PUBG explains the rulebook gap" },
    description: {
      vi: "PUBG nói rulebook có các nghĩa vụ chung về công bằng và tinh thần thể thao, nhưng chưa định nghĩa cụ thể hoặc tách riêng chế tài cho việc nhận thông tin qua chat, xem stream người tham gia khác, hay nhận và sử dụng thông tin ngoài game.",
      en: "PUBG says the rulebook contained general fairness and sportsmanship duties, but did not specifically define or separately sanction receiving information via live chat, watching another participant’s stream, or receiving and using out-of-game information.",
    },
    response: {
      vi: "Lập luận được nêu trong quá trình điều tra là một số người hiểu hành vi này được cho phép do tính chất giải giao hữu hoặc từ hướng dẫn trước đó. KRAFTON nói họ chưa từng chính thức cho phép xem stream hoặc dùng thông tin ngoài game khi thi đấu.",
      en: "A position raised during the investigation was that the event format or earlier guidance made this conduct seem permitted. KRAFTON says it never officially allowed watching another participant's stream or using external information in play.",
    },
    explanation: {
      vi: "‘Rulebook chưa đủ cụ thể’ không đồng nghĩa với ‘không có quy định nào’. Nó là một phần trách nhiệm vận hành mà KRAFTON thừa nhận, song KRAFTON vẫn áp dụng chính sách vận hành của trò chơi và nghĩa vụ của tuyển thủ chuyên nghiệp.",
      en: "An insufficiently specific rulebook does not mean there were no rules. KRAFTON acknowledged an operational failure while also applying the game's conduct policy and professional player duties.",
    },
    additional: [
      { heading: { vi: "Điều lệ ghi gì?", en: "What the rulebook says" }, text: { vi: "§3.7 khuyến nghị người chơi cài độ trễ cho livestream cá nhân. §1 trao quyền cho ban tổ chức xử lý vấn đề chưa được quy định rõ; §4.1 yêu cầu người tham gia theo dõi thông báo Discord và tuân thủ quy định bổ sung. Riêng câu về độ trễ không đủ để kết luận hành vi xem stream đối thủ được phép.", en: "Section 3.7 recommends a delay for personal livestreams. Section 1 gives organizers authority over matters not expressly covered; section 4.1 requires participants to follow Discord notices and supplementary rules. The delay clause alone does not establish permission to watch an opponent's stream." } },
      { heading: { vi: "Hướng dẫn trước giải", en: "Pre-event guidance" }, text: { vi: "Bản điều lệ lưu tại đây ghi ngày 14/09/2026, nhưng ngày trên bìa chưa cho biết từng tuyển thủ nhận tài liệu hoặc hướng dẫn Discord khi nào. Cần đối chiếu các hướng dẫn thực tế trước giải và cách ban tổ chức cân nhắc thiếu sót của mình khi chọn chế tài.", en: "The archived rulebook is dated September 14, 2026, but its cover does not show when each player received it or any Discord guidance. The actual pre-event guidance and how organizers weighed their own omissions against the sanction still need to be examined." } },
      { heading: { vi: "Cập nhật 21/09", en: "September 21 update" }, text: { vi: "Trong lời xin lỗi ngày 21/09, KRAFTON nhận chưa chuẩn bị đủ biện pháp phòng ngừa, tiêu chí đánh giá và mức xử lý; hãng cũng nhận thông báo tiếng Hàn và tiếng Việt thiếu nhất quán. Đồng thời, hãng nói đã xác nhận hành vi của hai người và đang tiến hành kỷ luật.", en: "In its September 21 apology, KRAFTON acknowledged inadequate safeguards, assessment criteria and sanction levels, as well as inconsistent Korean and Vietnamese notices. It also said the players' conduct had been confirmed and disciplinary proceedings were underway." } },
    ],
    sources: ["additional", "rulebook", "apology", "findingsVi"],
  },
  {
    id: "cancellation",
    date: "2026-09-20",
    day: "20",
    month: "SEP",
    category: "action",
    label: { vi: "Thay đổi lịch thi đấu", en: "Schedule change" },
    title: { vi: "Day 3 bị hủy", en: "Day 3 is canceled" },
    description: {
      vi: "PUBG quyết định không tổ chức Day 3 vì cho rằng không thể tiếp tục trong điều kiện tin cậy và công bằng như dự kiến. Giải thưởng được chia theo cùng một tiêu chuẩn cho các khu vực tham gia thay vì chốt xếp hạng cuối cùng.",
      en: "PUBG cancels Day 3, saying the event could not continue under the intended conditions of trust and fairness. Prize money would be distributed under the same standard across participating regions instead of finalizing standings.",
    },
    response: {
      vi: "Quyết định hủy là phản hồi của ban tổ chức với tình trạng tin cậy của toàn giải, không tự nó chứng minh mọi khu vực hoặc mọi người chơi đều có vi phạm.",
      en: "Cancellation was the organizer's response to the event-wide loss of trust; it did not itself establish misconduct by every region or participant.",
    },
    explanation: {
      vi: "Vì Day 3 không diễn ra, kết quả chung cuộc không được chốt theo cách dự kiến. Cách phân bổ thưởng được thay đổi để không dựa vào thứ hạng cuối chưa thể xác định.",
      en: "Because Day 3 was not played, the planned final standings could not be completed. Prize distribution changed so it did not rely on an unfinished final ranking.",
    },
    additional: [
      { heading: { vi: "Giải đấu và cuộc điều tra", en: "The event and the investigation" }, text: { vi: "Việc hủy ngày thi đấu cuối khép lại lịch thi đấu, nhưng KRAFTON tiếp tục xem xét hồ sơ và chỉ công bố kết luận, chế tài sau đó. Quyết định hủy không xác lập vi phạm của mọi người tham gia.", en: "Cancelling the final competition day ended the match schedule, while KRAFTON continued reviewing the case and announced findings and sanctions later. Cancellation did not establish wrongdoing by every participant." } },
    ],
    sources: ["additional"],
  },
  {
    id: "follow-up",
    date: "2026-09-20",
    day: "20",
    month: "SEP",
    category: "finding",
    label: { vi: "Theo dõi tiếp", en: "Follow-up review" },
    title: { vi: "Những câu hỏi còn được xem xét", en: "Questions remain under review" },
    description: {
      vi: "Trong thông báo ngày 20/09, PUBG nói sẽ tiếp tục xem video sự kiện, POV stream, team voice, việc truyền và nhận thông tin ngoài game, khả năng sử dụng thông tin đó, cùng các cáo buộc liên quan khác.",
      en: "In its September 20 notice, PUBG says it will continue reviewing event footage, stream POVs, team voice, the transmission of out-of-game information, whether it was used, and other related allegations.",
    },
    response: {
      vi: "Việc tiếp tục xem nhiều loại tư liệu cho thấy ban tổ chức khi đó chưa coi các ảnh, đoạn clip hay nội dung chat riêng lẻ là toàn bộ hồ sơ sự việc.",
      en: "The stated review of multiple types of material shows the organizer did not treat a single image, clip, or chat excerpt as the whole case record at that point.",
    },
    explanation: {
      vi: "Mốc này ghi lại giai đoạn điều tra đang mở. Kết quả được công bố ngày 23/09 cho Himass và TanVuu; PUBG nói cũng đã rà soát cáo buộc tương tự với người khác theo cùng tiêu chuẩn.",
      en: "This records the open investigation stage. Findings for Himass and TanVuu were announced on September 23; PUBG also says it reviewed similar allegations involving others using the same standard.",
    },
    additional: [
      { heading: { vi: "Cùng câu hỏi cho mọi trường hợp", en: "The same questions for every case" }, text: { vi: "Cần xác định hành vi xảy ra trước, trong hay sau trận; thông tin nào được nhận hoặc chia sẻ; và thông tin đó có được dùng trong quyết định thi đấu hay không. KRAFTON nói đã đối chiếu video sự kiện, góc nhìn người chơi và trao đổi trong đội.", en: "The review needs to establish whether conduct occurred before, during or after a match; what information was received or shared; and whether it affected decisions in play. KRAFTON said it compared event footage, player viewpoints and team communications." } },
      { heading: { vi: "Điều ảnh liên quan Soopi xác nhận", en: "What the Soopi-related stills show" }, text: { vi: "Ảnh trích từ livestream cho thấy Soopi đã mở và xem stream giải đấu trên SOOP; ảnh chuyển ứng dụng còn hiển thị sảnh chờ Day 1 R4. Đây là bằng chứng trực quan về việc xem livestream. Ảnh không cho thấy việc áp dụng thông tin vào chiến thuật trong trận. Ngày 23/09, PUBG nói đã xem xét nghi vấn tương tự với người khác và không thấy thêm vi phạm cần xử phạt; đoạn này không nêu tên Soopi.", en: "Stills from the livestream show Soopi opening and watching the tournament stream on SOOP; the app switcher also shows the Day 1 R4 lobby. They directly establish livestream viewing. They do not show information being applied to in-match tactics. On September 23, PUBG said it reviewed similar allegations involving others and found no further sanctionable violation; that passage does not name Soopi." } },
    ],
    sources: ["additional", "findingsVi"],
  },
  {
    id: "findings-september-23",
    date: "2026-09-23",
    day: "23",
    month: "SEP",
    category: "finding",
    label: { vi: "Kết quả điều tra", en: "Investigation findings" },
    title: { vi: "PUBG công bố kết luận điều tra", en: "PUBG publishes its investigation findings" },
    description: {
      vi: "Sau khi xem livestream, video người tham gia, dữ liệu trong game và replay, PUBG kết luận Himass và TanVuu đã sử dụng thông tin ngoài game và xem livestream người chơi khác để đưa ra nhận định, áp dụng vào chiến thuật. Đây là kết luận mới hơn thông báo ngày 20/09.",
      en: "After reviewing broadcasts, participant footage, in-game data and replays, PUBG concluded that Himass and TanVuu used out-of-game information and another participant’s stream to inform gameplay decisions. This supersedes the questions left open in the September 20 notice.",
    },
    response: {
      vi: "Một lập luận được nêu là hành vi này đã được hiểu là cho phép trong giải giao hữu. KRAFTON bác bỏ việc từng chính thức cho phép và khẳng định không áp dụng tiêu chuẩn khác nhau giữa các khu vực.",
      en: "One argument raised was that the conduct was understood to be permitted in a showmatch. KRAFTON denied ever officially permitting it and said it did not apply different standards across regions.",
    },
    explanation: {
      vi: "PUBG nói đã xem xét nghi vấn tương tự đối với người tham gia khác nhưng không tìm thấy thêm vi phạm đến mức cần chế tài. Hai ảnh đính kèm là tư liệu do người dùng cung cấp và không thay thế kết quả điều tra đó.",
      en: "PUBG says it reviewed similar allegations involving others but found no additional violations requiring sanctions. The two attached images are user-supplied material and do not replace that investigation result.",
    },
    additional: [
      { heading: { vi: "Cơ sở được công bố", en: "Published basis" }, text: { vi: "Thông báo liệt kê livestream chính thức, video người tham gia, dữ liệu trong game và replay, rồi kết luận thông tin ngoài game đã được áp dụng vào nhận định và chiến thuật. Tài liệu công khai tại đây chưa trình bày chuỗi chứng cứ riêng cho từng tình huống của từng tuyển thủ.", en: "The notice lists official broadcasts, participant footage, in-game data and replays, then concludes that external information informed judgments and tactics. The public material archived here does not lay out a player-by-player evidence chain for each incident." } },
      { heading: { vi: "Yêu cầu giải thích", en: "Request for explanation" }, text: { vi: "Đề nghị minh bạch là đề nghị chỉ rõ chứng cứ nào cho thấy hành vi của từng người và cách chứng cứ dẫn tới kết luận. Trang dẫn lại kết luận của KRAFTON, không tự nhận đã kiểm tra toàn bộ dữ liệu gốc.", en: "The request for transparency asks which evidence shows each player's conduct and how it supports the finding. This site attributes the conclusion to KRAFTON and has not independently reviewed the full underlying record." } },
    ],
    sources: ["findingsVi", "findingsKo"],
  },
  {
    id: "sanctions-september-23",
    date: "2026-09-23",
    day: "23",
    month: "SEP",
    category: "action",
    label: { vi: "Chế tài và trách nhiệm", en: "Sanctions and accountability" },
    title: { vi: "Án cấm vĩnh viễn và lời xin lỗi của KRAFTON", en: "Permanent bans and KRAFTON’s apology" },
    description: {
      vi: "PUBG công bố khóa vĩnh viễn tài khoản game và tước quyền thi đấu tại các giải Esports chính thức đối với cả hai tuyển thủ. Thông báo cũng nêu quyền giải trình của họ và thừa nhận trách nhiệm của KRAFTON trong việc hướng dẫn, truyền đạt và xử lý ban đầu.",
      en: "PUBG announced permanent game-account bans and permanent ineligibility for official esports events for both players. The notice also states their right to appeal through the esports process and acknowledges KRAFTON’s responsibility for its initial guidance and response.",
    },
    response: {
      vi: "PUBG nêu rõ hai tuyển thủ có quyền thực hiện quy trình giải trình theo thủ tục Esports. Trang này chưa có tài liệu xác thực về kết quả của quy trình đó.",
      en: "PUBG explicitly states the two players may use the esports explanation or appeal process. This site has no verified document showing the result of that process.",
    },
    explanation: {
      vi: "KRAFTON xin lỗi vì truyền đạt quy định và quy trình chậm, thiếu nhất quán, đồng thời nói sẽ rà soát nội bộ và hỗ trợ ngăn thiệt hại thứ cấp. Trách nhiệm của ban tổ chức và chế tài với tuyển thủ được nêu song song.",
      en: "KRAFTON apologized for slow and inconsistent communication, and said it would review its own processes and help prevent further harm. The notice addresses organizer responsibility alongside player sanctions.",
    },
    additional: [
      { heading: { vi: "Vì sao đề nghị xem xét lại?", en: "Why request a review?" }, text: { vi: "Án cấm áp dụng cho tài khoản game và mọi giải PUBG chính thức do KRAFTON tổ chức hoặc phê duyệt, vượt phạm vi một showmatch. Đề nghị xem xét lại yêu cầu giải thích vì sao đình chỉ có thời hạn không đủ và trách nhiệm vận hành của ban tổ chức đã được cân nhắc thế nào với từng người.", en: "The ban covers game accounts and all official PUBG events organized or approved by KRAFTON, beyond this showmatch. The review request asks why a time-limited suspension was insufficient and how organizer failures were weighed for each player." } },
      { heading: { vi: "Phản hồi của GAM × TE", en: "GAM × TE's response" }, text: { vi: "Theo VTC News, GAM × TE, đơn vị chủ quản của TanVuu, phản đối mức xử lý và đề nghị quy trình giải trình có tiêu chí, thời hạn rõ ràng, xem lại tính tương xứng và thực hiện hỗ trợ khắc phục thiệt hại. Đây là đề nghị của đội, không phải quyết định giảm hoặc hủy án.", en: "VTC News reports that TanVuu's team GAM × TE opposed the sanction and sought clear criteria and deadlines for the response process, a proportionality review and concrete help to remedy harm. This is the team's request, not a decision to reduce or overturn the ban." } },
      { heading: { vi: "Tình trạng đến 24/09", en: "Status through September 24" }, text: { vi: "Các nguồn được đối chiếu đến ngày 24/09/2026 chưa ghi nhận quyết định giải quyết đề nghị xem xét lại. Quyền giải trình không tự động đình chỉ hiệu lực của chế tài.", en: "Sources reviewed through September 24, 2026 did not document a decision on the review request. The right to respond does not itself suspend the sanctions." } },
    ],
    sources: ["findingsVi", "findingsKo", "teamResponse"],
  },
];
