import React, { useState, useRef, useEffect } from "react";
import { Badge } from "./DashboardShell";

const statusTone = {
  pending: "warning",
  complete: "success",
  paid: "success",
  unpaid: "error",
};

export function OrderRow({
  order,
  onView,
  onStatusChange,
  onDelete,
  isSaving = false,
}) {
  const { customer, orderId, placedAt, total } = order;

  const [status, setStatus] = useState(order.status || "pending");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    setStatus(order.status || "pending");
  }, [order.status]);

  const date = placedAt
    ? new Date(placedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const tone = statusTone[status?.toLowerCase()] || "primary";

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    const didSave = await onStatusChange?.(order, newStatus);

    if (didSave === false) {
      setStatus(order.status || "pending");
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      onDelete?.(order);
      setMenuOpen(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 items-center px-6 py-5 hover:bg-[#f6f4e1]/60 transition-colors">
      
      {/* Customer */}
      <div className="col-span-4 flex items-center gap-4 mb-4 md:mb-0">
        <div className="w-12 h-12 rounded-xl bg-[#385419]/5 flex items-center justify-center overflow-hidden shrink-0">
          {customer?.avatar ? (
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="material-symbols-outlined text-[#385419]">
              person
            </span>
          )}
        </div>
        <div>
          <p className="font-body font-bold text-[#1c1c11]">
            {customer?.name}
          </p>
          <p className="font-label text-xs text-[#44483d]">{orderId}</p>
        </div>
      </div>

      {/* Date */}
      <div className="col-span-2 mb-4 md:mb-0">
        <p className="font-body text-sm text-[#44483d]">{date}</p>
      </div>

      {/* Status */}
      <div className="col-span-2 mb-4 md:mb-0">
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={isSaving}
          className="border rounded-md px-2 py-1 text-sm bg-white focus:outline-none disabled:opacity-60"
        >
          <option value="pending">Pending</option>
          <option value="complete">Complete</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        <div className="mt-2">
          <Badge tone={tone}>{status}</Badge>
        </div>
        {isSaving ? (
          <p className="mt-2 text-[11px] font-label uppercase tracking-widest text-[#385419]">
            Saving...
          </p>
        ) : null}
      </div>

      {/* Total */}
      <div className="col-span-2 mb-4 md:mb-0 md:text-right">
        <p className="font-headline font-bold text-lg text-[#385419]">
          ₹{total}
        </p>
      </div>

      {/* Actions */}
      <div className="col-span-2 flex justify-end gap-2 relative">

        {/* 👁 View */}
        <button
          onClick={() => onView?.(order)}
          className="p-2 hover:bg-[#f0efdb] rounded-lg transition-colors text-[#44483d]"
        >
          <span className="material-symbols-outlined text-sm">
            visibility
          </span>
        </button>

        {/* ⋮ Menu */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-[#f0efdb] rounded-lg transition-colors text-[#44483d]"
          >
            <span className="material-symbols-outlined text-sm">
              more_vert
            </span>
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md z-10">
              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
