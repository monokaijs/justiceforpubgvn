import { NextResponse, type NextRequest } from "next/server";
import { isLanguage, type Language } from "@/lib/language";

const languageCookie = "pas_timeline_lang";

function languageForCountry(country: string | null): Language {
  switch (country?.toUpperCase()) {
    case "VN": return "vi";
    case "TH": return "th";
    case "KR": return "ko";
    default: return "en";
  }
}

export function proxy(request: NextRequest) {
  const saved = request.cookies.get(languageCookie)?.value;
  const language = saved && isLanguage(saved) ? saved : languageForCountry(request.headers.get("cf-ipcountry"));
  const url = request.nextUrl.clone();
  url.pathname = `/${language}${url.pathname === "/" ? "" : url.pathname}`;
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Cookie, CF-IPCountry");
  return response;
}

export const config = {
  matcher: ["/", "/sources", "/players", "/players/himass", "/players/tanvuu", "/legal"],
};
