import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { month: "Jan", revenue: 9000 },
    { month: "Feb", revenue: 16000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 27000 },
    { month: "Jun", revenue: 30000 },
    { month: "Jul", revenue: 32000 },
  ]);
}
