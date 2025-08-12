import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const body = "Hello from the GET method!";
  return NextResponse.json({ message: body });
}
