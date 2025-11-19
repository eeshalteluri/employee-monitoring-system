"use client";

import RoleButton from "@/components/RoleButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ROLES = [
  { role: "applicant", label: "Applicant" },
  { role: "employee", label: "Employee" },
  { role: "client", label: "Client" },
  { role: "admin", label: "Admin" },
] as const;

export default function RoleSelectionPage() {
  const { data: session, status } = useSession();
  console.log("Session User data: ", session);
  const router = useRouter();

  // Redirect if user already logged in
  useEffect(() => {
    if (status === "authenticated" && session?.user.role) {
      router.replace(`/${session.user.role}/dashboard`);
    }
  }, [status, session, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Sign in to EMS</h1>
      <p className="text-gray-600">Choose how you want to use the system:</p>

      <div className="flex gap-4">
        {ROLES.map((r) => (
          <RoleButton key={r.role} role={r.role} label={r.label} />
        ))}
      </div>
    </main>
  );
}
