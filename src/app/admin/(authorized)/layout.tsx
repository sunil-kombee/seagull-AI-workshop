"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

const MENU = {
  Admin: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Manage Users", path: "/admin/users" },
    { label: "Finance", path: "/admin/finance" },
    { label: "Support", path: "/admin/support" },
  ],
  Support: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Support Tickets", path: "/admin/support" },
  ],
  Finance: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Finance", path: "/admin/finance" },
  ],
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const role = user?.role || null;

  React.useEffect(() => {
    if (!user || !user.isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  if (!role) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fb" }}>
      <aside
        style={{
          width: 240,
          background: "#fff",
          boxShadow: "2px 0 8px rgba(80,80,120,0.04)",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 22,
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 26 }}>🛡️</span> AdminSys
        </div>
        <nav style={{ flex: 1 }}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {MENU[role as keyof typeof MENU]?.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  style={{
                    color: "#5b5be6",
                    fontWeight: 500,
                    fontSize: 17,
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          style={{
            background: "#e53e3e",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 0",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </aside>
      <main style={{ flex: 1, padding: 48 }}>{children}</main>
    </div>
  );
}
