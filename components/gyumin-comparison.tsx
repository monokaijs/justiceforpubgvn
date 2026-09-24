"use client";

import { useLanguage } from "@/components/language-provider";
import LocalizedAnchor from "@/components/localized-anchor";
import type { Language } from "@/lib/language";

const copy: Record<Language, {
  kicker: string;
  title: string;
  intro: string;
  reported: string;
  finding: string;
  gyumin: string;
  gyuminDetail: string;
  gyuminOutcome: string;
  vietnam: string;
  vietnamDetail: string;
  vietnamOutcome: string;
  questionLabel: string;
  question: string;
  principle: string;
  limit: string;
  post: string;
  profile: string;
  notice: string;
}> = {
  vi: {
    kicker: "TRƯỜNG HỢP ĐỐI CHIẾU / 2024–2026",
    title: "Cùng câu hỏi về thông tin từ stream. Tiêu chuẩn nào được áp dụng?",
    intro: "Trường hợp Gyumin tại PWS 2024 đặt ra câu hỏi cụ thể về tính nhất quán trong cách KRAFTON điều tra và xử lý. Những gì đã công bố về hai vụ việc có mức độ chứng cứ khác nhau.",
    reported: "CÁO BUỘC ĐƯƠNG THỜI",
    finding: "KẾT LUẬN CHÍNH THỨC",
    gyumin: "Gyumin · PWS 2024",
    gyuminDetail: "Ngày 06/10/2024, Patryk đăng trên X rằng Gyumin, khi thi đấu cho Kwangdong Freecs, đã mở luồng phát bản đồ có độ trễ 10 phút trong lúc diễn ra PWS. Theo bài đăng, cửa sổ stream xuất hiện trên camera sau một trận thắng của KDF.",
    gyuminOutcome: "Một cửa sổ đang mở không tự chứng minh tuyển thủ đã xem hoặc dùng thông tin trong trận. Hồ sơ PUBG Esports cho thấy Gyumin tiếp tục thi đấu trong năm 2025–26; hiện chưa có văn bản kết luận hoặc quyết định kỷ luật gốc để xác định cách vụ việc được xử lý.",
    vietnam: "Himass & TanVuu · Asia Stars 2026",
    vietnamDetail: "Ngày 23/09/2026, PUBG công bố kết luận hai tuyển thủ đã dùng thông tin ngoài game để đưa ra nhận định và áp dụng vào chiến thuật. Thông báo nêu việc xem xét livestream, video người tham gia, dữ liệu trong game và replay.",
    vietnamOutcome: "KRAFTON công bố khóa vĩnh viễn tài khoản game và tước quyền tham dự các giải esports chính thức do hãng tổ chức hoặc phê duyệt.",
    questionLabel: "CÂU HỎI GỬI KRAFTON",
    question: "KRAFTON đã xác định những gì trong vụ Gyumin, áp dụng quy định nào và đưa ra kết quả xử lý gì? Những khác biệt nào về chứng cứ, hành vi hoặc quy định giải thích cho cách xử lý giữa hai thời điểm?",
    principle: "Nếu các vụ việc khác nhau, hãy chỉ rõ khác ở đâu. Nếu hành vi tương đương, hãy giải thích vì sao mức xử lý khác nhau. Mọi tuyển thủ đều cần một tiêu chuẩn có thể kiểm tra và được áp dụng nhất quán.",
    limit: "Đối chiếu từ nguồn kiểm tra ngày 24/09/2026. Đây chưa phải bằng chứng về một tiền lệ kỷ luật tương đương hay kết luận rằng KRAFTON đã bỏ qua vi phạm trong vụ Gyumin.",
    post: "BÀI ĐĂNG NĂM 2024",
    profile: "HỒ SƠ GYUMIN",
    notice: "KẾT LUẬN 23/09",
  },
  en: {
    kicker: "COMPARISON CASE / 2024–2026",
    title: "The same question about stream information. What standard was applied?",
    intro: "Gyumin’s PWS 2024 case raises a specific question about consistency in KRAFTON’s investigation and sanctions. The publicly available evidence for the two cases differs.",
    reported: "CONTEMPORARY ALLEGATION",
    finding: "OFFICIAL FINDING",
    gyumin: "Gyumin · PWS 2024",
    gyuminDetail: "On 6 October 2024, Patryk posted on X that Gyumin, then playing for Kwangdong Freecs, had a map stream with a 10-minute delay open during PWS. The post says the window appeared on camera after a KDF win.",
    gyuminOutcome: "An open window alone does not prove the player viewed or used information during a match. PUBG Esports records show Gyumin competing in 2025–26; we have not found an original finding or disciplinary decision establishing how this incident was resolved.",
    vietnam: "Himass & TanVuu · Asia Stars 2026",
    vietnamDetail: "On 23 September 2026, PUBG announced a finding that the two players used outside information in their judgments and tactics. Its notice cites broadcasts, participant videos, in-game data and replays.",
    vietnamOutcome: "KRAFTON announced permanent game-account bans and permanent ineligibility for official esports events it organizes or approves.",
    questionLabel: "QUESTIONS FOR KRAFTON",
    question: "What did KRAFTON establish in Gyumin’s case, which rule did it apply, and what was the outcome? Which differences in evidence, conduct or rules explain the handling of these two cases?",
    principle: "If the cases differ, explain where. If the conduct is equivalent, explain the different sanctions. Every player deserves a standard that can be checked and applied consistently.",
    limit: "Sources checked on 24 September 2026. This comparison does not establish an equivalent disciplinary precedent or prove that KRAFTON overlooked misconduct in Gyumin’s case.",
    post: "2024 POST",
    profile: "GYUMIN PROFILE",
    notice: "23 SEP FINDINGS",
  },
  th: {
    kicker: "กรณีเปรียบเทียบ / 2024–2026",
    title: "คำถามเดียวกันเรื่องข้อมูลจากสตรีม ใช้มาตรฐานใดตัดสิน?",
    intro: "กรณี Gyumin ใน PWS 2024 ทำให้เกิดคำถามเรื่องความสม่ำเสมอในการสอบสวนและลงโทษของ KRAFTON โดยหลักฐานที่เปิดเผยต่อสาธารณะของสองกรณีมีระดับต่างกัน",
    reported: "ข้อกล่าวหาในขณะนั้น",
    finding: "ผลสอบสวนอย่างเป็นทางการ",
    gyumin: "Gyumin · PWS 2024",
    gyuminDetail: "วันที่ 6 ตุลาคม 2024 Patryk โพสต์บน X ว่า Gyumin ซึ่งขณะนั้นเล่นให้ Kwangdong Freecs เปิดสตรีมแผนที่ที่หน่วงเวลา 10 นาทีระหว่าง PWS โดยระบุว่าพบหน้าต่างสตรีมในภาพกล้องหลัง KDF ชนะเกมหนึ่ง",
    gyuminOutcome: "หน้าต่างที่เปิดอยู่เพียงอย่างเดียวพิสูจน์ไม่ได้ว่านักกีฬาได้ดูหรือใช้ข้อมูลระหว่างแข่ง บันทึกของ PUBG Esports แสดงว่า Gyumin ยังแข่งขันในปี 2025–26 แต่เรายังไม่พบผลสอบสวนหรือคำสั่งลงโทษต้นฉบับที่ยืนยันว่ากรณีนี้จบลงอย่างไร",
    vietnam: "Himass และ TanVuu · Asia Stars 2026",
    vietnamDetail: "วันที่ 23 กันยายน 2026 PUBG ประกาศผลสอบสวนว่าทั้งสองใช้ข้อมูลนอกเกมประกอบการตัดสินใจและวางแผน โดยอ้างถึงการถ่ายทอดสด วิดีโอผู้เข้าร่วม ข้อมูลในเกม และรีเพลย์",
    vietnamOutcome: "KRAFTON ประกาศแบนบัญชีเกมถาวรและตัดสิทธิ์เข้าร่วมการแข่งขัน esports อย่างเป็นทางการที่บริษัทจัดหรือรับรองอย่างถาวร",
    questionLabel: "คำถามถึง KRAFTON",
    question: "KRAFTON สรุปข้อเท็จจริงใดในกรณี Gyumin ใช้กฎข้อใด และตัดสินอย่างไร? ความต่างด้านหลักฐาน พฤติกรรม หรือกฎข้อใดอธิบายการจัดการสองกรณีนี้?",
    principle: "หากกรณีต่างกัน ขอให้ชี้แจงว่าต่างตรงไหน หากพฤติกรรมเทียบเคียงกัน ขอให้อธิบายเหตุผลของบทลงโทษที่ต่างกัน นักกีฬาทุกคนควรได้รับมาตรฐานที่ตรวจสอบได้และใช้สม่ำเสมอ",
    limit: "ตรวจสอบแหล่งข้อมูลเมื่อ 24 กันยายน 2026 การเปรียบเทียบนี้ยังไม่พิสูจน์ว่ามีบรรทัดฐานการลงโทษที่เทียบเคียงกัน หรือว่า KRAFTON มองข้ามการกระทำผิดของ Gyumin",
    post: "โพสต์ปี 2024",
    profile: "ประวัติ GYUMIN",
    notice: "ผลสอบสวน 23 ก.ย.",
  },
  ko: {
    kicker: "비교 사례 / 2024–2026",
    title: "방송 정보에 관한 같은 질문. 어떤 기준이 적용됐습니까?",
    intro: "2024년 PWS의 Gyumin 사례는 KRAFTON의 조사와 제재 기준이 일관되게 적용됐는지 묻게 합니다. 두 사건에서 공개된 증거의 수준은 다릅니다.",
    reported: "당시 제기된 의혹",
    finding: "공식 조사 결과",
    gyumin: "Gyumin · PWS 2024",
    gyuminDetail: "2024년 10월 6일 Patryk은 당시 Kwangdong Freecs 소속이던 Gyumin이 PWS 중 10분 지연된 지도 방송을 열어 두었다고 X에 게시했습니다. 게시물에 따르면 KDF의 경기 승리 후 카메라 화면에서 방송 창이 발견됐습니다.",
    gyuminOutcome: "창이 열려 있다는 사실만으로 경기 중 정보를 보거나 활용했다고 입증할 수 없습니다. PUBG Esports 기록에는 Gyumin의 2025–26년 출전이 확인되지만, 이 사안의 처리 결과를 확인할 수 있는 원본 조사 결과나 징계 결정은 찾지 못했습니다.",
    vietnam: "Himass와 TanVuu · Asia Stars 2026",
    vietnamDetail: "2026년 9월 23일 PUBG는 두 선수가 외부 정보를 판단과 전술에 활용했다고 발표했습니다. 공지에는 공식 방송, 참가자 영상, 게임 데이터와 리플레이를 검토했다고 명시돼 있습니다.",
    vietnamOutcome: "KRAFTON은 게임 계정 영구 정지와 자사가 주최하거나 승인하는 공식 e스포츠 대회 영구 출전 금지를 발표했습니다.",
    questionLabel: "KRAFTON에 묻습니다",
    question: "Gyumin 사례에서 KRAFTON은 무엇을 확인했고, 어떤 규정을 적용했으며, 어떤 결론을 내렸습니까? 증거, 행위 또는 규정의 어떤 차이가 두 사건의 처리 차이를 설명합니까?",
    principle: "사건이 다르다면 차이점을 밝혀 주십시오. 행위가 동등하다면 제재가 다른 이유를 설명해 주십시오. 모든 선수에게 검증 가능하고 일관된 기준이 필요합니다.",
    limit: "2026년 9월 24일 확인한 자료 기준입니다. 이 비교는 동등한 징계 선례나 KRAFTON이 Gyumin의 위반을 묵인했다는 사실을 입증하지 않습니다.",
    post: "2024년 게시물",
    profile: "GYUMIN 선수 기록",
    notice: "9월 23일 조사 결과",
  },
  zh: {
    kicker: "对照案例 / 2024–2026",
    title: "同样涉及直播信息，适用了什么标准？",
    intro: "2024 年 PWS 的 Gyumin 事件提出了一个具体问题：KRAFTON 的调查与处罚标准是否一致。两起事件已公开的证据程度并不相同。",
    reported: "当时提出的指控",
    finding: "官方调查结论",
    gyumin: "Gyumin · PWS 2024",
    gyuminDetail: "2024 年 10 月 6 日，Patryk 在 X 上称，当时效力于 Kwangdong Freecs 的 Gyumin 在 PWS 比赛期间打开了延迟 10 分钟的地图直播。据该帖称，KDF 获胜后摄像画面中出现了直播窗口。",
    gyuminOutcome: "仅凭打开的窗口，无法证明选手在比赛中查看或使用了信息。PUBG Esports 的记录显示 Gyumin 在 2025–26 年继续参赛；我们尚未找到原始调查结论或纪律决定来确认该事件的处理结果。",
    vietnam: "Himass 与 TanVuu · Asia Stars 2026",
    vietnamDetail: "2026 年 9 月 23 日，PUBG 公布调查结论，认定两名选手将游戏外信息用于判断和战术。公告称其审查了赛事直播、参赛者视频、游戏数据与回放。",
    vietnamOutcome: "KRAFTON 宣布永久封禁游戏账号，并永久取消参加其举办或批准的官方电竞赛事的资格。",
    questionLabel: "致 KRAFTON 的问题",
    question: "KRAFTON 在 Gyumin 事件中确认了哪些事实、依据了哪项规则、作出了什么处理？证据、行为或规则上的哪些差异解释了两起事件不同的处理方式？",
    principle: "如果两案不同，请说明差异。如果行为相当，请解释处罚为何不同。所有选手都应受到可核查且一致适用的标准对待。",
    limit: "资料核查于 2026 年 9 月 24 日。此项对照尚不能证明存在同等的纪律先例，也不能证明 KRAFTON 忽视了 Gyumin 的违规行为。",
    post: "2024 年帖子",
    profile: "GYUMIN 选手记录",
    notice: "9 月 23 日结论",
  },
  ja: {
    kicker: "比較事例 / 2024–2026",
    title: "配信情報に関する同じ疑問。どのような基準が適用されたのか？",
    intro: "PWS 2024におけるGyumin選手の事例は、KRAFTONによる調査と制裁基準の一貫性について具体的な疑問を提起しています。公開されている2つの事件の証拠レベルには違いがあります。",
    reported: "当時の疑惑",
    finding: "公式な調査結論",
    gyumin: "Gyumin · PWS 2024",
    gyuminDetail: "2024年10月6日、Patryk氏はX上で、当時Kwangdong Freecsに所属していたGyumin選手がPWS開催中に10分遅延のマップ配信を開いていたと投稿しました。投稿によると、KDFの勝利後にカメラ映像上に配信ウィンドウが映り込んでいました。",
    gyuminOutcome: "ウィンドウが開いていた事実のみでは、選手が試合中に情報を閲覧または利用したことの証明にはなりません。PUBG Esportsの公式記録ではGyumin選手が2025–26年も競技を継続していることが確認できますが、この件がどのように解決されたかを示す原典の調査結論や懲戒決定は見つかっていません。",
    vietnam: "Himass & TanVuu · Asia Stars 2026",
    vietnamDetail: "2026年9月23日、PUBGは両選手がゲーム外の情報を判断および戦术に利用したとする調査結論を発表しました。告知では公式配信、参加者動画、ゲーム内データ、リプレイの検証を挙げています。",
    vietnamOutcome: "KRAFTONはゲームアカウントの永久利用停止、および同社が主催または承認する公式eスポーツ大会への無期限出場資格剥奪を発表しました。",
    questionLabel: "KRAFTONへの質問",
    question: "Gyumin選手の事例においてKRAFTONは何を確認し、どの規則を適用し、いかなる処分を下したのか？ 証拠、行為、規則のどのような違いが2つの事例の対応の差を説明するのか？",
    principle: "事例が異なるのであれば、相違点を明確に示してください。行為が同等であるならば、処分の違いを説明してください。すべての選手に検証可能で一貫して適用される基準が必要です。",
    limit: "2026年9月24日確認の資料に基づきます。この比較は同等の懲戒先例を立証するものではなく、KRAFTONがGyumin選手の違反を見逃したと断定するものでもありません。",
    post: "2024年の投稿",
    profile: "GYUMIN選手プロフィール",
    notice: "9月23日の結論",
  },
  ru: {
    kicker: "СРАВНИТЕЛЬНЫЙ ПРИМЕР / 2024–2026",
    title: "Тот же вопрос об информации со стрима. Какой стандарт был применен?",
    intro: "Случай Gyumin на PWS 2024 поднимает конкретный вопрос о последовательности расследований и санкций KRAFTON. Степень обнародованных доказательств по этим двум инцидентам различается.",
    reported: "ОБВИНЕНИЕ ТОГО ВРЕМЕНИ",
    finding: "ОФИЦИАЛЬНОЕ ЗАКЛЮЧЕНИЕ",
    gyumin: "Gyumin · PWS 2024",
    gyuminDetail: "6 октября 2024 года Patryk опубликовал в X сообщение о том, что Gyumin, выступавший тогда за Kwangdong Freecs, во время PWS держал открытым стрим карты с 10-минутной задержкой. Согласно публикации, окно стрима попало на камеру после победы KDF в матче.",
    gyuminOutcome: "Само по себе открытое окно не доказывает, что игрок просматривал или использовал информацию во время матча. Записи PUBG Esports показывают, что Gyumin продолжил выступать в 2025–26 годах; оригинальное заключение или дисциплинарное решение по этому делу не опубликовано.",
    vietnam: "Himass и TanVuu · Asia Stars 2026",
    vietnamDetail: "23 сентября 2026 года PUBG объявила о заключении, что оба игрока использовали внешнюю информацию для оценки ситуации и в тактике. В уведомлении упоминается просмотр трансляций, видео участников, игровых данных и реплеев.",
    vietnamOutcome: "KRAFTON объявила о перманентной блокировке игровых аккаунтов и пожизненной дисквалификации на официальных киберспортивных турнирах, организованных или одобренных компанией.",
    questionLabel: "ВОПРОСЫ К KRAFTON",
    question: "Что именно установила KRAFTON в деле Gyumin, какое правило применила и каков был итог? Какие различия в доказательствах, действиях или правилах объясняют разницу в решениях между этими двумя случаями?",
    principle: "Если эти случаи различны — укажите конкретные различия. Если действия эквивалентны — объясните разницу в наказании. Все игроки заслуживают проверяемого и последовательно применяемого стандарта.",
    limit: "Источники проверены 24 сентября 2026 года. Данное сравнение не устанавливает прецедент равного наказания и не утверждает, что KRAFTON проигнорировала нарушение в деле Gyumin.",
    post: "ПУБЛИКАЦИЯ 2024 ГОДА",
    profile: "ПРОФИЛЬ GYUMIN",
    notice: "ВЫВОДЫ ОТ 23 СЕНТЯБРЯ",
  },
  id: {
    kicker: "KASUS PERBANDINGAN / 2024–2026",
    title: "Pertanyaan yang sama tentang informasi stream. Standar apa yang diterapkan?",
    intro: "Kasus Gyumin di PWS 2024 menimbulkan pertanyaan spesifik tentang konsistensi investigasi dan sanksi KRAFTON. Bukti yang dipublikasikan untuk kedua kasus memiliki tingkatan yang berbeda.",
    reported: "DUGAAN PADA SAAT ITU",
    finding: "TEMUAN RESMI",
    gyumin: "Gyumin · PWS 2024",
    gyuminDetail: "Pada 6 Oktober 2024, Patryk memposting di X bahwa Gyumin, saat itu bermain untuk Kwangdong Freecs, membuka stream peta dengan delay 10 menit selama PWS. Menurut postingan tersebut, jendela stream terlihat di kamera setelah kemenangan KDF.",
    gyuminOutcome: "Jendela yang terbuka saja tidak membuktikan pemain melihat atau menggunakan informasi selama pertandingan. Catatan PUBG Esports menunjukkan Gyumin tetap berkompetisi pada 2025–26; kami belum menemukan temuan asli atau keputusan disipliner yang menetapkan bagaimana insiden ini diselesaikan.",
    vietnam: "Himass & TanVuu · Asia Stars 2026",
    vietnamDetail: "Pada 23 September 2026, PUBG mengumumkan temuan bahwa kedua pemain menggunakan informasi luar game dalam penilaian dan taktik mereka. Pemberitahuan mengutip tayangan siaran, video peserta, data dalam game, dan rekaman replay.",
    vietnamOutcome: "KRAFTON mengumumkan pemblokiran akun game permanen dan larangan bertanding permanen dari turnamen esports resmi yang diselenggarakan atau disetujui KRAFTON.",
    questionLabel: "PERTANYAAN UNTUK KRAFTON",
    question: "Apa yang dipastikan KRAFTON dalam kasus Gyumin, aturan mana yang diterapkan, dan apa hasilnya? Perbedaan bukti, tindakan, atau peraturan apa yang menjelaskan perbedaan perlakuan di antara kedua kasus ini?",
    principle: "Jika kasusnya berbeda, tunjukkan di mana perbedaannya. Jika tindakannya setara, jelaskan mengapa sanksinya berbeda. Setiap pemain berhak atas standar yang dapat diverifikasi dan diterapkan secara konsisten.",
    limit: "Sumber diperiksa pada 24 September 2026. Perbandingan ini tidak menetapkan preseden disipliner yang setara atau membuktikan bahwa KRAFTON mengabaikan pelanggaran dalam kasus Gyumin.",
    post: "POSTINGAN 2024",
    profile: "PROFIL GYUMIN",
    notice: "TEMUAN 23 SEP",
  },
  es: {
    kicker: "CASO DE COMPARACIÓN / 2024–2026",
    title: "La misma pregunta sobre información de streams. ¿Qué criterio se aplicó?",
    intro: "El caso de Gyumin en PWS 2024 plantea una pregunta directa sobre la coherencia de las investigaciones y sanciones de KRAFTON. Las pruebas disponibles públicamente en ambos casos difieren.",
    reported: "DENUNCIA CONTEMPORÁNEA",
    finding: "CONCLUSIÓN OFICIAL",
    gyumin: "Gyumin · PWS 2024",
    gyuminDetail: "El 6 de octubre de 2024, Patryk publicó en X que Gyumin, que competía para Kwangdong Freecs, tenía abierta una transmisión del mapa con 10 minutos de retraso durante PWS. Según la publicación, la ventana del stream apareció en cámara tras una victoria de KDF.",
    gyuminOutcome: "Una ventana abierta por sí sola no prueba que el jugador haya visto o utilizado información durante la partida. Los registros de PUBG Esports muestran a Gyumin compitiendo en 2025–26; no hemos hallado una resolución original o sanción disciplinaria que establezca cómo se resolvió este incidente.",
    vietnam: "Himass y TanVuu · Asia Stars 2026",
    vietnamDetail: "El 23 de septiembre de 2026, PUBG anunció la conclusión de que ambos jugadores utilizaron información externa al juego en sus decisiones y tácticas. Su comunicado cita transmisiones, vídeos de participantes, datos del juego y repeticiones.",
    vietnamOutcome: "KRAFTON anunció la suspensión permanente de sus cuentas de juego y la inhabilitación permanente para participar en torneos oficiales de esports que organice o apruebe.",
    questionLabel: "PREGUNTAS PARA KRAFTON",
    question: "¿Qué determinó KRAFTON en el caso de Gyumin, qué norma aplicó y cuál fue el resultado? ¿Qué diferencias en pruebas, conducta o reglamento explican el trato dispar entre ambos casos?",
    principle: "Si los casos son diferentes, señalen en qué. Si las conductas son equivalentes, expliquen la disparidad de sanciones. Todos los jugadores merecen un estándar verificable y aplicado de manera coherente.",
    limit: "Fuentes revisadas el 24 de septiembre de 2026. Esta comparación no establece un precedente disciplinario equivalente ni demuestra que KRAFTON haya ignorado una infracción en el caso de Gyumin.",
    post: "PUBLICACIÓN DE 2024",
    profile: "PERFIL DE GYUMIN",
    notice: "CONCLUSIÓN DEL 23 SEP",
  },
  tl: {
    kicker: "KASONG PAGHAHAMBING / 2024–2026",
    title: "Ang parehong tanong tungkol sa impormasyon mula sa stream. Anong pamantayan ang inilapat?",
    intro: "Ang kaso ni Gyumin sa PWS 2024 ay naglalabas ng partikular na tanong tungkol sa pagiging pare-pareho ng imbestigasyon at parusa ng KRAFTON. Magkaiba ang antas ng pampublikong ebidensya para sa dalawang kaso.",
    reported: "PARATANG NOONG PANAHONG IYON",
    finding: "OPISYAL NA NATUKLASAN",
    gyumin: "Gyumin · PWS 2024",
    gyuminDetail: "Noong 6 Oktubre 2024, nag-post si Patryk sa X na si Gyumin, habang naglalaro para sa Kwangdong Freecs, ay may bukas na map stream na may 10-minutong delay habang nagaganap ang PWS. Ayon sa post, lumabas ang window ng stream sa camera matapos manalo ang KDF.",
    gyuminOutcome: "Ang isang bukas na window lamang ay hindi nagpapatunay na tiningnan o ginamit ng manlalaro ang impormasyon sa laban. Ipinapakita ng mga talaan ng PUBG Esports na nakipagkumpitensya si Gyumin noong 2025–26; wala kaming natagpuang orihinal na desisyon o kaparusahan na nagpapatunay kung paano nalutas ang insidenteng ito.",
    vietnam: "Himass & TanVuu · Asia Stars 2026",
    vietnamDetail: "Noong 23 Setyembre 2026, inihayag ng PUBG ang natuklasan na ginamit ng dalawang manlalaro ang impormasyon sa labas ng laro sa kanilang paghatol at taktika. Binabanggit sa paunawa ang mga broadcast, video ng kalahok, in-game data, at replays.",
    vietnamOutcome: "Inihayag ng KRAFTON ang mga permanenteng ban sa account ng laro at permanenteng diskwalipikasyon para sa mga opisyal na kaganapan sa esports na inoorganisa o inaprubahan nito.",
    questionLabel: "MGA TANONG PARA SA KRAFTON",
    question: "Ano ang napatunayan ng KRAFTON sa kaso ni Gyumin, anong patakaran ang inilapat nito, at ano ang kinalabasan? Anong mga pagkakaiba sa ebidensya, pag-uugali, o mga patakaran ang nagpapaliwanag sa paghawak sa dalawang kasong ito?",
    principle: "Kung magkaiba ang mga kaso, ipaliwanag kung saan. Kung magkatumbas ang pag-uugali, ipaliwanag ang magkaibang parusa. Karapat-dapat ang bawat manlalaro sa isang pamantayang maaaring suriin at pare-parehong ilapat.",
    limit: "Mga sangguniang sinuri noong 24 Setyembre 2026. Ang paghahambing na ito ay hindi nagtatatag ng katumbas na precedent sa pagdidisiplina o nagpapatunay na binalewala ng KRAFTON ang maling pag-uugali sa kaso ni Gyumin.",
    post: "POST NOONG 2024",
    profile: "PROFILE NI GYUMIN",
    notice: "NATUKLASAN NOONG 23 SET",
  },
};

export default function GyuminComparison() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section id="gyumin-comparison" className="gyumin-comparison" aria-labelledby="gyumin-comparison-title">
      <div className="page-width gyumin-comparison-inner">
        <div className="gyumin-comparison-heading">
          <p className="eyebrow dark-eyebrow"><span className="eyebrow-line" />{t.kicker}</p>
          <h2 id="gyumin-comparison-title">{t.title}</h2>
          <p>{t.intro}</p>
        </div>
        <div className="gyumin-comparison-grid">
          <article className="gyumin-comparison-card">
            <div className="gyumin-comparison-card-top"><span>01 / 2024</span><span>{t.reported}</span></div>
            <h3>{t.gyumin}</h3>
            <p>{t.gyuminDetail}</p>
            <p className="gyumin-comparison-card-outcome">{t.gyuminOutcome}</p>
          </article>
          <article className="gyumin-comparison-card gyumin-comparison-card-finding">
            <div className="gyumin-comparison-card-top"><span>02 / 2026</span><span>{t.finding}</span></div>
            <h3>{t.vietnam}</h3>
            <p>{t.vietnamDetail}</p>
            <p className="gyumin-comparison-card-outcome">{t.vietnamOutcome}</p>
          </article>
        </div>
        <div className="gyumin-comparison-callout">
          <span>{t.questionLabel}</span>
          <div><p>{t.question}</p><p>{t.principle}</p></div>
        </div>
        <div className="gyumin-comparison-bottom">
          <p>{t.limit}</p>
          <nav aria-label={t.kicker}>
            <LocalizedAnchor href="/sources#gyumin-post">{t.post} ↗</LocalizedAnchor>
            <LocalizedAnchor href="/sources#gyumin-profile">{t.profile} ↗</LocalizedAnchor>
            <LocalizedAnchor href="/sources#findingsVi">{t.notice} ↗</LocalizedAnchor>
          </nav>
        </div>
      </div>
    </section>
  );
}
