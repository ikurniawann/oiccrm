"use client";

import { useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  Edit,
  User,
} from "lucide-react";
import { bookings, members, services, staff, type Booking } from "@/lib/dummy-data";
import Portal from "@/components/Portal";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStatusBadge(status: string) {
  switch (status) {
    case "confirmed":
      return <span className="status-active px-3 py-1 rounded-full text-xs font-medium">Confirmed</span>;
    case "completed":
      return <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-xs font-medium">Completed</span>;
    case "cancelled":
      return <span className="status-expired px-3 py-1 rounded-full text-xs font-medium">Cancelled</span>;
    default:
      return <span className="status-pending px-3 py-1 rounded-full text-xs font-medium">No Show</span>;
  }
}

interface BookingFormData {
  memberId: string;
  service: string;
  therapist: string;
  date: string;
  time: string;
  outlet: string;
  status: "confirmed" | "completed" | "cancelled" | "no-show";
  duration: number;
  notes: string;
}

const initialFormData: BookingFormData = {
  memberId: "",
  service: "",
  therapist: "",
  date: new Date().toISOString().split("T")[0],
  time: "10:00",
  outlet: "Annathaya",
  status: "confirmed",
  duration: 60,
  notes: "",
};

function BookingFormModal({
  mode,
  booking,
  onClose,
  onSave,
}: {
  mode: "add" | "edit";
  booking?: Booking;
  onClose: () => void;
  onSave: (data: BookingFormData) => void;
}) {
  const [form, setForm] = useState<BookingFormData>(
    booking
      ? {
          memberId: booking.memberId,
          service: booking.service,
          therapist: booking.therapist,
          date: booking.date,
          time: booking.time,
          outlet: booking.outlet,
          status: booking.status,
          duration: booking.duration,
          notes: booking.notes || "",
        }
      : initialFormData
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: any = {};
    if (!form.memberId) newErrors.memberId = "Member is required";
    if (!form.service) newErrors.service = "Service is required";
    if (!form.therapist) newErrors.therapist = "Therapist is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.time) newErrors.time = "Time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
    onClose();
  }

  function handleChange(field: keyof BookingFormData, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev: Record<string, string>) => { const next = { ...prev }; delete next[field]; return next; });
  }

  const serviceOptions = services.filter(
    (s) => s.outlet === form.outlet || s.outlet === "both"
  );
  const therapistOptions = staff.filter(
    (s) =>
      s.outlet === form.outlet ||
      s.outlet === "both" ||
      (s.role === "therapist" || s.role === "trainer")
  );

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
              {mode === "add" ? "New Booking" : "Edit Booking"}
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Outlet *</label>
              <select
                value={form.outlet}
                onChange={(e) => {
                  handleChange("outlet", e.target.value);
                  handleChange("service", "");
                  handleChange("therapist", "");
                }}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="Annathaya">Annathaya</option>
                <option value="The Square">The Square</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Date *</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                  errors.date ? "ring-2 ring-error" : ""
                }`}
              />
              {errors.date && <p className="text-xs text-error mt-1">{errors.date}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Member *</label>
              <select
                value={form.memberId}
                onChange={(e) => handleChange("memberId", e.target.value)}
                className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer ${
                  errors.memberId ? "ring-2 ring-error" : ""
                }`}
              >
                <option value="">Select member</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              {errors.memberId && <p className="text-xs text-error mt-1">{errors.memberId}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Time *</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                  errors.time ? "ring-2 ring-error" : ""
                }`}
              />
              {errors.time && <p className="text-xs text-error mt-1">{errors.time}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Service *</label>
              <select
                value={form.service}
                onChange={(e) => handleChange("service", e.target.value)}
                className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer ${
                  errors.service ? "ring-2 ring-error" : ""
                }`}
              >
                <option value="">Select service</option>
                {serviceOptions.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.duration}min)
                  </option>
                ))}
              </select>
              {errors.service && <p className="text-xs text-error mt-1">{errors.service}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Therapist *</label>
              <select
                value={form.therapist}
                onChange={(e) => handleChange("therapist", e.target.value)}
                className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer ${
                  errors.therapist ? "ring-2 ring-error" : ""
                }`}
              >
                <option value="">Select therapist</option>
                {therapistOptions.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              {errors.therapist && <p className="text-xs text-error mt-1">{errors.therapist}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Duration (minutes)</label>
              <input
                type="number"
                value={form.duration}
                onChange={(e) => handleChange("duration", parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                min="1"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Status</label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No Show</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-on-surface-variant">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
              rows={3}
              placeholder="Any special notes..."
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
              {mode === "add" ? "Create Booking" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      </div>
    </Portal>
  );
}

const ITEMS_PER_PAGE = 10;

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterOutlet, setFilterOutlet] = useState("all");
  const [dateRange, setDateRange] = useState("today");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookingList, setBookingList] = useState<Booking[]>(bookings);

  const today = "2026-04-20";

  const filtered = bookingList.filter((b) => {
    const matchSearch =
      b.memberName.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase()) ||
      b.therapist.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    const matchOutlet = filterOutlet === "all" || b.outlet.toLowerCase() === filterOutlet;
    const matchDate =
      dateRange === "all" ||
      (dateRange === "today" && b.date === today);
    return matchSearch && matchStatus && matchOutlet && matchDate;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const stats = {
    total: bookingList.length,
    confirmed: bookingList.filter((b) => b.status === "confirmed").length,
    completed: bookingList.filter((b) => b.status === "completed").length,
    cancelled: bookingList.filter((b) => b.status === "cancelled").length,
  };

  function handleAddBooking(data: BookingFormData) {
    const member = members.find((m) => m.id === data.memberId);
    const newBooking: Booking = {
      id: `b${Date.now()}`,
      memberId: data.memberId,
      memberName: member?.name || "Unknown",
      service: data.service,
      therapist: data.therapist,
      date: data.date,
      time: data.time,
      outlet: data.outlet,
      status: data.status,
      duration: data.duration,
      notes: data.notes,
    };
    setBookingList((prev) => [...prev, newBooking]);
  }

  function handleEditBooking(data: BookingFormData) {
    if (!selectedBooking) return;
    const member = members.find((m) => m.id === data.memberId);
    const updated: Booking = {
      ...selectedBooking,
      memberId: data.memberId,
      memberName: member?.name || selectedBooking.memberName,
      service: data.service,
      therapist: data.therapist,
      date: data.date,
      time: data.time,
      outlet: data.outlet,
      status: data.status,
      duration: data.duration,
      notes: data.notes,
    };
    setBookingList((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b))
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-primary">Bookings</h1>
          <p className="text-on-surface-variant mt-1">
            {filtered.length} appointments found
          </p>
        </div>
        <button
          onClick={() => {
            setShowAddModal(true);
          }}
          className="cta-gradient text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          New Booking
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, color: "bg-surface-container-low" },
          { label: "Confirmed", value: stats.confirmed, color: "bg-success/10" },
          { label: "Completed", value: stats.completed, color: "bg-surface-container-high" },
          { label: "Cancelled", value: stats.cancelled, color: "bg-error/10" },
        ].map((stat) => (
          <div key={stat.label} className={`card-no-border p-4 ${stat.color}`}>
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-on-surface-variant mt-1">{stat.label}</p>
          </div>
        ))}
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
            placeholder="Search by member, service, or therapist..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
          />
        </div>

        <select
          value={dateRange}
          onChange={(e) => {
            setDateRange(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          <option value="today">Today</option>
          <option value="all">All Dates</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="no-show">No Show</option>
        </select>

        <select
          value={filterOutlet}
          onChange={(e) => {
            setFilterOutlet(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          <option value="all">All Outlets</option>
          <option value="annathaya">Annathaya</option>
          <option value="thesquare">The Square</option>
        </select>
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {paginated.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-surface-container-low mx-auto mb-4 flex items-center justify-center">
              <Calendar size={24} className="text-on-surface-variant" />
            </div>
            <p className="text-on_surface font-medium">No bookings found</p>
            <p className="text-sm text-on-surface-variant mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          paginated.map((booking) => (
            <div
              key={booking.id}
              className="card-no-border p-5 hover:shadow-ambient transition-all group"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <div className="text-center min-w-[70px]">
                  <p className="text-lg font-bold text-primary">{booking.time}</p>
                  <p className="text-xs text-on-surface-variant">{booking.duration}min</p>
                </div>

                <div className="w-px h-12 bg-outline-variant hidden sm:block" />

                <div className="flex-1 min-w-[150px]">
                  <p className="font-semibold text-on_surface flex items-center gap-2">
                    <User size={16} className="text-primary shrink-0" />
                    {booking.memberName}
                  </p>
                  <p className="text-sm text-on-surface-variant">{booking.service}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-on_surface">{booking.therapist}</p>
                  <p className="text-xs text-on-surface-variant flex items-center justify-end gap-1">
                    <MapPin size={12} />
                    {booking.outlet}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusBadge(booking.status)}
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowEditModal(true);
                    }}
                    className="p-2 rounded-lg hover:bg-surface-container-low transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Edit size={16} className="text-on-surface-variant" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-on-surface-variant">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-surface-container-low transition-colors disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-surface-container-low transition-colors disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {showAddModal && (
        <BookingFormModal
          mode="add"
          onClose={() => {
            setShowAddModal(false);
          }}
          onSave={handleAddBooking}
        />
      )}

      {showEditModal && selectedBooking && (
        <BookingFormModal
          mode="edit"
          booking={selectedBooking}
          onClose={() => {
            setShowEditModal(false);
            setSelectedBooking(null);
          }}
          onSave={handleEditBooking}
        />
      )}
    </div>
  );
}
