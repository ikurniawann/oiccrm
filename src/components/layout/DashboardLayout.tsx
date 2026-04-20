"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CreditCard,
  ShoppingBag,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Gift,
  ClipboardList,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Members", href: "/dashboard/members", icon: Users },
  { name: "Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
  { name: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
  { name: "Services", href: "/dashboard/services", icon: ShoppingBag },
  { name: "Rewards", href: "/dashboard/rewards", icon: Gift },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: MessageSquare },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Staff", href: "/dashboard/staff", icon: ClipboardList },
];

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-primary fixed top-0 left-0 right-0 z-50 h-18">
        <div className="flex items-center justify-between h-full px-6">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-white/20 transition-colors text-white"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo - Odilia Infinity */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <h1 className="font-serif text-xl tracking-wide text-white">
                Odilia Infinity
              </h1>
              <p className="text-xs text-white/70 tracking-widest uppercase">
                Wellness
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="font-serif text-lg tracking-wide text-white">
                OI
              </h1>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Outlet Badge */}
            <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
              Annathaya & The Square
            </span>

            {/* User */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  B
                </span>
              </div>
              <div className="hidden sm:block">
<<<<<<< HEAD
                <p className="text-sm font-medium text-white">Bayu</p>
                <p className="text-xs text-white/70">Manager</p>
=======
                <p className="text-sm font-medium text-on_surface">Budi</p>
                <p className="text-xs text-on-surface-variant">Manager</p>
>>>>>>> ee4121dd25bf623183e5c3422f94c0f98775190e
              </div>
            </div>

            <button className="p-2 rounded-lg hover:bg-white/20 transition-colors text-white">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-18 left-0 bottom-0 w-64 z-40
          bg-surface-container-low border-r border-outline-variant
          transform transition-transform duration-300 ease-out
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="flex flex-col h-full pt-4 pb-6 px-3">
          <div className="flex-1 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${isActive
                      ? "bg-primary-container text-white font-medium shadow-ambient"
                      : "text-on-surface-variant hover:bg-surface-container-lowest hover:text-on_surface"
                    }
                  `}
                >
                  <item.icon size={20} />
                  <span className="text-sm">{item.name}</span>
                  {isActive && (
                    <ChevronRight size={16} className="ml-auto opacity-60" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Bottom section */}
          <div className="pt-4 border-t border-outline-variant">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left text-on-surface-variant hover:bg-surface-container-lowest hover:text-on_surface transition-colors">
              <LogOut size={20} />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-18 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
