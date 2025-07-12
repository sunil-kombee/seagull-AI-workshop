"use client";

import MainLayout from "@/components/layout/MainLayout";
import { useAuthStore } from "@/store/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function BookingsPage() {
  const { user } = useAuthStore();

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">My Bookings</CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            {user?.purchasedServices && user.purchasedServices.length > 0 ? (
              <div className="space-y-3">
                {user.purchasedServices.map((item, idx) => (
                  <div key={idx} className="border rounded p-2 bg-muted/50">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {item.category}
                    </div>
                    {item.bookingDate && (
                      <div className="text-xs">
                        {new Date(item.bookingDate).toLocaleDateString()}{" "}
                        {item.bookingTime}
                      </div>
                    )}
                    <div className="text-xs text-primary font-bold">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: item.currency,
                      }).format(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground text-sm">
                No purchased services yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
