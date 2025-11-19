"use client";

import { useRouter } from "next/navigation";

const ROLES = [
  { id: "applicant", label: "Applicant" },
  { id: "employee", label: "Employee" },
  { id: "client", label: "Client" },
  { id: "admin", label: "Admin" },
] as const;

export default function RoleSelectionPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Sign in to EMS</h1>
      <p className="text-gray-600">Choose how you want to use the system:</p>
      <div className="flex gap-4">
        {ROLES.map((role) => (
          <button
            key={role.id}
            onClick={() => router.push(`/${role.id}/auth`)}
            className="px-6 py-3 rounded-xl border text-lg hover:bg-gray-100"
          >
            {role.label}
          </button>
        ))}
      </div>
    </main>
  );
}
