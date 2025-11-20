"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RoleAuthPage() {
  const params = useParams<{ role: string }>();
  const router = useRouter();

  const role = params.role;
  const redirectTo = `/projects`;

  useEffect(() => {
    const run = async () => {
      
      await fetch("/api/auth/set-role", {
        method: "POST",
        body: JSON.stringify({ role }),
      });

      await signIn('google', { 
        callbackUrl: redirectTo
      });
    };

    run();
  }, [role]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-3">
      <p className="text-xl font-medium">
        Redirecting to Google to sign in as{" "}
        <span className="font-bold">{role}</span>…
      </p>

      <p className="text-gray-500 text-sm">If nothing happens, refresh the page.</p>
    </main>
  );
}
