import type { Metadata } from "next";
import "../globals.css";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata: Metadata = {
  title: "Odilia Infinity Wellness - CRM",
  description: "Membership CRM for Spa, Wellness & Gym",
};

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
