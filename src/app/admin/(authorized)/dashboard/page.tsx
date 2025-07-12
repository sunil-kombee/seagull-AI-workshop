"use client";
import { useAuthStore } from "@/store/auth-store";

export default function AdminDashboardPage() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;
  return (
    <div>
      <h2>
        Logged in as: {user.email} ({user.role})
      </h2>
      <div>Token: {user.token}</div>
    </div>
  );
}
