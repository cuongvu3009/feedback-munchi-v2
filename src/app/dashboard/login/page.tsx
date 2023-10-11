"use client";

import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { API_BASE_URL } from "@/utils/constantAPI";
import Spinner from "@/components/shared/Spinner";
import TradeMark from "@/app/feedback/components/TradeMark";
import { User } from "@/types/auth.types";
import axios from "axios";
import styles from "./dashboardLogin.module.css";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface ApiResponse {
  data: User | null; // Provide a default type of null for data
  loading: boolean;
  error: Error | null;
}

const Login = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState<ApiResponse>({
    data: null,
    loading: false,
    error: null,
  });
  const { userIsLoggedIn, setUser } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (userIsLoggedIn) {
      router.push("/dashboard/admin");
    }
  }, [router, userIsLoggedIn]);

  const loginUser = async (email: string, password: string) => {
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
    } catch (error: any) {
      setResponse({ data: null, loading: false, error });
    }
  };

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
};

export default Login;
