"use client";

import { redirect } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function useProtectedPage() {
  const { user } = useUser();

  if (!user) {
    return redirect("/dashboard/login");
  }
}
