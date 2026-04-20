"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Mail,
  Send,
  Users,
  Calendar,
  BarChart3,
  MoreVertical,
  Eye,
  Clock,
  X,
  Edit,
} from "lucide-react";
import Portal from "@/components/Portal";

interface Campaign {
  id: string;
  name: string;
  type: "email" | "sms" | "push";
  status: "draft" | "scheduled" | "sent" | "failed";
  audience: string;
  sent: number;
  opened: number;
  clicked: number;
  sentAt?: string;
  scheduledFor?: string;
  message?: string;
}

const initialCampaigns: Campaign[] = [
  { id: "c001", name: "Monthly Wellness Tips", type: "email", status: "sent", audience: "All Active Members", sent: 245, opened: 142, clicked: 38, sentAt: "2026-04-10" },
  { id: "c002", name: "Platinum Member Exclusive", type: "email", status: "sent", audience: "Platinum Members", sent: 3, opened: 3, clicked: 2, sentAt: "2026-04-05" },
  { id: "c003", name: "Renewal Reminder - April", type: "sms", status: "sent", audience: "Expiring Members", sent: 12, opened: 0, clicked: 0, sentAt: "2026-04-15" },
  { id: "c004", name: "New Service Launch", type: "push", status: "scheduled", audience: "All Members", sent: 0, opened: 0, clicked: 0, scheduledFor: "2026-04-25" },
  { id: "c005", name: "Happy Birthday!", type: "email", status: "draft", audience: "Birthday This Month", sent: 0, opened: 0, clicked: 0 },
  { id: "c006", name: "Weekend Promo", type: "sms", status: "failed", audience: "Gold & Platinum", sent: 0, opened: 0, clicked: 0 },
];

interface CampaignFormData {
  name: string;
  type: "email" | "sms" | "push";
  status: "draft" | "scheduled" | "sent" | "failed";
  audience: string;
  message: string;
  scheduledFor: string;
}

const initialFormData: CampaignFormData = {
  name: "",
  type: "email",
  status: "draft",
  audience: "",
  message: "",
  scheduledFor: "",
};

function CampaignFormModal({
  mode,
  campaign,
  onClose,
  onSave,
}: {
  mode: "add" | "edit";
  campaign?: Campaign;
  onClose: () => void;
  onSave: (data: CampaignFormData) => void;
}) {
  const [form, setForm] = useState<CampaignFormData>(
    campaign
      ? {
          name: campaign.name,
          type: campaign.type,
          status: campaign.status,
          audience: campaign.audience,
          message: campaign.message || "",
          scheduledFor: campaign.scheduledFor || "",
        }
      : initialFormData
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "Campaign name is required";
    if (!form.audience.trim()) newErrors.audience = "Audience is required";
    if (form.status === "scheduled" && !form.scheduledFor) {
      newErrors.scheduledFor = "Scheduled date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
    onClose();
  }

  function handleChange(field: keyof CampaignFormData, value: string) {
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
              {mode === "add" ? "New Campaign" : "Edit Campaign"}
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
            <label className="text-sm text-on-surface-variant">Campaign Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                errors.name ? "ring-2 ring-error" : ""
              }`}
              placeholder="e.g. Monthly Newsletter"
            />
            {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Type</label>
              <select
                value={form.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="push">Push Notification</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Status</label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="sent">Sent</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-on-surface-variant">Audience *</label>
            <input
              type="text"
              value={form.audience}
              onChange={(e) => handleChange("audience", e.target.value)}
              className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                errors.audience ? "ring-2 ring-error" : ""
              }`}
              placeholder="e.g. All Active Members"
            />
            {errors.audience && <p className="text-xs text-error mt-1">{errors.audience}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm text-on-surface-variant">Message Content</label>
            <textarea
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
              rows={4}
              placeholder="Write your message here..."
            />
          </div>

          {form.status === "scheduled" && (
            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Schedule For *</label>
              <input
                type="datetime-local"
                value={form.scheduledFor}
                onChange={(e) => handleChange("scheduledFor", e.target.value)}
                className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                  errors.scheduledFor ? "ring-2 ring-error" : ""
                }`}
              />
              {errors.scheduledFor && <p className="text-xs text-error mt-1">{errors.scheduledFor}</p>}
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
              {mode === "add" ? "Create Campaign" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      </div>
    </Portal>
  );
}

export default function CampaignsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const filtered = campaigns.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    const matchType = filterType === "all" || c.type === filterType;
    return matchSearch && matchStatus && matchType;
  });

  const stats = {
    total: campaigns.length,
    scheduled: campaigns.filter((c) => c.status === "scheduled").length,
    totalSent: campaigns.filter((c) => c.status === "sent").reduce((sum, c) => sum + c.sent, 0),
    avgOpenRate:
      campaigns.filter((c) => c.status === "sent" && c.sent > 0).length > 0
        ? Math.round(
            (campaigns
              .filter((c) => c.status === "sent" && c.sent > 0)
              .reduce((sum, c) => sum + (c.opened / c.sent) * 100, 0) /
              campaigns.filter((c) => c.status === "sent" && c.sent > 0).length) *
              10
          ) / 10
        : 0,
  };

  function handleAddCampaign(data: CampaignFormData) {
    const newCampaign: Campaign = {
      id: `c${Date.now()}`,
      name: data.name,
      type: data.type,
      status: data.status,
      audience: data.audience,
      sent: 0,
      opened: 0,
      clicked: 0,
      message: data.message,
      scheduledFor: data.status === "scheduled" ? data.scheduledFor : undefined,
    };
    setCampaigns((prev) => [...prev, newCampaign]);
  }

  function handleEditCampaign(data: CampaignFormData) {
    if (!selectedCampaign) return;
    const updated: Campaign = {
      ...selectedCampaign,
      name: data.name,
      type: data.type,
      status: data.status,
      audience: data.audience,
      message: data.message,
      scheduledFor: data.status === "scheduled" ? data.scheduledFor : undefined,
    };
    setCampaigns((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "sent":
        return <span className="status-active px-3 py-1 rounded-full text-xs font-medium">Sent</span>;
      case "scheduled":
        return <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-xs font-medium">Scheduled</span>;
      case "draft":
        return <span className="status-pending px-3 py-1 rounded-full text-xs font-medium">Draft</span>;
      default:
        return <span className="status-expired px-3 py-1 rounded-full text-xs font-medium">Failed</span>;
    }
  }

  function getTypeIcon(type: string) {
    switch (type) {
      case "email":
        return <Mail size={16} className="text-primary" />;
      case "sms":
        return <Send size={16} className="text-secondary" />;
      default:
        return <BarChart3 size={16} className="text-warning" />;
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-primary">Campaigns</h1>
          <p className="text-on-surface-variant mt-1">Marketing & communication</p>
        </div>
        <button
          onClick={() => {
            setShowAddModal(true);
          }}
          className="cta-gradient text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          New Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-no-border p-5">
          <p className="text-2xl font-bold text-primary">{stats.total}</p>
          <p className="text-sm text-on-surface-variant mt-1">Total Campaigns</p>
        </div>
        <div className="card-no-border p-5">
          <p className="text-2xl font-bold text-primary">{stats.scheduled}</p>
          <p className="text-sm text-on-surface-variant mt-1">Scheduled</p>
        </div>
        <div className="card-no-border p-5">
          <p className="text-2xl font-bold text-primary">{stats.totalSent}</p>
          <p className="text-sm text-on-surface-variant mt-1">Total Sent</p>
        </div>
        <div className="card-no-border p-5">
          <p className="text-2xl font-bold text-primary">{stats.avgOpenRate}%</p>
          <p className="text-sm text-on-surface-variant mt-1">Avg. Open Rate</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="sent">Sent</option>
          <option value="scheduled">Scheduled</option>
          <option value="draft">Draft</option>
          <option value="failed">Failed</option>
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          <option value="all">All Types</option>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="push">Push</option>
        </select>
      </div>

      {/* Campaigns List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-surface-container-low mx-auto mb-4 flex items-center justify-center">
              <Mail size={24} className="text-on-surface-variant" />
            </div>
            <p className="text-on_surface font-medium">No campaigns found</p>
          </div>
        ) : (
          filtered.map((campaign) => (
            <div
              key={campaign.id}
              className="card-no-border p-5 hover:shadow-ambient transition-all group"
            >
              <div className="flex items-start gap-4 flex-wrap">
                <div className="p-3 rounded-xl bg-surface-container-low">
                  {getTypeIcon(campaign.type)}
                </div>

                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-on_surface">{campaign.name}</p>
                    {getStatusBadge(campaign.status)}
                  </div>
                  <p className="text-sm text-on-surface-variant">{campaign.audience}</p>
                </div>

                {campaign.status === "sent" && (
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">{campaign.sent}</p>
                      <p className="text-xs text-on-surface-variant">Sent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-success">
                        {campaign.sent > 0 ? Math.round((campaign.opened / campaign.sent) * 100) : 0}%
                      </p>
                      <p className="text-xs text-on-surface-variant">Opened</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-warning">
                        {campaign.sent > 0 ? Math.round((campaign.clicked / campaign.sent) * 100) : 0}%
                      </p>
                      <p className="text-xs text-on-surface-variant">Clicked</p>
                    </div>
                  </div>
                )}

                <div className="text-right">
                  {campaign.scheduledFor ? (
                    <div>
                      <p className="text-sm text-on_surface flex items-center gap-1 justify-end">
                        <Clock size={14} />
                        {campaign.scheduledFor}
                      </p>
                      <p className="text-xs text-on-surface-variant">Scheduled</p>
                    </div>
                  ) : campaign.sentAt ? (
                    <div>
                      <p className="text-sm text-on_surface">{campaign.sentAt}</p>
                      <p className="text-xs text-on-surface-variant">Sent</p>
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCampaign(campaign);
                      setShowEditModal(true);
                    }}
                    className="p-2 hover:bg-surface-container-low rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Edit size={18} className="text-on-surface-variant" />
                  </button>
                  <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                    <MoreVertical size={18} className="text-on-surface-variant" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showAddModal && (
        <CampaignFormModal
          mode="add"
          onClose={() => {
            setShowAddModal(false);
          }}
          onSave={handleAddCampaign}
        />
      )}

      {showEditModal && selectedCampaign && (
        <CampaignFormModal
          mode="edit"
          campaign={selectedCampaign}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCampaign(null);
          }}
          onSave={handleEditCampaign}
        />
      )}
    </div>
  );
}
