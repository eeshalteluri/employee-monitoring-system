import { getSession } from "next-auth/react";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const session = await getSession();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (session && (session as any).backendJWT) {
    headers["Authorization"] = `Bearer ${(session as any).backendJWT}`;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`,
    {
      ...options,
      headers,
    }
  );

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
