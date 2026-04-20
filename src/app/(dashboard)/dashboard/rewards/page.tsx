"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Gift,
  Star,
  TrendingUp,
  Calendar,
  Users,
  ChevronDown,
} from "lucide-react";
import { members } from "@/lib/dummy-data";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function RewardsPage() {
  const [search, setSearch] = useState("");
  const [filterTier, setFilterTier] = useState("all");

  const topMembers = [...members]
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  const rewards = [
    {
      id: "r001",
      name: "Aromatherapy Massage",
      points: 350,
      price: 350000,
      category: "Spa",
      popularity: 95,
    },
    {
      id: "r002",
      name: "Hot Stone Therapy",
      points: 500,
      price: 500000,
      category: "Spa",
      popularity: 88,
    },
    {
      id: "r003",
      name: "Personal Training Session",
      points: 300,
      price: 300000,
      category: "Fitness",
      popularity: 82,
    },
    {
      id: "r004",
      name: "Royal Javanese Treatment",
      points: 750,
      price: 750000,
      category: "Signature",
      popularity: 76,
    },
    {
      id: "r005",
      name: "Facial Treatment",
      points: 350,
      price: 350000,
      category: "Skin Care",
      popularity: 70,
    },
    {
      id: "r006",
      name: "CrossFit Class",
      points: 220,
      price: 220000,
      category: "Fitness",
      popularity: 65,
    },
  ];

  const stats = {
    totalRewards: rewards.length,
    totalRedeemed: 847,
    activeMembers: members.filter((m) => m.status === "active").length,
    avgPoints: Math.round(
      members.reduce((sum, m) => sum + m.points, 0) / members.length
    ),
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-primary">Rewards</h1>
          <p className="text-on-surface-variant mt-1">
            Loyalty program management
          </p>
        </div>
        <button className="cta-gradient text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus size={18} />
          Add Reward
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-no-border p-5">
          <div className="p-2 rounded-lg bg-surface-container-low w-fit mb-3">
            <Gift size={16} className="text-on-surface-variant" />
          </div>
          <p className="text-2xl font-bold text-primary">{stats.totalRewards}</p>
          <p className="text-sm text-on-surface-variant mt-1">Available Rewards</p>
        </div>
        <div className="card-no-border p-5">
          <div className="p-2 rounded-lg bg-warning/10 w-fit mb-3">
            <TrendingUp size={16} className="text-warning" />
          </div>
          <p className="text-2xl font-bold text-primary">{stats.totalRedeemed}</p>
          <p className="text-sm text-on-surface-variant mt-1">Points Redeemed</p>
        </div>
        <div className="card-no-border p-5">
          <div className="p-2 rounded-lg bg-success/10 w-fit mb-3">
            <Users size={16} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-primary">{stats.activeMembers}</p>
          <p className="text-sm text-on-surface-variant mt-1">Active Members</p>
        </div>
        <div className="card-no-border p-5">
          <div className="p-2 rounded-lg bg-primary-container w-fit mb-3">
            <Star size={16} className="text-white" />
          </div>
          <p className="text-2xl font-bold text-primary">
            {stats.avgPoints.toLocaleString()}
          </p>
          <p className="text-sm text-on-surface-variant mt-1">Avg. Points</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Rewards Catalog */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl text-primary">Rewards Catalog</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="card-no-border p-5 hover:shadow-ambient transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-on_surface">{reward.name}</p>
                    <span className="text-xs text-on-surface-variant">
                      {reward.category}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Gift size={16} className="text-warning" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-warning">
                      {reward.points.toLocaleString()} pts
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {formatCurrency(reward.price)} value
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                      <Star size={12} className="text-warning" />
                      <span>{reward.popularity}%</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">
                      popularity
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl text-primary">Points Leaderboard</h2>

          <div className="card-no-border p-5 space-y-4">
            {topMembers.map((member, index) => (
              <div
                key={member.id}
                className="flex items-center gap-3"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0
                      ? "tier-gold text-primary"
                      : index === 1
                      ? "bg-surface-container-high text-on-surface-variant"
                      : index === 2
                      ? "bg-secondary-container text-secondary"
                      : "bg-surface-container-low text-on-surface-variant"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-on_surface truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {member.tier} • {member.totalVisits} visits
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-warning">
                    {member.points.toLocaleString()}
                  </p>
                  <p className="text-xs text-on-surface-variant">pts</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
