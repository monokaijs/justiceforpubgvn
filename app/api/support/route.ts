import { NextRequest, NextResponse } from "next/server";
import { readSupportCount, addSupport } from "@/lib/support";
import { voterIp } from "@/lib/voter-ip";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_NAME = "justiceforpubgvn_supported";

function response(count: number, supported: boolean) {
  const siteKey = process.env.TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY
    ? process.env.TURNSTILE_SITE_KEY : null;
  return NextResponse.json({ count, supported, siteKey }, { headers: { "Cache-Control": "no-store" } });
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }),
    signal: AbortSignal.timeout(5000),
    cache: "no-store",
  });
  if (!result.ok) return false;

  const validation: { success?: boolean; action?: string; hostname?: string } = await result.json();
  const localTestKey = process.env.NODE_ENV !== "production"
    && secret === "1x0000000000000000000000000000000AA";
  const expectedHostname = process.env.TURNSTILE_HOSTNAME
    || (process.env.NODE_ENV === "production" ? "justiceforpubgvn.com" : "localhost");
  return validation.success === true
    && (validation.action === "support" || (localTestKey && !validation.action))
    && validation.hostname === expectedHostname;
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

    const ip = voterIp(request.headers);
    if (!ip) {
      return NextResponse.json({ error: "Visitor IP unavailable" }, { status: 503 });
    }

    const body: unknown = await request.json().catch(() => null);
    const token = body && typeof body === "object" && "token" in body ? body.token : null;
    if (typeof token !== "string" || !token || token.length > 2048) {
      return NextResponse.json({ error: "Verification required" }, { status: 400 });
    }
    if (!await verifyTurnstile(token)) {
      return NextResponse.json({ error: "Verification failed" }, { status: 403 });
    }

    const result = response(await addSupport(ip), true);
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
