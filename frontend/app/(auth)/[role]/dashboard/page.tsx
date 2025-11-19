'use client';
import RequireRole from "@/components/RequireRole";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const params = useParams<{ role: string }>();

  const router = useRouter();

    useEffect(() => {
      const run = async () => {
        const role = params.role;
  
        const allowed = ["admin", "client", "employee"];
        if (!allowed.includes(role)) {
          router.replace("/");
          return;
        }
  
      run();
      }
    }, [params.role, router]);

  return (
      <main className="p-8">
        <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
        <p>Only admins can see this page.</p>
      </main>
  );
}
