import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { label: "Standard", value: 40, color: "#1e293b" },
    { label: "Premium", value: 30, color: "#38bdf8" },
    { label: "Deluxe", value: 20, color: "#fbbf24" },
    { label: "Executive", value: 10, color: "#f87171" },
  ]);
}
