"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  Star,
  MoreVertical,
  Edit,
  ClipboardList,
  X,
} from "lucide-react";
import { staff, type Staff } from "@/lib/dummy-data";
import Portal from "@/components/Portal";

interface StaffFormData {
  name: string;
  role: "therapist" | "trainer" | "frontdesk" | "manager";
  outlet: "annathaya" | "thesquare" | "both";
  specialties: string;
}

const initialFormData: StaffFormData = {
  name: "",
  role: "therapist",
  outlet: "annathaya",
  specialties: "",
};

function StaffFormModal({
  mode,
  member,
  onClose,
  onSave,
}: {
  mode: "add" | "edit";
  member?: Staff;
  onClose: () => void;
  onSave: (data: StaffFormData) => void;
}) {
  const [form, setForm] = useState<StaffFormData>(
    member
      ? {
          name: member.name,
          role: member.role,
          outlet: member.outlet,
          specialties: member.specialties.join(", "),
        }
      : initialFormData
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
    onClose();
  }

  function handleChange(field: keyof StaffFormData, value: string) {
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
          className="bg-surface rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-ambient"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Fixed */}
          <div className="shrink-0 p-6 border-b border-outline-variant flex items-center justify-between">
            <h2 className="font-serif text-2xl text-primary">
              {mode === "add" ? "Add New Staff" : "Edit Staff"}
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
          <div className="space-y-1">
            <label className="text-sm text-on-surface-variant">Full Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                errors.name ? "ring-2 ring-error" : ""
              }`}
              placeholder="Enter staff name"
            />
            {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Role *</label>
              <select
                value={form.role}
                onChange={(e) => handleChange("role", e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="therapist">Therapist</option>
                <option value="trainer">Trainer</option>
                <option value="frontdesk">Front Desk</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Outlet *</label>
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

          <div className="space-y-1">
            <label className="text-sm text-on-surface-variant">Specialties (comma separated)</label>
            <input
              type="text"
              value={form.specialties}
              onChange={(e) => handleChange("specialties", e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              placeholder="Aromatherapy, Swedish Massage, Facial"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-outline-variant">
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
              {mode === "add" ? "Add Staff" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      </div>
    </Portal>
  );
}

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterOutlet, setFilterOutlet] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [staffList, setStaffList] = useState<Staff[]>(staff);

  const roles = [...new Set(staffList.map((s) => s.role))];

  const filtered = staffList.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || s.role === filterRole;
    const matchOutlet =
      filterOutlet === "all" || s.outlet === filterOutlet || s.outlet === "both";
    return matchSearch && matchRole && matchOutlet;
  });

  const stats = {
    total: staffList.length,
    therapists: staffList.filter((s) => s.role === "therapist").length,
    trainers: staffList.filter((s) => s.role === "trainer").length,
    avgRating: (
      staffList.reduce((sum, s) => sum + s.rating, 0) / staffList.length
    ).toFixed(1),
  };

  function handleAddStaff(data: StaffFormData) {
    const newStaff: Staff = {
      id: `st${Date.now()}`,
      name: data.name,
      role: data.role,
      outlet: data.outlet as "annathaya" | "thesquare" | "both",
      specialties: data.specialties
        ? data.specialties.split(",").map((s) => s.trim())
        : [],
      rating: 0,
      totalSessions: 0,
    };
    setStaffList((prev) => [...prev, newStaff]);
  }

  function handleEditStaff(data: StaffFormData) {
    if (!selectedStaff) return;
    const updated: Staff = {
      ...selectedStaff,
      name: data.name,
      role: data.role,
      outlet: data.outlet as "annathaya" | "thesquare" | "both",
      specialties: data.specialties
        ? data.specialties.split(",").map((s) => s.trim())
        : [],
    };
    setStaffList((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  }

  function getRoleBadge(role: string) {
    switch (role) {
      case "therapist":
        return (
          <span className="bg-secondary-container text-secondary px-3 py-1 rounded-full text-xs font-medium">
            Therapist
          </span>
        );
      case "trainer":
        return (
          <span className="bg-primary-container text-white px-3 py-1 rounded-full text-xs font-medium">
            Trainer
          </span>
        );
      case "frontdesk":
        return (
          <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-xs font-medium">
            Front Desk
          </span>
        );
      default:
        return (
          <span className="status-active px-3 py-1 rounded-full text-xs font-medium">
            Manager
          </span>
        );
    }
  }

  function getOutletBadge(outlet: string) {
    return (
      <span
        className={`px-2 py-1 rounded-lg text-xs ${
          outlet === "annathaya"
            ? "bg-secondary-container text-secondary"
            : outlet === "thesquare"
            ? "bg-surface-container-high text-on-surface-variant"
            : "bg-primary-container text-white"
        }`}
      >
        {outlet === "both"
          ? "Both"
          : outlet === "annathaya"
          ? "Annathaya"
          : "The Square"}
      </span>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-primary">Staff</h1>
          <p className="text-on-surface-variant mt-1">
            {filtered.length} team members
          </p>
        </div>
        <button
          onClick={() => {
            setShowAddModal(true);
          }}
          className="cta-gradient text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Add Staff
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-no-border p-5">
          <div className="p-2 rounded-lg bg-surface-container-low w-fit mb-3">
            <ClipboardList size={16} className="text-on-surface-variant" />
          </div>
          <p className="text-2xl font-bold text-primary">{stats.total}</p>
          <p className="text-sm text-on-surface-variant mt-1">Total Staff</p>
        </div>
        <div className="card-no-border p-5">
          <div className="p-2 rounded-lg bg-secondary-container w-fit mb-3">
            <span className="text-secondary text-sm">💆</span>
          </div>
          <p className="text-2xl font-bold text-primary">{stats.therapists}</p>
          <p className="text-sm text-on-surface-variant mt-1">Therapists</p>
        </div>
        <div className="card-no-border p-5">
          <div className="p-2 rounded-lg bg-primary-container w-fit mb-3">
            <span className="text-white text-sm">🏋️</span>
          </div>
          <p className="text-2xl font-bold text-primary">{stats.trainers}</p>
          <p className="text-sm text-on-surface-variant mt-1">Trainers</p>
        </div>
        <div className="card-no-border p-5">
          <div className="p-2 rounded-lg bg-warning/10 w-fit mb-3">
            <Star size={16} className="text-warning" />
          </div>
          <p className="text-2xl font-bold text-primary">{stats.avgRating}</p>
          <p className="text-sm text-on-surface-variant mt-1">Avg. Rating</p>
        </div>
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
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
          />
        </div>

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          <option value="all">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
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

      {/* Staff Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <div className="w-16 h-16 rounded-full bg-surface-container-low mx-auto mb-4 flex items-center justify-center">
              <Search size={24} className="text-on-surface-variant" />
            </div>
            <p className="text-on_surface font-medium">No staff found</p>
          </div>
        ) : (
          filtered.map((member) => (
            <div
              key={member.id}
              className="card-no-border p-5 hover:shadow-ambient transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center">
                    <span className="text-xl font-bold text-white">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-on_surface text-lg">
                      {member.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {getRoleBadge(member.role)}
                      {getOutletBadge(member.outlet)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedStaff(member);
                    setShowEditModal(true);
                  }}
                  className="p-2 hover:bg-surface-container-low rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Edit size={18} className="text-on-surface-variant" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-xs text-on-surface-variant mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-1 rounded-lg bg-surface-container text-xs text-on-surface-variant"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-warning" />
                  <span className="font-semibold text-on_surface">{member.rating}</span>
                </div>
                {member.role !== "manager" && member.role !== "frontdesk" && (
                  <p className="text-sm text-on-surface-variant">
                    {member.totalSessions} sessions
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showAddModal && (
        <StaffFormModal
          mode="add"
          onClose={() => {
            setShowAddModal(false);
          }}
          onSave={handleAddStaff}
        />
      )}

      {showEditModal && selectedStaff && (
        <StaffFormModal
          mode="edit"
          member={selectedStaff}
          onClose={() => {
            setShowEditModal(false);
            setSelectedStaff(null);
          }}
          onSave={handleEditStaff}
        />
      )}
    </div>
  );
}
