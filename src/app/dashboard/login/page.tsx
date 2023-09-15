import "./dashboardLogin.css";

import React, { useRef, useState } from "react";

import { User } from "@/types/auth.types";
import axios from "axios";
import { useAuthenticate } from "@/hooks/useAuthenticate";

const API_BASE_URL = "https://munchi-merchant-dev-api-ydtudzlala-lz.a.run.app";

interface ApiResponse {
  data: User | null; // Provide a default type of null for data
  loading: boolean;
  error: Error | null;
}

function App() {
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
          url: `${API_BASE_URL}/auth/signin`,
          data: {
            email,
            password,
          },
        });

        login(result.data);
        setResponse({ data: result.data, loading: false, error: null });
      } catch (error: any) {
        setResponse({ data: null, loading: false, error });
      }
    }
  };

  return (
    <div className="container">
      <h2>Dashboard Manager</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label className="label">Email</label>
        <input
          className="input"
          type="email"
          placeholder="your-email@email.com"
          ref={emailRef}
          required
        />
        <label className="label">Password</label>
        <input
          className="input"
          type="password"
          placeholder="your password here..."
          ref={passwordRef}
          required
        />
        <button className="button" type="submit" disabled={response.loading}>
          {response.loading ? "Logging in..." : "Login"}
        </button>
        {response.error && (
          <p className="error">Login failed. Please try again.</p>
        )}
        {response.data && <p className="success">Login successful!</p>}
      </form>
    </div>
  );
}

export default App;
