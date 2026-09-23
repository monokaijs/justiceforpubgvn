import TimelineExperience from "@/components/timeline-experience";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLanguage } from "@/lib/language";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return pageMetadata(lang, "home");
}

export default function Home() {
  return <TimelineExperience />;
}
