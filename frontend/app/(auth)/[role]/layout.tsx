'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <main className="p-8">
        <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
        <p>Only admins can see this page.</p>
      </main>
  );
}
