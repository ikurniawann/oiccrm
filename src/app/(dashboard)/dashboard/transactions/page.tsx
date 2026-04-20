"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowDownRight,
  ArrowUpRight,
  X,
  Edit,
} from "lucide-react";
import { transactions, members, type Transaction } from "@/lib/dummy-data";
import Portal from "@/components/Portal";

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

function getTypeBadge(type: string) {
  switch (type) {
    case "topup":
      return (
        <span className="status-active px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <ArrowDownRight size={12} />
          Top Up
        </span>
      );
    case "purchase":
      return (
        <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Minus size={12} />
          Purchase
        </span>
      );
    case "redemption":
      return (
        <span className="status-pending px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <ArrowUpRight size={12} />
          Redemption
        </span>
      );
    default:
      return (
        <span className="status-expired px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          Refund
        </span>
      );
  }
}

interface TransactionFormData {
  memberId: string;
  type: "topup" | "purchase" | "redemption" | "refund";
  amount: number;
  description: string;
  date: string;
  outlet: string;
  pointsEarned: number;
  pointsRedeemed: number;
}

const initialFormData: TransactionFormData = {
  memberId: "",
  type: "purchase",
  amount: 0,
  description: "",
  date: new Date().toISOString().split("T")[0],
  outlet: "Annathaya",
  pointsEarned: 0,
  pointsRedeemed: 0,
};

function TransactionFormModal({
  mode,
  transaction,
  onClose,
  onSave,
}: {
  mode: "add" | "edit";
  transaction?: Transaction;
  onClose: () => void;
  onSave: (data: TransactionFormData) => void;
}) {
  const [form, setForm] = useState<TransactionFormData>(
    transaction
      ? {
          memberId: transaction.memberId,
          type: transaction.type,
          amount: Math.abs(transaction.amount),
          description: transaction.description,
          date: transaction.date,
          outlet: transaction.outlet,
          pointsEarned: transaction.pointsEarned || 0,
          pointsRedeemed: transaction.pointsRedeemed || 0,
        }
      : initialFormData
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: any = {};
    if (!form.memberId) newErrors.memberId = "Member is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (form.amount <= 0) newErrors.amount = "Amount must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const finalAmount = form.type === "redemption" || form.type === "refund" ? -form.amount : form.amount;
    onSave({ ...form, amount: finalAmount });
    onClose();
  }

  function handleChange(field: keyof TransactionFormData, value: string | number) {
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
              {mode === "add" ? "New Transaction" : "Edit Transaction"}
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
              <label className="text-sm text-on-surface-variant">Type *</label>
              <select
                value={form.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="topup">Top Up</option>
                <option value="purchase">Purchase</option>
                <option value="redemption">Redemption</option>
                <option value="refund">Refund</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-on-surface-variant">Description *</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                errors.description ? "ring-2 ring-error" : ""
              }`}
              placeholder="e.g. Top up Platinum Package"
            />
            {errors.description && <p className="text-xs text-error mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Amount (IDR) *</label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => handleChange("amount", parseInt(e.target.value) || 0)}
                className={`w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm ${
                  errors.amount ? "ring-2 ring-error" : ""
                }`}
                min="0"
                placeholder="350000"
              />
              {errors.amount && <p className="text-xs text-error mt-1">{errors.amount}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Date *</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-on-surface-variant">Outlet</label>
              <select
                value={form.outlet}
                onChange={(e) => handleChange("outlet", e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="Annathaya">Annathaya</option>
                <option value="The Square">The Square</option>
              </select>
            </div>

            {form.type === "topup" || form.type === "purchase" ? (
              <div className="space-y-1">
                <label className="text-sm text-on-surface-variant">Points Earned</label>
                <input
                  type="number"
                  value={form.pointsEarned}
                  onChange={(e) => handleChange("pointsEarned", parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  min="0"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-sm text-on-surface-variant">Points Redeemed</label>
                <input
                  type="number"
                  value={form.pointsRedeemed}
                  onChange={(e) => handleChange("pointsRedeemed", parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  min="0"
                />
              </div>
            )}
          </div>

          {form.amount > 0 && (
            <div className="p-4 rounded-xl bg-surface-container-low">
              <p className="text-sm text-on-surface-variant">Amount Preview</p>
              <p className={`text-2xl font-bold ${form.type === "redemption" || form.type === "refund" ? "text-warning" : "text-success"}`}>
                {form.type === "redemption" || form.type === "refund" ? "-" : "+"}
                {formatCurrency(form.amount)}
              </p>
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
              {mode === "add" ? "Create Transaction" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      </div>
    </Portal>
  );
}

const ITEMS_PER_PAGE = 10;

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterOutlet, setFilterOutlet] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactionList, setTransactionList] = useState<Transaction[]>(transactions);

  const filtered = transactionList.filter((t) => {
    const matchSearch =
      t.memberName.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || t.type === filterType;
    const matchOutlet = filterOutlet === "all" || t.outlet.toLowerCase().includes(filterOutlet);
    return matchSearch && matchType && matchOutlet;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalTopup = transactionList
    .filter((t) => t.type === "topup")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalPurchase = transactionList
    .filter((t) => t.type === "purchase")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalRedemption = transactionList
    .filter((t) => t.type === "redemption")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  function handleAddTransaction(data: TransactionFormData) {
    const member = members.find((m) => m.id === data.memberId);
    const newTx: Transaction = {
      id: `t${Date.now()}`,
      memberId: data.memberId,
      memberName: member?.name || "Unknown",
      type: data.type,
      amount: data.amount,
      description: data.description,
      date: data.date,
      outlet: data.outlet,
      pointsEarned: data.type !== "redemption" && data.type !== "refund" ? data.pointsEarned : undefined,
      pointsRedeemed: data.type === "redemption" ? data.pointsRedeemed : undefined,
    };
    setTransactionList((prev) => [...prev, newTx]);
  }

  function handleEditTransaction(data: TransactionFormData) {
    if (!selectedTransaction) return;
    const member = members.find((m) => m.id === data.memberId);
    const updated: Transaction = {
      ...selectedTransaction,
      memberId: data.memberId,
      memberName: member?.name || selectedTransaction.memberName,
      type: data.type,
      amount: data.amount,
      description: data.description,
      date: data.date,
      outlet: data.outlet,
      pointsEarned: data.type !== "redemption" && data.type !== "refund" ? data.pointsEarned : undefined,
      pointsRedeemed: data.type === "redemption" ? data.pointsRedeemed : undefined,
    };
    setTransactionList((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-primary">Transactions</h1>
          <p className="text-on-surface-variant mt-1">
            {filtered.length} transactions
          </p>
        </div>
        <button
          onClick={() => {
            setShowAddModal(true);
          }}
          className="cta-gradient text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          New Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-no-border p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-on-surface-variant">Total Top Up</p>
            <div className="p-2 rounded-lg bg-success/10">
              <TrendingDown size={16} className="text-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-success">
            {formatCurrency(totalTopup)}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">This month</p>
        </div>

        <div className="card-no-border p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-on-surface-variant">Total Purchase</p>
            <div className="p-2 rounded-lg bg-surface-container-high">
              <Minus size={16} className="text-on-surface-variant" />
            </div>
          </div>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(totalPurchase)}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">This month</p>
        </div>

        <div className="card-no-border p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-on-surface-variant">Total Redemption</p>
            <div className="p-2 rounded-lg bg-warning/10">
              <TrendingUp size={16} className="text-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-warning">
            {formatCurrency(totalRedemption)}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">This month</p>
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
            placeholder="Search by member or description..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 bg-surface-container-low rounded-xl border-none text-sm text-on_surface focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          <option value="all">All Types</option>
          <option value="topup">Top Up</option>
          <option value="purchase">Purchase</option>
          <option value="redemption">Redemption</option>
          <option value="refund">Refund</option>
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

      {/* Transactions List */}
      <div className="space-y-3">
        {paginated.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-surface-container-low mx-auto mb-4 flex items-center justify-center">
              <Search size={24} className="text-on-surface-variant" />
            </div>
            <p className="text-on_surface font-medium">No transactions found</p>
            <p className="text-sm text-on-surface-variant mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          paginated.map((tx) => (
            <div
              key={tx.id}
              className="card-no-border p-5 hover:shadow-ambient transition-all group"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    tx.type === "topup"
                      ? "bg-success/10"
                      : tx.type === "purchase"
                      ? "bg-surface-container-high"
                      : tx.type === "redemption"
                      ? "bg-warning/10"
                      : "bg-error/10"
                  }`}
                >
                  {tx.type === "topup" ? (
                    <ArrowDownRight size={20} className="text-success" />
                  ) : tx.type === "purchase" ? (
                    <Minus size={20} className="text-on-surface-variant" />
                  ) : tx.type === "redemption" ? (
                    <ArrowUpRight size={20} className="text-warning" />
                  ) : (
                    <TrendingDown size={20} className="text-error" />
                  )}
                </div>

                <div className="flex-1 min-w-[180px]">
                  <p className="font-semibold text-on_surface">{tx.memberName}</p>
                  <p className="text-sm text-on-surface-variant">{tx.description}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-on_surface">{formatDate(tx.date)}</p>
                  <p className="text-xs text-on-surface-variant">{tx.outlet}</p>
                </div>

                <div className="flex items-center gap-2">
                  {getTypeBadge(tx.type)}
                  <button
                    onClick={() => {
                      setSelectedTransaction(tx);
                      setShowEditModal(true);
                    }}
                    className="p-2 rounded-lg hover:bg-surface-container-low transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Edit size={16} className="text-on-surface-variant" />
                  </button>
                </div>

                <div className="text-right min-w-[120px]">
                  <p
                    className={`text-lg font-bold ${
                      tx.amount < 0 ? "text-warning" : "text-success"
                    }`}
                  >
                    {tx.amount < 0 ? "-" : "+"}
                    {formatCurrency(Math.abs(tx.amount))}
                  </p>
                  {tx.pointsEarned && (
                    <p className="text-xs text-success">+{tx.pointsEarned} pts</p>
                  )}
                  {tx.pointsRedeemed && (
                    <p className="text-xs text-warning">-{tx.pointsRedeemed} pts</p>
                  )}
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
              className="px-3 py-2 rounded-lg hover:bg-surface-container-low transition-colors disabled:opacity-40 text-sm"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg hover:bg-surface-container-low transition-colors disabled:opacity-40 text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {showAddModal && (
        <TransactionFormModal
          mode="add"
          onClose={() => {
            setShowAddModal(false);
          }}
          onSave={handleAddTransaction}
        />
      )}

      {showEditModal && selectedTransaction && (
        <TransactionFormModal
          mode="edit"
          transaction={selectedTransaction}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTransaction(null);
          }}
          onSave={handleEditTransaction}
        />
      )}
    </div>
  );
}
