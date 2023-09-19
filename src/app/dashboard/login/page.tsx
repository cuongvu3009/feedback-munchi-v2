"use client";

import React, { useRef, useState } from "react";

import { API_BASE_URL } from "@/utils/constantAPI";
import { User } from "@/types/auth.types";
import axios from "axios";
import { redirect } from "next/navigation";
import styles from "./dashboardLogin.module.css";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";

interface ApiResponse {
  data: User | null; // Provide a default type of null for data
  loading: boolean;
  error: Error | null;
}

const Login = () => {
  useRedirectIfAuthenticated();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuthenticate();
  const [response, setResponse] = useState<ApiResponse>({
    data: null,
    loading: false,
    error: null,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      try {
        const result = await axios({
          method: "POST",
          url: `${API_BASE_URL}/auth/`,
          data: {
            email,
            password,
          },
        });

        login(result.data);
        setResponse({ data: result.data.result, loading: false, error: null });
        // redirect("/dashboard");
      } catch (error: any) {
        setResponse({ data: null, loading: false, error });
      }
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
          type="password"
          placeholder="your password here..."
          ref={passwordRef}
          required
        />
        <button
          className={styles.button}
          type="submit"
          disabled={response.loading}
        >
          {response.loading ? "Logging in..." : "Login"}
        </button>
        {response.error && (
          <p className={styles.error}>Login failed. Please try again.</p>
        )}
        {response.data && <p className={styles.success}>Login successful!</p>}
      </form>
    </div>
  );
};

export default Login;
