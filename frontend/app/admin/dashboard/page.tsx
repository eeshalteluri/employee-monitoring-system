import RequireRole from "@/components/RequireRole";

export default function AdminDashboardPage() {
  return (
    <RequireRole roles={["admin"]}>
      <main className="p-8">
        <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
        <p>Only admins can see this page.</p>
      </main>
    </RequireRole>
  );
}
