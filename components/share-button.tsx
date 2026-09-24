"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Share } from "lucide-react";

const labels = {
  vi: { share: "Chia sẻ", copied: "Đã sao chép liên kết", error: "Không thể sao chép liên kết" },
  th: { share: "แชร์", copied: "คัดลอกลิงก์แล้ว", error: "คัดลอกลิงก์ไม่ได้" },
  en: { share: "Share", copied: "Link copied", error: "Could not copy link" },
  ko: { share: "공유", copied: "링크 복사됨", error: "링크를 복사할 수 없습니다" },
  zh: { share: "分享", copied: "链接已复制", error: "无法复制链接" },
} as const;

export default function ShareButton({ className = "" }: { className?: string }) {
  const { language } = useLanguage();
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const label = labels[language];

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}`;
    setStatus("idle");
    if (navigator.share) {
      try {
        await navigator.share({ title: "Justice for PUBG VN", url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      let copied = false;
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(url);
          copied = true;
        } catch { /* Try the selection fallback below. */ }
      }
      if (!copied) {
        const field = document.createElement("textarea");
        field.value = url;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        copied = document.execCommand("copy");
        field.remove();
      }
      if (!copied) throw new Error("Copy unavailable");
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };

  return <div className={`share-control ${className}`}>
    <button className="share-button" type="button" onClick={share} aria-label={label.share}>
      <Share aria-hidden="true" />
      <span>{label.share}</span>
    </button>
    <span className="share-status" role="status" aria-live="polite">{status === "copied" ? label.copied : status === "error" ? label.error : ""}</span>
  </div>;
}
