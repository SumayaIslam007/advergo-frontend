import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server-fetch";

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json(user);
}
