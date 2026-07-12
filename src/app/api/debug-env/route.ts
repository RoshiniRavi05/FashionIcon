import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    GOOGLE_CLIENT_ID_EXISTS: !!process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET_EXISTS: !!process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET_EXISTS: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL_EXISTS: !!process.env.NEXTAUTH_URL,
    NEXTAUTH_URL_VALUE: process.env.NEXTAUTH_URL || "NOT_SET",
  });
}
