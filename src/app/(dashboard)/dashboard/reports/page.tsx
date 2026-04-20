"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Calendar,
  TrendingUp,
  Users,
  CreditCard,
  BarChart3,
  Filter,
} from "lucide-react";
import { dashboardStats, members, bookings, transactions } from "@/lib/dummy-data";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState("overview");

  const reportTypes = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "members", label: "Members", icon: Users },
    { id: "revenue", label: "Revenue", icon: CreditCard },
    { id: "bookings", label: "Bookings", icon: Calendar },
  ];

  const recentReports = [
    { name: "Monthly Summary - March 2026", date: "2026-04-01", size: "1.2 MB" },
    { name: "Revenue Report - Q1 2026", date: "2026-04-05", size: "2.4 MB" },
    { name: "Member Growth Analysis", date: "2026-04-10", size: "890 KB" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-primary">Reports</h1>
          <p className="text-on-surface-variant mt-1">
            Analytics & insights
          </p>
        </div>
        <button className="cta-gradient text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* Report Type Selector */}
      <div className="flex flex-wrap gap-2">
        {reportTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setReportType(type.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
              reportType === type.id
                ? "bg-primary-container text-white shadow-ambient"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <type.icon size={16} />
            {type.label}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-no-border p-5">
          <div className="p-2 rounded-lg bg-surface-container-low w-fit mb-3">
            <Users size={16} className="text-on-surface-variant" />
          </div>
          <p className="text-2xl font-bold text-primary">{dashboardStats.totalMembers}</p>
          <p className="text-sm text-on-surface-variant mt-1">Total Members</p>
        </div>
        <div className="card-no-border p-5">
          <div className="p-2 rounded-lg bg-success/10 w-fit mb-3">
            <TrendingUp size={16} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-success">
            {formatCurrency(dashboardStats.monthlyRevenue)}
          </p>
          <p className="text-sm text-on-surface-variant mt-1">Monthly Revenue</p>
        </div>
        <div className="card-no-border p-5">
          <div className="p-2 rounded-lg bg-primary-container w-fit mb-3">
            <Calendar size={16} className="text-white" />
          </div>
          <p className="text-2xl font-bold text-primary">{dashboardStats.monthlyVisits}</p>
          <p className="text-sm text-on-surface-variant mt-1">Visits This Month</p>
        </div>
        <div className="card-no-border p-5">
          <div className="p-2 rounded-lg bg-warning/10 w-fit mb-3">
            <CreditCard size={16} className="text-warning" />
          </div>
          <p className="text-2xl font-bold text-primary">
            {dashboardStats.pendingRenewal}
          </p>
          <p className="text-sm text-on-surface-variant mt-1">Pending Renewal</p>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="card-no-border p-6 space-y-4">
        <h2 className="font-serif text-xl text-primary">Revenue Overview</h2>
        <div className="h-64 bg-surface-container-low rounded-xl flex items-center justify-center">
          <div className="text-center">
            <BarChart3 size={48} className="text-on-surface-variant mx-auto mb-3 opacity-50" />
            <p className="text-on-surface-variant">Chart visualization</p>
            <p className="text-xs text-on-surface-variant mt-1">Coming soon</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <div className="card-no-border p-6 space-y-4">
          <h2 className="font-serif text-xl text-primary">Recent Reports</h2>
          <div className="space-y-3">
            {recentReports.map((report, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-on_surface">{report.name}</p>
                  <p className="text-xs text-on-surface-variant">{report.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-on-surface-variant">{report.size}</span>
                  <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
                    <Download size={16} className="text-on-surface-variant" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Services */}
        <div className="card-no-border p-6 space-y-4">
          <h2 className="font-serif text-xl text-primary">Top Services</h2>
          <div className="space-y-3">
            {dashboardStats.topServices.map((service, i) => (
              <div
                key={service.name}
                className="flex items-center gap-3"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i === 0
                      ? "bg-primary text-white"
                      : i === 1
                      ? "bg-secondary text-white"
                      : i === 2
                      ? "bg-secondary-container text-secondary"
                      : "bg-surface-container-high text-primary"
                  }`}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-on_surface">{service.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{service.count}</p>
                  <p className="text-xs text-on-surface-variant">sessions</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
