"use client";
import { useAuthStore } from "@/store/auth-store";
import useSWR from "swr";

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
  const { data: bookings } = useSWR(
    "/api/admin/dashboard/recent-bookings",
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
            <span className="text-xl">🔔</span>
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
            {/* Simple SVG line chart for mockup */}
            {trend ? (
              <svg
                width="100%"
                height="100"
                viewBox="0 0 320 100"
                className="w-full h-32"
              >
                <polyline
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                  points={trend
                    .map(
                      (d: any, i: number) =>
                        `${i * 53},${100 - d.revenue / 350}`
                    )
                    .join(" ")}
                />
                {trend.map((d: any, i: number) => (
                  <circle
                    key={d.month}
                    cx={i * 53}
                    cy={100 - d.revenue / 350}
                    r="3"
                    fill="#2563eb"
                  />
                ))}
              </svg>
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="font-semibold mb-2">Booking Distribution</div>
          <div className="h-40 flex items-center justify-center text-gray-400">
            {/* Simple SVG pie chart for mockup */}
            {dist ? (
              <svg width="100" height="100" viewBox="0 0 32 32">
                {(() => {
                  let acc = 0;
                  return dist.map((d: any, i: number) => {
                    const start = acc;
                    const val = (d.value / 100) * 100;
                    acc += val;
                    const x1 = 16 + 16 * Math.cos(2 * Math.PI * (start / 100));
                    const y1 = 16 + 16 * Math.sin(2 * Math.PI * (start / 100));
                    const x2 = 16 + 16 * Math.cos(2 * Math.PI * (acc / 100));
                    const y2 = 16 + 16 * Math.sin(2 * Math.PI * (acc / 100));
                    const large = val > 50 ? 1 : 0;
                    return (
                      <path
                        key={d.label}
                        d={`M16,16 L${x1},${y1} A16,16 0 ${large} 1 ${x2},${y2} Z`}
                        fill={d.color}
                        stroke="#fff"
                        strokeWidth="0.5"
                      />
                    );
                  });
                })()}
              </svg>
            ) : (
              <span>Loading...</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {dist &&
              dist.map((d: any) => (
                <span key={d.label} className="flex items-center gap-1 text-xs">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ background: d.color }}
                  />
                  {d.label}
                </span>
              ))}
          </div>
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
              {bookings
                ? bookings.map((b: any) => (
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
                          <span>🔍</span>
                        </button>
                        <button
                          className="hover:text-gray-600"
                          title="Download"
                        >
                          <span>📥</span>
                        </button>
                        <button className="hover:text-gray-600" title="Edit">
                          <span>✏️</span>
                        </button>
                        <button className="hover:text-red-600" title="Delete">
                          <span>🗑️</span>
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
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>Showing 1-6 of 240 bookings</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded border bg-gray-50">
              Previous
            </button>
            <button className="px-2 py-1 rounded border bg-blue-600 text-white">
              1
            </button>
            <button className="px-2 py-1 rounded border bg-gray-50">2</button>
            <button className="px-2 py-1 rounded border bg-gray-50">3</button>
            <button className="px-2 py-1 rounded border bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-gray-50">
          <span className="text-2xl">📝</span>
          <span className="text-xs font-semibold">New Booking</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-gray-50">
          <span className="text-2xl">➕</span>
          <span className="text-xs font-semibold">Add Customer</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-gray-50">
          <span className="text-2xl">📄</span>
          <span className="text-xs font-semibold">Create Invoice</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-gray-50">
          <span className="text-2xl">✉️</span>
          <span className="text-xs font-semibold">Send Email</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-gray-50">
          <span className="text-2xl">⚙️</span>
          <span className="text-xs font-semibold">Settings</span>
        </button>
      </div>
    </div>
  );
}
