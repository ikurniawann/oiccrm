"use client";

import {
  Users,
  TrendingUp,
  CalendarCheck,
  CreditCard,
  UserPlus,
  Gift,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  User,
} from "lucide-react";
import { dashboardStats, members, bookings } from "@/lib/dummy-data";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

function getDaysUntil(dateStr: string) {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function DashboardPage() {
  const stats = dashboardStats;
  const todaysBookings = bookings.filter((b) => b.date === "2026-04-20");
  const expiringMembers = members.filter((m) => {
    const days = getDaysUntil(m.expiryDate);
    return days > 0 && days <= 14;
  });

  const statCards = [
    {
      label: "Total Members",
      value: stats.totalMembers,
      icon: Users,
      change: "+2",
      changeType: "up",
      color: "bg-primary-container",
    },
    {
      label: "Active Members",
      value: stats.activeMembers,
      icon: TrendingUp,
      change: "75%",
      changeType: "up",
      color: "bg-secondary-container",
    },
    {
      label: "Monthly Revenue",
      value: formatCurrency(stats.monthlyRevenue),
      icon: CreditCard,
      change: "+12%",
      changeType: "up",
      color: "bg-surface-container-high",
    },
    {
      label: "Visits This Month",
      value: stats.monthlyVisits,
      icon: CalendarCheck,
      change: "+8%",
      changeType: "up",
      color: "bg-surface-container",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="font-serif text-3xl text-primary">Dashboard</h1>
        <p className="text-on-surface-variant">
          Welcome back, Bayu. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="card-no-border p-6 space-y-4 hover:shadow-ambient transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={22} className="text-white" />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                  stat.changeType === "up"
                    ? "bg-success/10 text-success"
                    : "bg-error/10 text-error"
                }`}
              >
                {stat.changeType === "up" ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-on_surface">{stat.value}</p>
              <p className="text-sm text-on-surface-variant mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Schedule - 2 columns */}
        <div className="xl:col-span-2 card-no-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl text-primary">Today&apos;s Schedule</h2>
            <span className="text-sm text-on-surface-variant">
              {todaysBookings.length} appointments
            </span>
          </div>

          <div className="space-y-3">
            {todaysBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors"
              >
                {/* Time */}
                <div className="text-center min-w-[60px]">
                  <p className="text-lg font-bold text-primary">{booking.time}</p>
                  <p className="text-xs text-on-surface-variant">
                    {booking.duration}min
                  </p>
                </div>

                {/* Divider */}
                <div className="w-px h-12 bg-outline-variant" />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-on_surface truncate flex items-center gap-2">
                    <User size={16} className="text-primary shrink-0" />
                    {booking.memberName}
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    {booking.service}
                  </p>
                </div>

                {/* Therapist */}
                <div className="text-right">
                  <p className="text-sm font-medium text-on_surface">
                    {booking.therapist}
                  </p>
                  <p className="text-xs text-on-surface-variant">{booking.outlet}</p>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === "confirmed"
                      ? "bg-success/10 text-success"
                      : booking.status === "completed"
                      ? "bg-surface-container-high text-on_surface-variant"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - 1 column */}
        <div className="space-y-6">
          {/* Pending Renewal */}
          <div className="card-no-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-primary">
                Expiring Soon
              </h2>
              <span className="text-xs text-on-surface-variant">14 days</span>
            </div>

            <div className="space-y-3">
              {expiringMembers.length === 0 ? (
                <p className="text-sm text-on-surface-variant py-4 text-center">
                  No members expiring soon
                </p>
              ) : (
                expiringMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        member.tier === "platinum"
                          ? "tier-platinum"
                          : member.tier === "gold"
                          ? "tier-gold"
                          : "tier-silver"
                      }`}
                    >
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-on_surface truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Expires {formatDate(member.expiryDate)}
                      </p>
                    </div>
                    <span className="status-pending px-2 py-1 rounded-full text-xs font-medium">
                      {getDaysUntil(member.expiryDate)} days
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card-no-border p-6 space-y-4">
            <h2 className="font-serif text-xl text-primary">Quick Stats</h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-surface-container-low">
                    <UserPlus size={16} className="text-on-surface-variant" />
                  </div>
                  <span className="text-sm text-on_surface">New This Month</span>
                </div>
                <span className="font-semibold text-on_surface">
                  {stats.newMembersThisMonth}
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-surface-container-low">
                    <Clock size={16} className="text-on-surface-variant" />
                  </div>
                  <span className="text-sm text-on_surface">Avg. Visit Frequency</span>
                </div>
                <span className="font-semibold text-on_surface">
                  {stats.averageVisitFrequency}x/mo
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-surface-container-low">
                    <Star size={16} className="text-on-surface-variant" />
                  </div>
                  <span className="text-sm text-on_surface">Pending Renewal</span>
                </div>
                <span className="font-semibold text-warning">
                  {stats.pendingRenewal}
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-surface-container-low">
                    <Gift size={16} className="text-on-surface-variant" />
                  </div>
                  <span className="text-sm text-on_surface">Points Redeemed</span>
                </div>
                <span className="font-semibold text-on_surface">847</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Services */}
      <div className="card-no-border p-6 space-y-4">
        <h2 className="font-serif text-xl text-primary">Top Services This Month</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {stats.topServices.map((service, index) => (
            <div
              key={service.name}
              className="p-4 rounded-xl bg-surface-container-low text-center hover:bg-surface-container transition-colors"
            >
              <div className="flex items-center justify-center mb-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0
                      ? "bg-primary text-white"
                      : index === 1
                      ? "bg-secondary text-white"
                      : index === 2
                      ? "bg-secondary-container text-primary"
                      : "bg-surface-container-high text-primary"
                  }`}
                >
                  {index + 1}
                </span>
              </div>
              <p className="text-sm font-medium text-on_surface">{service.name}</p>
              <p className="text-xs text-on-surface-variant mt-1">
                {service.count} sessions
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
