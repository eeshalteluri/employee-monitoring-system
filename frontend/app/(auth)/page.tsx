import RolePage from "@/components/RolePage"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleSelectionPage() {
  const { data: session, status } = useSession();
  console.log("Session User data: ", session);
  const router = useRouter();

  // Redirect if user already logged in
  useEffect(() => {
    if (status === "authenticated" && session?.user.role) {
      router.replace(`/projects`);
    }
  }, [status, session, router]);

  return (
    <RolePage /> 
  );
}
