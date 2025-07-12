"use client";
import { useAuthStore } from "@/store/auth-store";
import useSWR from "swr";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  Bell,
  Search,
  Eye,
  Download,
  Pencil,
  Trash2,
  FilePlus,
  UserPlus,
  FileText,
  Mail,
  Settings as SettingsIcon,
} from "lucide-react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Confirmed"
      ? "bg-green-100 text-green-700"
      : status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : status === "Cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-700";
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
}

export default function AdminDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data: stats } = useSWR("/api/admin/dashboard/overview", fetcher);
  const { data: trend } = useSWR("/api/admin/dashboard/revenue-trend", fetcher);
  const { data: dist } = useSWR(
    "/api/admin/dashboard/booking-distribution",
    fetcher
  );
  // Pagination state
  const [page, setPage] = React.useState(1);
  const pageSize = 6;
  const { data: bookings, isLoading: bookingsLoading } = useSWR(
    `/api/admin/dashboard/recent-bookings?page=${page}&pageSize=${pageSize}`,
    fetcher
  );
  if (!user) return null;

  return (
    <div className="w-full max-w-full px-2 sm:px-4 md:px-8 mx-auto">
      {/* Topbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <input
            className="flex-1 px-4 py-2 rounded-md border border-gray-200 min-w-0"
            placeholder="Search..."
          />
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
          <div className="text-xs text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold">
            ${stats?.totalRevenue?.toLocaleString() ?? "-"}
          </div>
          <div
            className={`text-xs ${
              stats?.totalRevenueChange > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stats?.totalRevenueChange > 0 ? "↑" : "↓"}{" "}
            {stats?.totalRevenueChange}% vs last month
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
          <div className="text-xs text-gray-500">Total Bookings</div>
          <div className="text-2xl font-bold">
            {stats?.totalBookings?.toLocaleString() ?? "-"}
          </div>
          <div
            className={`text-xs ${
              stats?.totalBookingsChange > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stats?.totalBookingsChange > 0 ? "↑" : "↓"}{" "}
            {stats?.totalBookingsChange}% vs last month
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
          <div className="text-xs text-gray-500">Total Users</div>
          <div className="text-2xl font-bold">
            {stats?.totalUsers?.toLocaleString() ?? "-"}
          </div>
          <div
            className={`text-xs ${
              stats?.totalUsersChange > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stats?.totalUsersChange > 0 ? "↑" : "↓"} {stats?.totalUsersChange}%
            vs last month
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
          <div className="text-xs text-gray-500">Conversion Rate</div>
          <div className="text-2xl font-bold">
            {stats?.conversionRate ?? "-"}%
          </div>
          <div
            className={`text-xs ${
              stats?.conversionRateChange > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {stats?.conversionRateChange > 0 ? "↑" : "↓"}{" "}
            {Math.abs(stats?.conversionRateChange ?? 0)}% vs last month
          </div>
        </div>
      </div>
      {/* Charts and Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow col-span-1 lg:col-span-2">
          <div className="font-semibold mb-2 flex items-center justify-between">
            Revenue Trend{" "}
            <span className="text-xs text-gray-400">Last 7 Days</span>
          </div>
          <div className="h-40 flex items-center justify-center text-gray-400">
            {trend ? (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={trend}
                  margin={{ left: 24, right: 24, top: 24, bottom: 24 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 14 }}
                    padding={{ left: 20, right: 20 }}
                  />
                  <YAxis
                    tick={{ fontSize: 14 }}
                    domain={[0, (dataMax: number) => dataMax + 4000]}
                    tickCount={6}
                    padding={{ top: 20, bottom: 20 }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{
                      r: 5,
                      stroke: "#2563eb",
                      strokeWidth: 2,
                      fill: "#fff",
                    }}
                    activeDot={{
                      r: 7,
                      stroke: "#2563eb",
                      strokeWidth: 2,
                      fill: "#2563eb",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="font-semibold mb-2">Booking Distribution</div>
          <div className="h-40 flex items-center justify-center text-gray-400">
            {dist ? (
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie
                    data={dist}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={48}
                    innerRadius={28}
                  >
                    {dist.map((entry: any, idx: number) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <span>Loading...</span>
            )}
          </div>
          {/* Custom Legend */}
          {dist && (
            <div className="flex flex-row flex-wrap items-center justify-center mt-4 gap-x-6 gap-y-2">
              {dist.map((d: any) => (
                <div
                  key={d.label}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: d.color }}
                >
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ background: d.color }}
                  />
                  <span className="font-medium" style={{ color: d.color }}>
                    {d.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Recent Bookings Table */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow mb-8 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold">Recent Bookings</div>
          <div className="flex items-center gap-2">
            <button className="text-xs px-3 py-1 rounded border bg-gray-50 hover:bg-gray-100">
              Filter
            </button>
            <select className="text-xs px-2 py-1 rounded border">
              <option>All Bookings</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 px-3 whitespace-nowrap">Booking ID</th>
                <th className="py-2 px-3 whitespace-nowrap">Customer</th>
                <th className="py-2 px-3 whitespace-nowrap">Date</th>
                <th className="py-2 px-3 whitespace-nowrap">Service</th>
                <th className="py-2 px-3 whitespace-nowrap">Status</th>
                <th className="py-2 px-3 whitespace-nowrap">Amount</th>
                <th className="py-2 px-3 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings && bookings.data
                ? bookings.data.map((b: any) => (
                    <tr key={b.id} className="border-t">
                      <td className="py-2 px-3 font-mono">{b.id}</td>
                      <td className="py-2 px-3">{b.customer}</td>
                      <td className="py-2 px-3">{b.date}</td>
                      <td className="py-2 px-3">{b.service}</td>
                      <td className="py-2 px-3">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="py-2 px-3">${b.amount.toFixed(2)}</td>
                      <td className="py-2 px-3 flex gap-2">
                        <button className="hover:text-blue-600" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="hover:text-gray-600"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="hover:text-gray-600" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="hover:text-red-600" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                : Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="border-t animate-pulse">
                      <td className="py-2 px-3 bg-gray-100">&nbsp;</td>
                      <td className="py-2 px-3 bg-gray-100">&nbsp;</td>
                      <td className="py-2 px-3 bg-gray-100">&nbsp;</td>
                      <td className="py-2 px-3 bg-gray-100">&nbsp;</td>
                      <td className="py-2 px-3 bg-gray-100">&nbsp;</td>
                      <td className="py-2 px-3 bg-gray-100">&nbsp;</td>
                      <td className="py-2 px-3 bg-gray-100">&nbsp;</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-xs text-gray-500 w-full">
            <span>
              Showing {bookings ? (bookings.page - 1) * pageSize + 1 : 1}-
              {bookings
                ? Math.min(bookings.page * pageSize, bookings.total)
                : pageSize}{" "}
              of {bookings ? bookings.total : 0} bookings
            </span>
            <div className="flex gap-1 min-w-max justify-end">
              <button
                className="px-2 py-1 rounded border bg-gray-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              {Array.from({
                length: bookings ? Math.ceil(bookings.total / pageSize) : 1,
              }).map((_, idx) => (
                <button
                  key={idx}
                  className={`px-2 py-1 rounded border ${
                    page === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-50"
                  }`}
                  onClick={() => setPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="px-2 py-1 rounded border bg-gray-50"
                onClick={() =>
                  setPage((p) =>
                    bookings
                      ? Math.min(Math.ceil(bookings.total / pageSize), p + 1)
                      : p + 1
                  )
                }
                disabled={
                  bookings && page === Math.ceil(bookings.total / pageSize)
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-gray-50">
          <FilePlus className="w-6 h-6" />
          <span className="text-xs font-semibold">New Booking</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-gray-50">
          <UserPlus className="w-6 h-6" />
          <span className="text-xs font-semibold">Add Customer</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-gray-50">
          <FileText className="w-6 h-6" />
          <span className="text-xs font-semibold">Create Invoice</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-gray-50">
          <Mail className="w-6 h-6" />
          <span className="text-xs font-semibold">Send Email</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-gray-50">
          <SettingsIcon className="w-6 h-6" />
          <span className="text-xs font-semibold">Settings</span>
        </button>
      </div>
    </div>
  );
}
