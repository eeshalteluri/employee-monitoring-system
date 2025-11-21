// app/projects/[id]/edit/page.tsx
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ProjectForm } from "@/components/project-form";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getProject(id: string, session: Session) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.backendJWT}`, // <-- REQUIRED
      },
      cache: "no-store",
    }
  );
  console.log("Project ID Response: ", res);

  if (!res.ok) {
    throw new Error("Failed to load project");
  }

  const data = await res.json();
  // Ensure the backend returns fields compatible with ProjectFormValues
  return {
    id: data._id,
    ...data,
  };
}

export default async function EditProjectPage({ params }: Props) {
    const {id} = await params;
    const session = await getServerSession(authOptions);
  
    if (!session || !session.user) {
      redirect("/");
    }
  
    const role = session ? session.user.role : null;
  
    if (!role) {
      return <div>You do not have permission to view projects.</div>;
    }

    const project = await getProject(id, session);

  return (
    <div className="w-full p-6">
      <ProjectForm mode="edit" initialData={project} />
    </div>
  );
}
