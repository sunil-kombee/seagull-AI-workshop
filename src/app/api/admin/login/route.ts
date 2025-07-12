import { NextResponse } from "next/server";

const USERS = [
  { email: "admin@company.com", password: "Admin@123", role: "Admin" },
  { email: "support@company.com", password: "Support@123", role: "Support" },
  { email: "finance@company.com", password: "Finance@123", role: "Finance" },
];

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = USERS.find((u) => u.email === email && u.password === password);
  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials or unauthorized role." },
      { status: 401 }
    );
  }
  // Dummy token
  const token = Buffer.from(`${user.email}:${user.role}`).toString("base64");
  return NextResponse.json({ token, role: user.role });
}
