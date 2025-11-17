"use client";

import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  return (
    <button
        onClick={
        () => signIn.social(
        {
            provider: "google",
        })}
      className="px-4 py-2 bg-black text-white rounded"
    >
      Sign in with Google
    </button>
  );
}
