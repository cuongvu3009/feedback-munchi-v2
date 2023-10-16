"use client";

import React, { useEffect, useRef, useState } from "react";

import { API_BASE_URL } from "@/utils/constantAPI";
import { ApiResponseLogin } from "@/types/dashboard.types";
import BusinessSelection from "../components/BusinessSelection";
import Cookies from "js-cookie";
import Sidebar from "@/app/dashboard/components/sidebar/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import Spinner from "@/components/shared/Spinner";
import TradeMark from "@/app/feedback/components/TradeMark";
import axios from "axios";
import styles from "./dashboard.module.css";
import { toast } from "react-toastify";
import { useBusinessContext } from "@/context/BusinessContext";

interface BusinessProps {
  id: number;
  name: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { business } = useBusinessContext();
  const [isLoading, setIsLoading] = useState(false); // Set initial isLoading to false
  const [businesses, setBusinesses] = useState<BusinessProps[]>([]);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState<ApiResponseLogin>({
    data: null,
    loading: false,
    error: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setIsUser(true);
      const userCookieData = JSON.parse(userCookie);
      const fetchData = async () => {
        try {
          const businessesData = await axios.get(
            `${API_BASE_URL}/users/${userCookieData.id}?params=businesses`,
            {
              headers: {
                Authorization: `Bearer ${userCookieData.session.access_token}`,
              },
            }
          );
          setBusinesses(businessesData.data.result.businesses);
        } catch (error) {
          setIsLoading(false);
        }
      };

      fetchData();
    } else {
      setIsLoading(false);
    }
  }, []);

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

        Cookies.set("user", JSON.stringify(result.data.result), { expires: 3 });
        setResponse({ data: result.data.result, loading: false, error: null });
        toast.success("Login successful!");
        window.location.reload();
      } catch (error: any) {
        setResponse({ data: null, loading: false, error });
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.dashboard}>
          <Spinner />
        </div>
      ) : isUser ? (
        // Dashboard section
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
      ) : (
        // Login section
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
      )}
    </>
  );
}
