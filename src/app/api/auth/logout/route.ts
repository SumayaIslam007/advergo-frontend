import { NextResponse } from "next/server";
import { clearAuthCookies, getRefreshToken } from "@/lib/auth/cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export async function POST() {
  const refresh = await getRefreshToken();
  if (refresh) {
    // Best-effort server-side blacklist; logout should succeed either way.
    try {
      await fetch(`${API_BASE_URL}/auth/logout/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
        cache: "no-store",
      });
    } catch {
      // ignore -- cookies are cleared below regardless
    }
  }
  await clearAuthCookies();
  return NextResponse.json({ detail: "Logged out." });
}
