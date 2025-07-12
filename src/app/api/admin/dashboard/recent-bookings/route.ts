import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: "BK-7829",
      customer: "John Smith",
      date: "2023-11-15",
      service: "Premium Package",
      status: "Confirmed",
      amount: 249.99,
    },
    {
      id: "BK-7830",
      customer: "Emily Johnson",
      date: "2023-11-14",
      service: "Standard Package",
      status: "Pending",
      amount: 149.99,
    },
    {
      id: "BK-7831",
      customer: "Michael Brown",
      date: "2023-11-14",
      service: "Deluxe Package",
      status: "Confirmed",
      amount: 349.99,
    },
    {
      id: "BK-7832",
      customer: "Sarah Davis",
      date: "2023-11-13",
      service: "Executive Package",
      status: "Cancelled",
      amount: 499.99,
    },
    {
      id: "BK-7833",
      customer: "Robert Wilson",
      date: "2023-11-13",
      service: "Standard Package",
      status: "Confirmed",
      amount: 149.99,
    },
    {
      id: "BK-7834",
      customer: "Jennifer Lee",
      date: "2023-11-12",
      service: "Premium Package",
      status: "Confirmed",
      amount: 249.99,
    },
  ]);
}
