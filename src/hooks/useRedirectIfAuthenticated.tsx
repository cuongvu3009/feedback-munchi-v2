import { redirect } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const useRedirectIfAuthenticated = () => {
  const { user } = useUser();

  if (user) {
    return redirect("/dashboard/businessOption");
  }
};

export default useRedirectIfAuthenticated;
