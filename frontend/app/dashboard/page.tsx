// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import AdminDashboard from "@/components/dashboards/AdminDashboard";
import ClientDashboard from "@/components/dashboards/ClientDashboard";
import EmployeeDashboard from "@/components/dashboards/EmployeeDashboard";
import ApplicantDashboard from "@/components/dashboards/ApplicantDashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log("Dashboard Session: ", session);

  if (!session?.user) {
    redirect("/");
  }

  const role = session.user.role;

  switch (role) {
    case "admin":
      return <AdminDashboard />;

    case "client":
      return <ClientDashboard />;

    case "employee":
      return <EmployeeDashboard />;

    case "applicant":
      return <ApplicantDashboard />;

    default:
      redirect("/");
  }
}
