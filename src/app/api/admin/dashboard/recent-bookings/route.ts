import { NextResponse } from "next/server";

const BOOKINGS = [
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
  // Additional dummy bookings for pagination
  {
    id: "BK-7835",
    customer: "Chris Evans",
    date: "2023-11-12",
    service: "Standard Package",
    status: "Pending",
    amount: 149.99,
  },
  {
    id: "BK-7836",
    customer: "Natalie Portman",
    date: "2023-11-11",
    service: "Deluxe Package",
    status: "Confirmed",
    amount: 349.99,
  },
  {
    id: "BK-7837",
    customer: "Mark Ruffalo",
    date: "2023-11-11",
    service: "Executive Package",
    status: "Cancelled",
    amount: 499.99,
  },
  {
    id: "BK-7838",
    customer: "Scarlett Johansson",
    date: "2023-11-10",
    service: "Premium Package",
    status: "Confirmed",
    amount: 249.99,
  },
  {
    id: "BK-7839",
    customer: "Tom Hiddleston",
    date: "2023-11-10",
    service: "Standard Package",
    status: "Pending",
    amount: 149.99,
  },
  {
    id: "BK-7840",
    customer: "Samuel Jackson",
    date: "2023-11-09",
    service: "Deluxe Package",
    status: "Confirmed",
    amount: 349.99,
  },
  {
    id: "BK-7841",
    customer: "Gwyneth Paltrow",
    date: "2023-11-09",
    service: "Executive Package",
    status: "Cancelled",
    amount: 499.99,
  },
  {
    id: "BK-7842",
    customer: "Paul Rudd",
    date: "2023-11-08",
    service: "Premium Package",
    status: "Confirmed",
    amount: 249.99,
  },
  {
    id: "BK-7843",
    customer: "Brie Larson",
    date: "2023-11-08",
    service: "Standard Package",
    status: "Pending",
    amount: 149.99,
  },
  {
    id: "BK-7844",
    customer: "Benedict Cumberbatch",
    date: "2023-11-07",
    service: "Deluxe Package",
    status: "Confirmed",
    amount: 349.99,
  },
  {
    id: "BK-7845",
    customer: "Elizabeth Olsen",
    date: "2023-11-07",
    service: "Executive Package",
    status: "Cancelled",
    amount: 499.99,
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "6", 10);
  const total = BOOKINGS.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = BOOKINGS.slice(start, end);
  return NextResponse.json({ data, page, total });
}
