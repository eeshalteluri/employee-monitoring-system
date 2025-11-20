import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProjectTable from "@/components/tables/ProjectTable";
import { redirect } from "next/navigation";

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);
  console.log("BACKEND JWT from session =", session?.backendJWT);

  if (!session || !session.user) {
    redirect("/");
  }

  const role = session ? session.user.role : null;

  if (!role) {
    return <div>You do not have permission to view projects.</div>;
  }

  // ---- Fetch projects from backend ----
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.backendJWT}`, // <-- REQUIRED
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div>Error fetching projects</div>;
  }

  const data = await res.json();
  const projects = data.items; // because backend returns: { items, total, page, ... }
  console.log("Projects: ", projects);

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-semibold mb-4">Projects</h1>
      <ProjectTable projects={projects} role={role} />
    </div>
  );
}
