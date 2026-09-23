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
      vi: "Theo thông báo sau đó của PUBG, sự việc liên quan đến Team VIE bắt nguồn từ Day 1. PUBG nói Himass và TanVuu đã kiểm tra thông tin ngoài game qua nội dung stream cá nhân trong ngày này.",
      en: "According to PUBG’s later notice, the Team VIE issue originated on Day 1. PUBG said Himass and TanVuu checked out-of-game information through personal stream content that day.",
    },
    response: {
      vi: "Hai ảnh được cung cấp trong dự án đặt ra câu hỏi về việc một người tham gia khác chuyển ứng dụng và mở trang livestream. Ảnh tĩnh không xác minh được thời điểm, thông tin đã xem hoặc thông tin có được dùng trong trận đấu hay không.",
      en: "The two user-supplied images raise a question about another participant switching applications and opening a livestream page. Stills do not establish timing, what information was seen, or whether it affected play.",
    },
    explanation: {
      vi: "Đây là ngày phát sinh sự việc, không phải ngày PUBG đưa ra kết luận cuối cùng. Thông báo ngày 23/09 nói các nghi vấn tương tự với người khác đã được kiểm tra nhưng không phát hiện thêm vi phạm cần chế tài.",
      en: "This is when the issue arose, not when PUBG reached its final finding. The September 23 notice says similar allegations involving others were reviewed, with no additional violations requiring sanctions found.",
    },
    sources: ["preliminary", "additional", "findingsVi"],
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
    sources: ["preliminary"],
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
    sources: ["additional", "rulebook", "findingsVi"],
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
    sources: ["additional"],
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
    sources: ["findingsVi", "findingsKo"],
  },
];
