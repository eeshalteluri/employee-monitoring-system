import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { role } = await req.json();

  const allowed = ["applicant" ,"admin", "client", "employee"];
  const sanitized = allowed.includes(role) ? role : "employee";

  const res = NextResponse.json({ ok: true });

  // non-HttpOnly so we can debug; in prod you might want HttpOnly from backend
  res.cookies.set("selected_role", sanitized, {
    path: "/",
    maxAge: 60 * 10, // 10 minutes
  });

  return res;
}
