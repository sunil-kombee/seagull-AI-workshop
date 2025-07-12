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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

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
    <div className="flex min-h-screen bg-[#f8f9fb]">
      {/* Mobile Hamburger */}
      <button
        className="fixed top-4 right-4 z-30 md:hidden bg-[#183153] text-white p-2 rounded-lg shadow-lg"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Open sidebar"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-menu"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      {/* Sidebar */}
      <aside
        className={
          "fixed z-30 inset-y-0 left-0 w-64 bg-[#183153] text-white flex flex-col justify-between min-h-screen shadow-lg transform transition-transform duration-200 md:relative md:translate-x-0 " +
          (sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0")
        }
      >
        <div>
          <div className="flex items-center gap-2 px-8 py-6">
            <img src="/favicon.ico" alt="AdminSys" className="w-7 h-7" />
            <span className="text-2xl font-bold tracking-wide">AdminSys</span>
          </div>
          <nav className="mt-4">
            <ul className="space-y-1">
              {MENU[role as keyof typeof MENU]?.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className={
                      "block px-8 py-3 rounded-l-full transition-colors font-medium hover:bg-[#254075]" +
                      (typeof window !== "undefined" &&
                      window.location.pathname === item.path
                        ? " bg-[#254075] text-white"
                        : " text-[#b0bed9]")
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-6 mb-2 px-8 text-xs text-[#b0bed9] tracking-wider">
                ADMINISTRATION
              </li>
              <li>
                <a
                  href="#"
                  className="block px-8 py-3 rounded-l-full font-medium hover:bg-[#254075] text-[#b0bed9]"
                  onClick={() => setSidebarOpen(false)}
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-8 py-3 rounded-l-full font-medium hover:bg-[#254075] text-[#b0bed9]"
                  onClick={() => setSidebarOpen(false)}
                >
                  Help & Support
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="px-8 py-6 flex items-center gap-3 border-t border-[#254075]">
          {user && (
            <>
              <div className="w-10 h-10 rounded-full bg-[#254075] flex items-center justify-center font-bold text-lg">
                {user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "AD"}
              </div>
              <div>
                <div className="font-semibold">{user.name || "Admin User"}</div>
                <div className="text-xs text-[#b0bed9]">{user.email}</div>
                <button
                  onClick={handleLogout}
                  className="mt-2 text-xs text-[#e53e3e] hover:underline focus:outline-none"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main content: no max-w, no mx-auto, fill space */}
      <main className="flex-1 p-2 sm:p-4 md:p-8 w-full transition-all duration-200">
        {children}
      </main>
    </div>
  );
}
