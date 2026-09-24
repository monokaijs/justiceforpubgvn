import { BlockList, isIP } from "node:net";

// https://www.cloudflare.com/ips/ (checked 2026-09-24). Only trust
// CF-Connecting-IP when Nginx's X-Real-IP is a Cloudflare edge address.
const cloudflare = new BlockList();
for (const [address, prefix] of [
  ["173.245.48.0", 20], ["103.21.244.0", 22], ["103.22.200.0", 22],
  ["103.31.4.0", 22], ["141.101.64.0", 18], ["108.162.192.0", 18],
  ["190.93.240.0", 20], ["188.114.96.0", 20], ["197.234.240.0", 22],
  ["198.41.128.0", 17], ["162.158.0.0", 15], ["104.16.0.0", 13],
  ["104.24.0.0", 14], ["172.64.0.0", 13], ["131.0.72.0", 22],
] as const) cloudflare.addSubnet(address, prefix, "ipv4");
for (const [address, prefix] of [
  ["2400:cb00::", 32], ["2606:4700::", 32], ["2803:f800::", 32],
  ["2405:b500::", 32], ["2405:8100::", 32], ["2a06:98c0::", 29],
  ["2c0f:f248::", 32],
] as const) cloudflare.addSubnet(address, prefix, "ipv6");

export function voterIp(headers: Headers): string | null {
  // Nginx overwrites X-Real-IP with its actual peer; client-supplied forwarding
  // headers must never be used as the fallback for a vote.
  const peer = headers.get("x-real-ip");
  const family = peer ? isIP(peer) : 0;
  if (!family) return process.env.NODE_ENV === "production" ? null : "127.0.0.1";

  if (!cloudflare.check(peer!, family === 4 ? "ipv4" : "ipv6")) return peer;
  const visitor = headers.get("cf-connecting-ip");
  return visitor && isIP(visitor) ? visitor : null;
}
