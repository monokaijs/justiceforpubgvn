import { NextRequest, NextResponse } from "next/server";
import { readSupportCount, addSupport } from "@/lib/support";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_NAME = "justiceforpubgvn_supported";

function response(count: number, supported: boolean) {
  return NextResponse.json({ count, supported }, { headers: { "Cache-Control": "no-store" } });
}

export async function GET(request: NextRequest) {
  try {
    return response(await readSupportCount(), request.cookies.get(COOKIE_NAME)?.value === "1");
  } catch {
    return NextResponse.json({ error: "Support count unavailable" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? request.nextUrl.protocol.slice(0, -1);
  if (origin && (!host || origin !== `${protocol}://${host}`)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  try {
    if (request.cookies.get(COOKIE_NAME)?.value === "1") {
      return response(await readSupportCount(), true);
    }

    const result = response(await addSupport(), true);
    result.cookies.set(COOKIE_NAME, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
    return result;
  } catch {
    return NextResponse.json({ error: "Support count unavailable" }, { status: 500 });
  }
}
