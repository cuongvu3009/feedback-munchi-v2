"use client";

import { BusinessProvider } from "@/context/BusinessContext";
import { useAuthContext } from "@/context/AuthContext";
import { useBusinessContext } from "@/context/BusinessContext";
import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userIsLoggedIn } = useAuthContext();
  const businessId = localStorage.getItem("businessId");
  const router = useRouter();

  // Use useEffect to conditionally navigate when the values change.
  useEffect(() => {
    if (userIsLoggedIn) {
      if (businessId) {
        router.push(`/dashboard/${businessId}/info`);
      } else {
        router.push(`/dashboard/businessOption`);
      }
    } else {
      router.push("/dashboard/login");
    }
  }, [userIsLoggedIn, businessId, router]);

  return <BusinessProvider>{children}</BusinessProvider>;
}
