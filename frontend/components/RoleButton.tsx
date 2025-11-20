'use client'

import { useRouter } from "next/navigation";

type RoleButtonProps = {
  role: "admin" | "employee" | "client" | "applicant";
  label: string;
};
        

export default function RoleButton({ role, label }: RoleButtonProps) {
  const router = useRouter();
    
  return (
    <button
      onClick={() => router.push(`/${role}/auth`)}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {label}
    </button>
  );
}
