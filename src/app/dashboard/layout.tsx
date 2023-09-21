"use client";

import { useEffect, useState } from "react";

import { BusinessProvider } from "@/context/BusinessContext";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userIsLoggedIn } = useAuthContext();
  const router = useRouter();
  const [businessId, setBusinessId] = useState<string | null>(null);

  useEffect(() => {
    // Check if localStorage is available before using it
    if (typeof window !== "undefined") {
      console.log("client");
      const storedBusinessId = localStorage.getItem("businessId");

      if (storedBusinessId) {
        setBusinessId(JSON.parse(storedBusinessId));
      }

      if (userIsLoggedIn) {
        if (businessId) {
          router.push(`/dashboard/${businessId}/info`);
        } else {
          router.push(`/dashboard/businessOption`);
        }
      } else {
        router.push("/dashboard/login");
      }
    } else {
      console.log("server side, no localstorage");
    }
  }, [userIsLoggedIn, router, businessId]);

  return <BusinessProvider>{children}</BusinessProvider>;
}
