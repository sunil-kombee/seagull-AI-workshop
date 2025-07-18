"use client";

import PageHeader from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, User, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  if (!user) {
    return null;
  }

  return (
    <>
      <PageHeader
        title={`Welcome, ${user.name || user.email}!`}
        description="Manage your bookings, profile, and settings."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Bookings</CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Active</div>
            <p className="text-xs text-muted-foreground">
              View and manage your upcoming trips.
            </p>
            <Link href="/dashboard/bookings" passHref>
              <Button variant="link" className="px-0 pt-2">
                View Bookings
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Profile Information
            </CardTitle>
            <User className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{user.email}</div>
            <p className="text-xs text-muted-foreground">
              {user.mobile ? `Mobile: ${user.mobile}` : ""}
            </p>
            <Link href="/dashboard/profile" passHref>
              <Button variant="link" className="px-0 pt-2">
                Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Settings
            </CardTitle>
            <Settings className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Preferences</div>
            <p className="text-xs text-muted-foreground">
              Manage notifications and payment methods.
            </p>
            <Link href="/dashboard/settings" passHref>
              <Button variant="link" className="px-0 pt-2">
                Go to Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <Button
          variant="destructive"
          size="lg"
          onClick={() => {
            logout();
            toast.success("Logged out successfully");
            router.push("/login");
          }}
        >
          <LogOut className="mr-2 h-5 w-5" /> Log Out
        </Button>
      </div>
    </>
  );
}
