"use client";

import { signIn, signUp } from "@/frontend/lib/auth-client";

export default function LoginPage({params}: {params: {role: string}}) {
  const {role} = params;

  return (
    <button
        onClick={
        () => signIn.social(
        {
            provider: "google",
        }
      )}
      className="px-4 py-2 bg-black text-white rounded"
    >
      Sign in with Google
    </button>
  );
}
