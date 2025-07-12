"use client";
import { useAuthStore } from "@/store/auth-store";

export default function AdminDashboardPage() {
  const user = useAuthStore((s) => s.user);
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
          <div className="text-2xl font-bold">$158,764</div>
          <div className="text-xs text-green-600">↑ 12.5% vs last month</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
          <div className="text-xs text-gray-500">Total Bookings</div>
          <div className="text-2xl font-bold">1,485</div>
          <div className="text-xs text-green-600">↑ 8.2% vs last month</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
          <div className="text-xs text-gray-500">Total Users</div>
          <div className="text-2xl font-bold">5,347</div>
          <div className="text-xs text-green-600">↑ 4.3% vs last month</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
          <div className="text-xs text-gray-500">Conversion Rate</div>
          <div className="text-2xl font-bold">24.8%</div>
          <div className="text-xs text-red-600">↓ 1.8% vs last month</div>
        </div>
      </div>
      {/* Charts and Distribution (placeholders) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow col-span-1 lg:col-span-2">
          <div className="font-semibold mb-2">Revenue Trend</div>
          <div className="h-40 flex items-center justify-center text-gray-400">
            [Chart Placeholder]
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="font-semibold mb-2">Booking Distribution</div>
          <div className="h-40 flex items-center justify-center text-gray-400">
            [Pie Chart Placeholder]
          </div>
        </div>
      </div>
      {/* Recent Bookings Table (placeholder) */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow mb-8 overflow-x-auto">
        <div className="font-semibold mb-4">Recent Bookings</div>
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
              {/* Table rows will be rendered here with mock/test data */}
            </tbody>
          </table>
        </div>
      </div>
      {/* Quick Actions (placeholder) */}
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
