import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // 接收参数
  const query = request.nextUrl.searchParams;
  return NextResponse.json({
    message: "Hello, Next.js API Route!",
    query: Object.fromEntries(query.entries()),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({
    message: "Data received successfully!",
    body,
  }, { status: 201 });
}