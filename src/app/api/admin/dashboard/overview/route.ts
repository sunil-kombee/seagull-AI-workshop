import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    totalRevenue: 158764,
    totalRevenueChange: 12.5,
    totalBookings: 1485,
    totalBookingsChange: 8.2,
    totalUsers: 5347,
    totalUsersChange: 4.3,
    conversionRate: 24.8,
    conversionRateChange: -1.8,
  });
}
