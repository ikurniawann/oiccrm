"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Gift,
  MoreVertical,
  UserPlus,
  Eye,
  Edit,
} from "lucide-react";
import { members } from "@/lib/dummy-data";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getDaysUntil(dateStr: string) {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function getTierBadge(tier: string) {
  switch (tier) {
    case "platinum":
      return <span className="tier-platinum px-3 py-1 rounded-full text-xs font-semibold">Platinum</span>;
    case "gold":
      return <span className="tier-gold px-3 py-1 rounded-full text-xs font-semibold">Gold</span>;
    default:
      return <span className="tier-silver px-3 py-1 rounded-full text-xs font-semibold">Silver</span>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <span className="status-active px-3 py-1 rounded-full text-xs font-medium">Active</span>;
    case "pending":
      return <span className="status-pending px-3 py-1 rounded-full text-xs font-medium">Pending</span>;
    case "expired":
      return <span className="status-expired px-3 py-1 rounded-full text-xs font-medium">Expired</span>;
    default:
      return <span className="status-frozen px-3 py-1 rounded-full text-xs font-medium">Frozen</span>;
  }
}

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [filterTier, setFilterTier] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterOutlet, setFilterOutlet] = useState("all");
  const [selectedMember, setSelectedMember] = useState<typeof members[0] | null>(null);

  const filtered = members.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search);
    const matchTier = filterTier === "all" || m.tier === filterTier;
    const matchStatus = filterStatus === "all" || m.status === filterStatus;
    const matchOutlet = filterOutlet === "all" || m.outlet === filterOutlet || m.outlet === "both";
    return matchSearch && matchTier && matchStatus && matchOutlet;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-primary">Members</h1>
          <p className="text-on-surface-variant mt-1">
            {filtered.length} of {members.length} members
          </p>
        </div>
        <button className="cta-gradient text-on_primary px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <UserPlus size={18} />
          Add Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
          />
        </div>

        {/* Tier Filter */}
        <select
          value={filterTier}
          onChange={(e) => setFilterTier(e.target.value)}
          className="px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          <option value="all">All Tiers</option>
          <option value="platinum">Platinum</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
        </select>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="expired">Expired</option>
          <option value="frozen">Frozen</option>
        </select>

        {/* Outlet Filter */}
        <select
          value={filterOutlet}
          onChange={(e) => setFilterOutlet(e.target.value)}
          className="px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          <option value="all">All Outlets</option>
          <option value="annathaya">Annathaya</option>
          <option value="thesquare">The Square</option>
        </select>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className="card-no-border p-6 cursor-pointer hover:shadow-ambient transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                    member.tier === "platinum"
                      ? "tier-platinum"
                      : member.tier === "gold"
                      ? "tier-gold"
                      : "tier-silver"
                  }`}
                >
                  {member.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-on_surface">{member.name}</p>
                  <p className="text-xs text-on-surface-variant">{member.email}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                <MoreVertical size={18} className="text-on-surface-variant" />
              </button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {getTierBadge(member.tier)}
              {getStatusBadge(member.status)}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <Phone size={14} />
                <span className="truncate">{member.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <MapPin size={14} />
                <span className="truncate">
                  {member.outlet === "both"
                    ? "Annathaya & The Square"
                    : member.outlet === "annathaya"
                    ? "Annathaya"
                    : "The Square"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <Calendar size={14} />
                <span>Joined {formatDate(member.joinDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <Gift size={14} />
                <span>{member.points.toLocaleString()} pts</span>
              </div>
            </div>

            {/* Footer Stats */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-outline-variant">
              <span className="text-xs text-on-surface-variant">
                {member.totalVisits} visits
              </span>
              <span className="text-xs text-on-surface-variant">
                Last: {formatDate(member.lastVisit)}
              </span>
              {member.status !== "expired" && member.status !== "frozen" && (
                <span
                  className={`text-xs font-medium ${
                    getDaysUntil(member.expiryDate) <= 14
                      ? "text-warning"
                      : "text-success"
                  }`}
                >
                  {getDaysUntil(member.expiryDate)} days left
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-surface-container-low mx-auto mb-4 flex items-center justify-center">
            <Search size={24} className="text-on-surface-variant" />
          </div>
          <p className="text-on_surface font-medium">No members found</p>
          <p className="text-sm text-on-surface-variant mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Member Detail Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-surface rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-ambient"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-outline-variant">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
                      selectedMember.tier === "platinum"
                        ? "tier-platinum"
                        : selectedMember.tier === "gold"
                        ? "tier-gold"
                        : "tier-silver"
                    }`}
                  >
                    {selectedMember.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl text-primary">
                      {selectedMember.name}
                    </h2>
                    <div className="flex gap-2 mt-1">
                      {getTierBadge(selectedMember.tier)}
                      {getStatusBadge(selectedMember.status)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-2 hover:bg-surface-container-low rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                  Contact
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low">
                    <Mail size={18} className="text-on-surface-variant" />
                    <span className="text-sm text-on_surface">{selectedMember.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low">
                    <Phone size={18} className="text-on-surface-variant" />
                    <span className="text-sm text-on_surface">{selectedMember.phone}</span>
                  </div>
                </div>
              </div>

              {/* Membership Details */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                  Membership
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-surface-container-low text-center">
                    <p className="text-2xl font-bold text-primary">{selectedMember.totalVisits}</p>
                    <p className="text-xs text-on-surface-variant mt-1">Total Visits</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low text-center">
                    <p className="text-2xl font-bold text-primary">{selectedMember.points.toLocaleString()}</p>
                    <p className="text-xs text-on-surface-variant mt-1">Points</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low text-center">
                    <p className="text-2xl font-bold text-primary">
                      {selectedMember.favouriteServices.length}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1">Fav Services</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low text-center">
                    <p className="text-2xl font-bold text-primary">
                      {getDaysUntil(selectedMember.expiryDate)}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1">Days Left</p>
                  </div>
                </div>
              </div>

              {/* Favourite Services */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                  Favourite Services
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.favouriteServices.map((svc) => (
                    <span
                      key={svc}
                      className="px-3 py-2 rounded-xl bg-surface-container-low text-sm text-on_surface"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedMember.notes && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                    Notes
                  </h3>
                  <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                    <p className="text-sm text-on_surface italic">&quot;{selectedMember.notes}&quot;</p>
                  </div>
                </div>
              )}

              {/* Allergies */}
              {selectedMember.allergies && selectedMember.allergies.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                    Allergies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.allergies.map((allergy) => (
                      <span
                        key={allergy}
                        className="px-3 py-2 rounded-xl bg-error/10 text-error text-sm font-medium"
                      >
                        ⚠️ {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-outline-variant flex gap-3">
              <button className="flex-1 py-3 rounded-xl border border-outline-variant text-on_surface font-medium hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
                <Eye size={18} />
                View Full Profile
              </button>
              <button className="flex-1 cta-gradient text-on_primary py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Edit size={18} />
                Edit Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
