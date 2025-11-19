import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  
  try{
    const { role } = await req.json();

  const allowed = ["applicant" ,"admin", "client", "employee"];
  const sanitized = allowed.includes(role) ? role : "employee";

  const res = NextResponse.json({ ok: true });

  const _cookies = await cookies();
  _cookies.set("selected_role", sanitized, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: "/",
    maxAge: 60 * 10, // 10 minutes
  });

  return res;
}catch(error){
  return NextResponse.json({error: "Error setting the role"}, {status: 500});
}
}
