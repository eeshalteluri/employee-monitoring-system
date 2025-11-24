import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProjectTable from "@/components/tables/ProjectTable";
import { redirect } from "next/navigation";

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) redirect("/");

  const role = session.user.role;

  return (
    <div className="w-full p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Projects</h1>
      <p className="text-muted-foreground text-sm">
        Manage all project operations, tracking, assignments and client workflows.
      </p>

      {/* New table — it fetches from backend itself */}
      <ProjectTable role={role} />
    </div>
  );
}
