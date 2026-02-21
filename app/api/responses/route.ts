import { NextRequest, NextResponse } from "next/server";

// In-memory store (resets on cold start, but we also persist via webhook/email)
// This acts as a temporary buffer that can be read via GET
const responses: Array<{ submittedAt: string; answers: Record<string, string> }> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    responses.push(body);
    return NextResponse.json({ ok: true, count: responses.length });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  // Simple auth check
  if (process.env.ADMIN_KEY && key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ count: responses.length, responses });
}
