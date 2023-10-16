"use client";

import React, { useEffect, useRef, useState } from "react";

import { API_BASE_URL } from "@/utils/constantAPI";
import { ApiResponseLogin } from "@/types/dashboard.types";
import BusinessSelection from "../components/BusinessSelection";
import Sidebar from "@/app/dashboard/components/sidebar/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import Spinner from "@/components/shared/Spinner";
import TradeMark from "@/app/feedback/components/TradeMark";
import axios from "axios";
import getUserBusinesses from "@/lib/getUserBusinesses";
import styles from "./dashboard.module.css";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/AuthContext";
import { useBusinessContext } from "@/context/BusinessContext";
import { useRouter } from "next/navigation";

interface BusinessProps {
  id: number;
  name: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { business } = useBusinessContext();
  const [isLoading, setIsLoading] = useState(true);
  const [businesses, setBusinesses] = useState<BusinessProps[]>([]);
  const { userIsLoggedIn } = useAuthContext();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState<ApiResponseLogin>({
    data: null,
    loading: false,
    error: null,
  });
  const { setUser } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      setResponse({ data: null, loading: true, error: null });

      try {
        const result = await axios({
          method: "POST",
          url: `${API_BASE_URL}/auth/`,
          data: {
            email,
            password,
          },
        });

        setUser(result.data.result);
        setResponse({ data: result.data.result, loading: false, error: null });

        toast.success("Login successful!");
      } catch (error: any) {
        setResponse({ data: null, loading: false, error });

        toast.error(error.message);
      }

      router.push(`/dashboard/admin/`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const businessesData = await getUserBusinesses();
        setBusinesses(businessesData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    <div className={styles.dashboard}>
      <Spinner />
    </div>;
  }

  if (userIsLoggedIn) {
    return (
      <SidebarProvider>
        <div className={styles.dashboard}>
          <Sidebar business={business} />
          <div className={styles.children}>
            <div className={styles.header}>
              <div className={styles.businessSelection}>
                <BusinessSelection businesses={businesses} />
              </div>
            </div>
            {businesses && business && children}
          </div>
        </div>
      </SidebarProvider>
    );
  } else {
    return (
      <div className={styles.container}>
        <h2>Dashboard Manager</h2>
        <form className={`${styles["login-form"]}`} onSubmit={handleLogin}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            placeholder="your-email@email.com"
            ref={emailRef}
            required
          />
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="your password here..."
            ref={passwordRef}
            required
          />

          <label className={styles.passwordShow}>
            <p>Show Password</p>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
          </label>

          <button
            className={styles.button}
            type="submit"
            disabled={response.loading}
          >
            {response.loading ? <Spinner /> : "Login"}
          </button>
        </form>
        <TradeMark />
      </div>
    );
  }
}
