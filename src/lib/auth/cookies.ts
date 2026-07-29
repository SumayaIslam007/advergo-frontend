import { cookies } from "next/headers";

const ACCESS_COOKIE = "advergo_access";
const REFRESH_COOKIE = "advergo_refresh";

// httpOnly: JS on the page (and therefore any XSS payload) can never read these.
const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function setAuthCookies(access: string, refresh: string) {
  const store = await cookies();
  store.set(ACCESS_COOKIE, access, { ...baseCookieOptions, maxAge: 60 * 30 });
  store.set(REFRESH_COOKIE, refresh, { ...baseCookieOptions, maxAge: 60 * 60 * 24 * 14 });
}

export async function clearAuthCookies() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

export async function getAccessToken() {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value ?? null;
}

export async function getRefreshToken() {
  const store = await cookies();
  return store.get(REFRESH_COOKIE)?.value ?? null;
}
