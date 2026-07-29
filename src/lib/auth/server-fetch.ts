import { clearAuthCookies, getAccessToken, getRefreshToken, setAuthCookies } from "./cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

async function refreshAccessToken(): Promise<string | null> {
  const refresh = await getRefreshToken();
  if (!refresh) return null;

  const response = await fetch(`${API_BASE_URL}/auth/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
    cache: "no-store",
  });
  if (!response.ok) return null;

  const data = await response.json();
  // SIMPLE_JWT.ROTATE_REFRESH_TOKENS=True -- a new refresh token may come back too.
  await setAuthCookies(data.access, data.refresh ?? refresh);
  return data.access as string;
}

/**
 * Authenticated fetch for Server Components / Route Handlers. Reads the
 * access token from the httpOnly cookie, attaches it, and transparently
 * refreshes once on a 401 before giving up (clearing the session cookies).
 */
export async function authFetch(path: string, init?: RequestInit): Promise<Response> {
  const isFormData = init?.body instanceof FormData;
  const doFetch = (token: string | null) =>
    fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...init?.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

  const access = await getAccessToken();
  let response = await doFetch(access);

  if (response.status === 401 && access) {
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      response = await doFetch(newAccess);
    } else {
      await clearAuthCookies();
    }
  }

  return response;
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getAccessToken()) !== null;
}

export async function getCurrentUser() {
  if (!(await isAuthenticated())) return null;
  const response = await authFetch("/auth/me/");
  if (!response.ok) return null;
  return response.json();
}
