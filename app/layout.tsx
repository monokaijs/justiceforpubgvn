import type { Metadata } from "next";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Công bằng cho Himass & TanVuu | Justice for PUBG VN",
  description:
    "Không bênh vực gian lận. Yêu cầu điều tra minh bạch, luật rõ ràng và án phạt tương xứng. Xem diễn biến và tài liệu nguồn.",
  openGraph: {
    title: "Công bằng cho Himass & TanVuu | Justice for PUBG VN",
    description:
      "Yêu cầu điều tra minh bạch và xử phạt tương xứng. Dòng thời gian và tài liệu nguồn về vụ việc PUBG Asia Stars 2026.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
