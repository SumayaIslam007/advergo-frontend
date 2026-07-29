import { NextRequest, NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/auth/cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const registerResponse = await fetch(`${API_BASE_URL}/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const registerData = await registerResponse.json();

  if (!registerResponse.ok) {
    return NextResponse.json(registerData, { status: registerResponse.status });
  }

  // Log the customer straight in after registering -- no reason to make them
  // re-type the same credentials on a separate login screen.
  const identifier = body.email || body.phone;
  const loginResponse = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password: body.password }),
    cache: "no-store",
  });
  if (loginResponse.ok) {
    const loginData = await loginResponse.json();
    await setAuthCookies(loginData.access, loginData.refresh);
  }

  return NextResponse.json(registerData, { status: 201 });
}
