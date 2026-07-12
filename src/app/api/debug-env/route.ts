export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    TEST_VARIABLE: process.env.TEST_VARIABLE || false,
    GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
  });
}
