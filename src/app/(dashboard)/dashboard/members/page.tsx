"use client";

import { useState } from "react";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Gift,
  MoreVertical,
  UserPlus,
  Eye,
  Edit,
  X,
} from "lucide-react";
import { members, type Member } from "@/lib/dummy-data";
import Portal from "@/components/Portal";

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

// Form fields interface
interface MemberFormData {
  name: string;
  email: string;
  phone: string;
  tier: "silver" | "gold" | "platinum";
  status: "active" | "pending" | "expired" | "frozen";
  outlet: "annathaya" | "thesquare" | "both";
  birthDate: string;
  gender: "male" | "female" | "other";
  joinDate: string;
  expiryDate: string;
  points: number;
  notes: string;
  allergies: string;
  favouriteServices: string;
}

const initialFormData: MemberFormData = {
  name: "",
  email: "",
  phone: "",
  tier: "silver",
  status: "pending",
  outlet: "annathaya",
  birthDate: "",
  gender: "female",
  joinDate: new Date().toISOString().split("T")[0],
  expiryDate: "",
  points: 0,
  notes: "",
  allergies: "",
  favouriteServices: "",
};

function MemberFormModal({
  mode,
  member,
  onClose,
  onSave,
}: {
  mode: "add" | "edit";
  member?: Member;
  onClose: () => void;
  onSave: (data: MemberFormData) => void;
}) {
  const [form, setForm] = useState<MemberFormData>(
    member
      ? {
          name: member.name,
          email: member.email,
          phone: member.phone,
          tier: member.tier,
          status: member.status,
          outlet: member.outlet,
          birthDate: member.birthDate,
          gender: member.gender,
          joinDate: member.joinDate,
          expiryDate: member.expiryDate,
          points: member.points,
          notes: member.notes || "",
          allergies: member.allergies?.join(", ") || "",
          favouriteServices: member.favouriteServices.join(", "),
        }
      : initialFormData
  );

  const [errors, setErrors] = useState<any>({});

  function validate(): boolean {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.joinDate) newErrors.joinDate = "Join date is required";
    if (!form.expiryDate) newErrors.expiryDate = "Expiry date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
    onClose();
  }

  function handleChange(field: keyof MemberFormData, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev: Record<string, string>) => { const next = { ...prev }; delete next[field]; return next; });
  }

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
        style={{ zIndex: 60 }}
        onClick={onClose}
      >
        <div
          className="bg-surface rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-ambient"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Fixed */}
          <div className="shrink-0 p-6 border-b border-outline-variant flex items-center justify-between">
            <h2 className="font-serif text-2xl text-primary">
              {mode === "add" ? "Add New Member" : "Edit Member"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-container-low rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form - Scrollable */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-on-surface-variant">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                      errors.name ? "ring-2 ring-error" : ""
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-on-surface-variant">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                      errors.email ? "ring-2 ring-error" : ""
                    }`}
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-on-surface-variant">Phone *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                      errors.phone ? "ring-2 ring-error" : ""
                    }`}
                    placeholder="+62 812 3456 7890"
                  />
                  {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-on-surface-variant">Date of Birth</label>
                  <input
                    type="date"
                    value={form.birthDate}
                    onChange={(e) => handleChange("birthDate", e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-on-surface-variant">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-on-surface-variant">Outlet</label>
                  <select
                    value={form.outlet}
                    onChange={(e) => handleChange("outlet", e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    <option value="annathaya">Annathaya</option>
                    <option value="thesquare">The Square</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Membership Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                Membership Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-on-surface-variant">Tier</label>
                  <select
                    value={form.tier}
                    onChange={(e) => handleChange("tier", e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-on-surface-variant">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                    <option value="frozen">Frozen</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-on-surface-variant">Join Date *</label>
                  <input
                    type="date"
                    value={form.joinDate}
                    onChange={(e) => handleChange("joinDate", e.target.value)}
                    className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                      errors.joinDate ? "ring-2 ring-error" : ""
                    }`}
                  />
                  {errors.joinDate && <p className="text-xs text-error mt-1">{errors.joinDate}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-on-surface-variant">Expiry Date *</label>
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) => handleChange("expiryDate", e.target.value)}
                    className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                      errors.expiryDate ? "ring-2 ring-error" : ""
                    }`}
                  />
                  {errors.expiryDate && <p className="text-xs text-error mt-1">{errors.expiryDate}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-on-surface-variant">Points</label>
                  <input
                    type="number"
                    value={form.points}
                    onChange={(e) => handleChange("points", parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                Additional Information
              </h3>

              <div className="space-y-1">
                <label className="text-sm text-on-surface-variant">Allergies (comma separated)</label>
                <input
                  type="text"
                  value={form.allergies}
                  onChange={(e) => handleChange("allergies", e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  placeholder="Lavender, Peppermint"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-on-surface-variant">Favourite Services (comma separated)</label>
                <input
                  type="text"
                  value={form.favouriteServices}
                  onChange={(e) => handleChange("favouriteServices", e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  placeholder="Aromatherapy Massage, Hot Stone Therapy"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-on-surface-variant">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                  rows={3}
                  placeholder="Any special notes about this member..."
                />
              </div>
            </div>

            {/* Footer - Fixed */}
            <div className="shrink-0 flex gap-3 pt-4 border-t border-outline-variant">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-outline-variant text-on_surface font-medium hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 cta-gradient text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                {mode === "add" ? "Add Member" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [filterTier, setFilterTier] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterOutlet, setFilterOutlet] = useState("all");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [memberList, setMemberList] = useState<Member[]>(members);

  const filtered = memberList.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search);
    const matchTier = filterTier === "all" || m.tier === filterTier;
    const matchStatus = filterStatus === "all" || m.status === filterStatus;
    const matchOutlet = filterOutlet === "all" || m.outlet === filterOutlet || m.outlet === "both";
    return matchSearch && matchTier && matchStatus && matchOutlet;
  });

  function handleAddMember(data: MemberFormData) {
    const newMember: Member = {
      id: `m${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      tier: data.tier,
      status: data.status,
      outlet: data.outlet as "annathaya" | "thesquare" | "both",
      birthDate: data.birthDate || "1990-01-01",
      gender: data.gender,
      joinDate: data.joinDate,
      expiryDate: data.expiryDate,
      points: data.points,
      lastVisit: data.joinDate,
      favouriteServices: data.favouriteServices
        ? data.favouriteServices.split(",").map((s) => s.trim())
        : [],
      notes: data.notes,
      totalVisits: 0,
      allergies: data.allergies
        ? data.allergies.split(",").map((s) => s.trim())
        : undefined,
    };
    setMemberList((prev) => [newMember, ...prev]);
  }

  function handleEditMember(data: MemberFormData) {
    if (!selectedMember) return;
    const updated: Member = {
      ...selectedMember,
      name: data.name,
      email: data.email,
      phone: data.phone,
      tier: data.tier,
      status: data.status,
      outlet: data.outlet as "annathaya" | "thesquare" | "both",
      birthDate: data.birthDate || selectedMember.birthDate,
      gender: data.gender,
      joinDate: data.joinDate,
      expiryDate: data.expiryDate,
      points: data.points,
      favouriteServices: data.favouriteServices
        ? data.favouriteServices.split(",").map((s) => s.trim())
        : [],
      notes: data.notes || undefined,
      allergies: data.allergies
        ? data.allergies.split(",").map((s) => s.trim())
        : undefined,
    };
    setMemberList((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
    setSelectedMember(updated);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-primary">Members</h1>
          <p className="text-on-surface-variant mt-1">
            {filtered.length} of {memberList.length} members
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="cta-gradient text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <UserPlus size={18} />
          Add Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMember(member);
                  setShowEditModal(true);
                }}
                className="p-2 hover:bg-surface-container-low rounded-lg transition-colors"
              >
                <MoreVertical size={18} className="text-on-surface-variant" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {getTierBadge(member.tier)}
              {getStatusBadge(member.status)}
            </div>

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

      {/* Detail Modal */}
      {selectedMember && !showEditModal && (
        <Portal>
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            style={{ zIndex: 60 }}
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="bg-surface rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-ambient"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="shrink-0 p-6 border-b border-outline-variant">
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
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
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

              {selectedMember.favouriteServices.length > 0 && (
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
              )}

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

            <div className="shrink-0 p-6 border-t border-outline-variant flex gap-3">
              <button
                onClick={() => setSelectedMember(null)}
                className="flex-1 py-3 rounded-xl border border-outline-variant text-on_surface font-medium hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2"
              >
                Close
              </button>
              <button
                onClick={() => setShowEditModal(true)}
                className="flex-1 cta-gradient text-on_primary py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Edit size={18} />
                Edit Member
              </button>
            </div>
          </div>
          </div>
        </Portal>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <MemberFormModal
          mode="add"
          onClose={() => setShowAddModal(false)}
          onSave={handleAddMember}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && selectedMember && (
        <MemberFormModal
          mode="edit"
          member={selectedMember}
          onClose={() => {
            setShowEditModal(false);
            setSelectedMember(null);
          }}
          onSave={handleEditMember}
        />
      )}
    </div>
  );
}
