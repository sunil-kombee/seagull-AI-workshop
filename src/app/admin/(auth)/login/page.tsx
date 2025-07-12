"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";

const ADMIN_LOGIN_BG = "linear-gradient(135deg, #5b5be6 0%, #6e4ff7 100%)";

const initialState = {
  email: "",
  password: "",
  error: "",
  loading: false,
};

export default function AdminLoginPage() {
  const [state, setState] = useState(initialState);
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value, error: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((s) => ({ ...s, loading: true, error: "" }));
    // Basic validation
    if (!state.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setState((s) => ({
        ...s,
        error: "Invalid email format",
        loading: false,
      }));
      return;
    }
    if (state.password.length < 6) {
      setState((s) => ({
        ...s,
        error: "Password must be at least 6 characters",
        loading: false,
      }));
      return;
    }
    // Dummy API call
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: state.email, password: state.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      setUser({
        id: data.token,
        email: state.email,
        isAuthenticated: true,
        role: data.role,
        token: data.token,
      });
      router.push("/admin/dashboard");
    } catch (err: any) {
      setState((s) => ({ ...s, error: err.message, loading: false }));
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb] flex-col md:flex-row">
      {/* Left branding section */}
      <div
        className="flex-1 flex flex-col justify-center items-start px-6 py-12 md:px-[5vw] md:py-0"
        style={{ background: ADMIN_LOGIN_BG, color: "#fff" }}
      >
        <div className="mb-8 flex items-center gap-3">
          <span className="text-3xl font-bold tracking-wide">🛡️ AdminSys</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Secure Admin Portal
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-md">
          Access your administrative dashboard with enhanced security protocols.
        </p>
      </div>
      {/* Right login form section */}
      <div className="flex-1 flex items-center justify-center w-full py-12 md:py-0">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-md min-w-0"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🛡️</span>
            <span className="text-2xl font-bold">Admin Portal</span>
          </div>
          <label className="font-medium mb-1 block">Email Address</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="admin@company.com"
            className="w-full px-3 py-2 rounded-md border border-gray-300 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#5b5be6]"
            autoComplete="username"
            required
          />
          <label className="font-medium mb-1 block">Password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3 py-2 rounded-md border border-gray-300 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#5b5be6]"
            autoComplete="current-password"
            required
          />
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-[#5b5be6]" /> Remember me
            </label>
            <span className="text-[#5b5be6] text-sm cursor-not-allowed opacity-60">
              Forgot password?
            </span>
          </div>
          {state.error && (
            <div className="text-red-600 mb-3 text-sm">{state.error}</div>
          )}
          <button
            type="submit"
            disabled={state.loading}
            className="w-full bg-[#5b5be6] text-white font-semibold text-lg rounded-md py-3 mb-2 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {state.loading ? "Signing In..." : "Sign In"}
          </button>
          <div className="text-center text-gray-500 text-sm mt-2">
            <span className="inline-flex items-center gap-2">
              <span className="text-base">🛡️</span> Secure, encrypted connection
            </span>
          </div>
          <div className="text-center mt-4">
            <Link
              href="/login"
              className="text-[#5b5be6] hover:underline text-sm font-medium"
            >
              Go to User Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
