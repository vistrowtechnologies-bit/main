import { createHmac, timingSafeEqual } from "node:crypto";

export function commentSignature(id: string, action: "approve" | "reject") {
  const secret = process.env.CRON_SECRET || "";
  return createHmac("sha256", secret).update(`${id}:${action}`).digest("hex");
}

export function validSignature(id: string, action: "approve" | "reject", sig: string) {
  if (!process.env.CRON_SECRET) return false;
  const expected = Buffer.from(commentSignature(id, action));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
