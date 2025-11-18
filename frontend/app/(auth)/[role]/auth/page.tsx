"use client";

import { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RoleAuthPage() {
  const params = useParams<{ role: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("callbackUrl") ?? `/${params.role}/dashboard`;

  useEffect(() => {
    const run = async () => {
      const role = params.role;

      const allowed = ["admin", "manager", "employee"];
      if (!allowed.includes(role)) {
        router.replace("/");
        return;
      }

      // Set role cookie for NextAuth callback
      await fetch("/api/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      // Now trigger Google sign-in
      await signIn("google", {
        callbackUrl: redirectTo,
      });
    };

    run();
  }, [params.role, redirectTo, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-3">
      <p className="text-xl font-medium">
        Redirecting to Google to sign in as <span className="font-bold">{params.role}</span>…
      </p>
      <p className="text-gray-500 text-sm">If nothing happens, refresh the page.</p>
    </main>
  );
}
