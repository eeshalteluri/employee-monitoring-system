// app/projects/new/page.tsx
import { ProjectForm } from "@/components/project-form";

export default function NewProjectPage() {
  return (
    <div className="w-full p-6">
      <ProjectForm mode="create" />
    </div>
  );
}
