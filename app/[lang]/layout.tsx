import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { LanguageProvider } from "@/components/language-provider";
import { isLanguage, languages } from "@/lib/language";
import { siteName, siteUrl } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  robots: { index: true, follow: true },
};

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return (
    <html lang={lang}>
      <body><LanguageProvider initialLanguage={lang}>{children}</LanguageProvider></body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-BJSSKGMNEJ" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BJSSKGMNEJ');`}
      </Script>
    </html>
  );
}
