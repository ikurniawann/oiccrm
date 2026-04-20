"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Clock,
  MapPin,
  Tag,
  ShoppingBag,
  X,
  Edit,
} from "lucide-react";
import { services, type Service } from "@/lib/dummy-data";
import Portal from "@/components/Portal";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

interface ServiceFormData {
  name: string;
  category: string;
  duration: number;
  price: number;
  outlet: "annathaya" | "thesquare" | "both";
}

const initialFormData: ServiceFormData = {
  name: "",
  category: "",
  duration: 60,
  price: 0,
  outlet: "annathaya",
};

const categories = ["Massage", "Signature", "Body Treatment", "Skin Care", "Fitness", "Facility"];

function ServiceFormModal({
  mode,
  service,
  onClose,
  onSave,
}: {
  mode: "add" | "edit";
  service?: Service;
  onClose: () => void;
  onSave: (data: ServiceFormData) => void;
}) {
  const [form, setForm] = useState<ServiceFormData>(
    service
      ? {
          name: service.name,
          category: service.category,
          duration: service.duration,
          price: service.price,
          outlet: service.outlet,
        }
      : initialFormData
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "Service name is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (form.price <= 0) newErrors.price = "Price must be greater than 0";
    if (form.duration <= 0) newErrors.duration = "Duration must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
    onClose();
  }

  function handleChange(field: keyof ServiceFormData, value: string | number) {
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
              {mode === "add" ? "Add New Service" : "Edit Service"}
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
            <label className="text-sm text-on-surface-variant">Service Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                errors.name ? "ring-2 ring-error" : ""
              }`}
              placeholder="e.g. Aromatherapy Massage"
            />
            {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm text-on-surface-variant">Category *</label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer ${
                errors.category ? "ring-2 ring-error" : ""
              }`}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-error mt-1">{errors.category}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Duration (minutes) *</label>
              <input
                type="number"
                value={form.duration}
                onChange={(e) => handleChange("duration", parseInt(e.target.value) || 0)}
                className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                  errors.duration ? "ring-2 ring-error" : ""
                }`}
                min="1"
              />
              {errors.duration && <p className="text-xs text-error mt-1">{errors.duration}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Price (IDR) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange("price", parseInt(e.target.value) || 0)}
                className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                  errors.price ? "ring-2 ring-error" : ""
                }`}
                min="0"
                placeholder="350000"
              />
              {errors.price && <p className="text-xs text-error mt-1">{errors.price}</p>}
            </div>
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

          {form.price > 0 && (
            <div className="p-4 rounded-xl bg-surface-container-low">
              <p className="text-sm text-on-surface-variant">Price Preview</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(form.price)}</p>
            </div>
          )}

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
              {mode === "add" ? "Add Service" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      </div>
    </Portal>
  );
}

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterOutlet, setFilterOutlet] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceList, setServiceList] = useState<Service[]>(services);

  const filtered = serviceList.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === "all" || s.category === filterCategory;
    const matchOutlet =
      filterOutlet === "all" ||
      s.outlet === filterOutlet ||
      s.outlet === "both";
    return matchSearch && matchCategory && matchOutlet;
  });

  const stats = {
    total: serviceList.length,
    categories: [...new Set(serviceList.map((s) => s.category))].length,
    avgPrice: Math.round(
      serviceList.reduce((sum, s) => sum + s.price, 0) / serviceList.length
    ),
  };

  function handleAddService(data: ServiceFormData) {
    const newService: Service = {
      id: `s${Date.now()}`,
      name: data.name,
      category: data.category,
      duration: data.duration,
      price: data.price,
      outlet: data.outlet,
    };
    setServiceList((prev) => [...prev, newService]);
  }

  function handleEditService(data: ServiceFormData) {
    if (!selectedService) return;
    const updated: Service = {
      ...selectedService,
      name: data.name,
      category: data.category,
      duration: data.duration,
      price: data.price,
      outlet: data.outlet,
    };
    setServiceList((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-primary">Services</h1>
          <p className="text-on-surface-variant mt-1">
            {filtered.length} services available
          </p>
        </div>
        <button
          onClick={() => {
            setShowAddModal(true);
          }}
          className="cta-gradient text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-no-border p-5">
          <p className="text-2xl font-bold text-primary">{stats.total}</p>
          <p className="text-sm text-on-surface-variant mt-1">Total Services</p>
        </div>
        <div className="card-no-border p-5">
          <p className="text-2xl font-bold text-primary">{stats.categories}</p>
          <p className="text-sm text-on-surface-variant mt-1">Categories</p>
        </div>
        <div className="card-no-border p-5">
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(stats.avgPrice)}
          </p>
          <p className="text-sm text-on-surface-variant mt-1">Avg. Price</p>
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
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <div className="w-16 h-16 rounded-full bg-surface-container-low mx-auto mb-4 flex items-center justify-center">
              <ShoppingBag size={24} className="text-on-surface-variant" />
            </div>
            <p className="text-on_surface font-medium">No services found</p>
            <p className="text-sm text-on-surface-variant mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          filtered.map((service) => (
            <div
              key={service.id}
              className="card-no-border p-5 hover:shadow-ambient transition-all cursor-pointer group"
              onClick={() => {
                setSelectedService(service);
                setShowEditModal(true);
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold text-on_surface text-lg">
                    {service.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 rounded-lg bg-surface-container text-xs text-on-surface-variant">
                      {service.category}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs ${
                        service.outlet === "annathaya"
                          ? "bg-secondary-container text-secondary"
                          : service.outlet === "thesquare"
                          ? "bg-surface-container-high text-on-surface-variant"
                          : "bg-primary-container text-white"
                      }`}
                    >
                      {service.outlet === "both"
                        ? "Both"
                        : service.outlet === "annathaya"
                        ? "Annathaya"
                        : "The Square"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedService(service);
                      setShowEditModal(true);
                    }}
                    className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container"
                  >
                    <Edit size={16} className="text-on-surface-variant" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(service.price)}
                </p>
                <p className="text-sm text-on-surface-variant flex items-center gap-1">
                  <Clock size={14} />
                  {service.duration} min
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {showAddModal && (
        <ServiceFormModal
          mode="add"
          onClose={() => {
            setShowAddModal(false);
          }}
          onSave={handleAddService}
        />
      )}

      {showEditModal && selectedService && (
        <ServiceFormModal
          mode="edit"
          service={selectedService}
          onClose={() => {
            setShowEditModal(false);
            setSelectedService(null);
          }}
          onSave={handleEditService}
        />
      )}
    </div>
  );
}
