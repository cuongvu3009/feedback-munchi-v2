"use client";

import React, { useEffect, useRef, useState } from "react";

import { API_BASE_URL } from "@/utils/constantAPI";
import { ApiResponseLogin } from "@/types/dashboard.types";
import Spinner from "@/components/shared/Spinner";
import TradeMark from "@/app/feedback/components/TradeMark";
import axios from "axios";
import styles from "./dashboardLogin.module.css";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userIsLoggedIn) {
      router.push("/dashboard/admin");
    } else {
      setIsLoading(false);
    }
  }, [router, userIsLoggedIn]);

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

  if (isLoading) {
    <div className={styles.container}>
      <Spinner />
    </div>;
  }

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
