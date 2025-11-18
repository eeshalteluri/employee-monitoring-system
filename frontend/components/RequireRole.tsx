"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Role = "admin" | "manager" | "employee";

export default function RequireRole({
  children,
  roles,
}: {
  children: ReactNode;
  roles: Role[];
}) {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) redirect("/");

  const userRole = (session as any).role as Role | undefined;

  if (!userRole || !roles.includes(userRole)) {
    return <p className="text-center mt-10">Not authorized</p>;
  }

  return <>{children}</>;
}
