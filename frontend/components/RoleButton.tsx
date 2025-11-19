"use client";

import { signIn } from "next-auth/react";

type RoleButtonProps = {
  role: "admin" | "employee" | "client" | "applicant";
  label: string;
};

export default function RoleButton({ role, label }: RoleButtonProps) {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/", role })}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {label}
    </button>
  );
}
