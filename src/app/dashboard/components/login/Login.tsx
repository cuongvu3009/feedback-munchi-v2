import React, { useRef, useState } from "react";

import { API_BASE_URL } from "@/utils/constantAPI";
import { ApiResponseLogin } from "@/types/dashboard.types";
import Spinner from "@/components/shared/Spinner";
import TradeMark from "@/app/feedback/components/TradeMark";
import axios from "axios";
import { setCookie } from "cookies-next";
import styles from "./login.module.css";
import { toast } from "react-toastify";

const Login: React.FC = () => {
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

        setCookie("user", JSON.stringify(result.data.result), {
          maxAge: 60 * 6 * 24, // in seconds
        });

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
