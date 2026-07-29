const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Thin fetch wrapper for the Django backend. `no-store` for now (we're
 * actively iterating on seeded content); swap to `next: { revalidate }` once
 * the catalog/content data is stable and doesn't need to be live on every request.
 */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const isFormData = init?.body instanceof FormData;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: isFormData ? init?.headers : { "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.json().catch(() => undefined);
    throw new ApiError(response.status, `${init?.method ?? "GET"} ${path} failed with ${response.status}`, body);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json() as Promise<T>;
}

/**
 * Swallows a failed request and returns `fallback` instead. Server Components
 * that throw during render can trip Next's dev-mode error-recovery into a
 * reload loop (a transient 429/500 → retry → same 429/500 → retry...), which
 * itself hammers the backend far harder than the original hiccup. Any fetch
 * whose failure shouldn't take the whole page down should go through this.
 */
export async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    console.error(error);
    return fallback;
  }
}
