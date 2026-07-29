import { NextRequest, NextResponse } from "next/server";
import { authFetch } from "@/lib/auth/server-fetch";

export async function GET() {
  const response = await authFetch("/wishlist/");
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await authFetch("/wishlist/toggle/", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
