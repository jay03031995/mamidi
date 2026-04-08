import React, { useEffect, useState } from "react";
import { DashboardShell, GhostButton } from "../components/DashboardShell";
import { OrderRow } from "../components/OrderRow";
import { listOrders, updateOrderStatus } from "../api/orders";
import { useApiResource } from "../hooks/useApiResource";

const statusOptions = ["all", "pending", "complete", "paid", "unpaid"];

export default function OrderLedger() {
  const { data, loading, error } = useApiResource(() => listOrders(), []);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [savingStatusId, setSavingStatusId] = useState(null);
  const [statusError, setStatusError] = useState("");

  useEffect(() => {
    setOrders(data?.data ?? []);
  }, [data]);

  const handleView = (order) => {
    setSelectedOrder(order);
  };

  const handleStatusChange = async (order, newStatus) => {
    const orderKey = order._id || order.orderId;
    const previousStatus = order.status || "pending";

    setStatusError("");
    setSavingStatusId(orderKey);

    setOrders((currentOrders) =>
      currentOrders.map((currentOrder) =>
        (currentOrder.orderId || currentOrder._id) ===
        (order.orderId || order._id)
          ? { ...currentOrder, status: newStatus }
          : currentOrder
      )
    );

    setSelectedOrder((currentOrder) =>
      currentOrder &&
      (currentOrder.orderId || currentOrder._id) ===
        (order.orderId || order._id)
        ? { ...currentOrder, status: newStatus }
        : currentOrder
    );

    try {
      await updateOrderStatus(orderKey, newStatus);
      return true;
    } catch (err) {
      setOrders((currentOrders) =>
        currentOrders.map((currentOrder) =>
          (currentOrder.orderId || currentOrder._id) ===
          (order.orderId || order._id)
            ? { ...currentOrder, status: previousStatus }
            : currentOrder
        )
      );

      setSelectedOrder((currentOrder) =>
        currentOrder &&
        (currentOrder.orderId || currentOrder._id) ===
          (order.orderId || order._id)
          ? { ...currentOrder, status: previousStatus }
          : currentOrder
      );

      setStatusError(err.message || "Failed to save order status.");
      return false;
    } finally {
      setSavingStatusId(null);
    }
  };

  const handleDelete = (order) => {
    setOrders((currentOrders) =>
      currentOrders.filter(
        (currentOrder) =>
          (currentOrder.orderId || currentOrder._id) !==
          (order.orderId || order._id)
      )
    );
    setSelectedOrder((currentOrder) =>
      currentOrder &&
      (currentOrder.orderId || currentOrder._id) ===
        (order.orderId || order._id)
        ? null
        : currentOrder
    );
  };

  const handleExportCsv = () => {
    if (filteredOrders.length === 0) {
      return;
    }

    const escapeCsvValue = (value) => {
      const stringValue = value == null ? "" : String(value);
      const escapedValue = stringValue.replace(/"/g, '""');
      return `"${escapedValue}"`;
    };

    const csvRows = [
      [
        "Order ID",
        "Customer Name",
        "Customer Email",
        "Placed At",
        "Status",
        "Total",
      ],
      ...filteredOrders.map((order) => [
        order.orderId || order._id || "",
        order.customer?.name || "",
        order.customer?.email || "",
        order.placedAt || "",
        order.status || "",
        order.total ?? "",
      ]),
    ];

    const csvContent = csvRows
      .map((row) => row.map(escapeCsvValue).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);

    link.href = objectUrl;
    link.download = `orders-${stamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  };

  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesStatus =
      statusFilter === "all" ||
      (order.status || "").toLowerCase() === statusFilter;

    const searchableText = [
      order.orderId,
      order._id,
      order.status,
      order.total,
      order.placedAt,
      order.customer?.name,
      order.customer?.email,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = !query || searchableText.includes(query);

    return matchesStatus && matchesSearch;
  });

  return (
    <DashboardShell
      title="Order Ledger"
      subtitle="Refining the connection between your studio's craft and the hands of your collectors."
      actions={
        <GhostButton icon="file_download" onClick={handleExportCsv}>
          Export CSV
        </GhostButton>
      }
    >
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="bg-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-[#44483d] text-sm">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-sm font-body w-40 md:w-64 placeholder:text-[#44483d]/60"
            placeholder="Find an order..."
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
        <div className="relative">
          <GhostButton
            icon="filter_list"
            type="button"
            onClick={() => {
              const currentIndex = statusOptions.indexOf(statusFilter);
              const nextIndex = (currentIndex + 1) % statusOptions.length;
              setStatusFilter(statusOptions[nextIndex]);
            }}
          >
            Status:{" "}
            {statusFilter === "all"
              ? "All"
              : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
          </GhostButton>
        </div>
      </div>

      {statusError ? (
        <div className="mb-4 rounded-xl border border-[#ffdad6] bg-[#fff4f2] px-4 py-3 text-sm text-[#ba1a1a]">
          {statusError}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-3 px-4">
        <div className="col-span-4 font-label text-[11px] uppercase tracking-widest text-[#44483d]/70 font-bold">
          Collector &amp; Order ID
        </div>
        <div className="col-span-2 font-label text-[11px] uppercase tracking-widest text-[#44483d]/70 font-bold">
          Date
        </div>
        <div className="col-span-2 font-label text-[11px] uppercase tracking-widest text-[#44483d]/70 font-bold">
          Status
        </div>
        <div className="col-span-2 font-label text-[11px] uppercase tracking-widest text-[#44483d]/70 font-bold text-right">
          Total
        </div>
        <div className="col-span-2" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-[#f0efdb]">
        {loading ? (
          <div className="px-6 py-6 text-[#44483d]">Loading orders...</div>
        ) : error ? (
          <div className="px-6 py-6 text-[#ba1a1a]">
            Failed to load orders: {error.message}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="px-6 py-6 text-[#44483d]">
            {searchQuery || statusFilter !== "all"
              ? "No matching orders found."
              : "No orders yet."}
          </div>
        ) : (
          filteredOrders.map((order) => (
            <OrderRow
              key={order.orderId || order._id}
              order={order}
              onView={handleView}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              isSaving={savingStatusId === (order._id || order.orderId)}
            />
          ))
        )}
      </div>

      {selectedOrder ? (
        <div className="fixed inset-0 z-50 bg-[#1c1c11]/35 flex items-center justify-center px-4">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 md:p-8 relative">
            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#44483d] hover:bg-[#f6f4e1] transition-colors"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>

            <div className="mb-6">
              <p className="font-label text-[11px] uppercase tracking-widest text-[#44483d]/70 font-bold mb-2">
                Order Details
              </p>
              <h3 className="text-2xl font-headline font-bold text-[#1c1c11]">
                {selectedOrder.orderId || selectedOrder._id}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#44483d]">
              <div className="bg-[#f6f4e1] rounded-2xl p-4">
                <p className="font-label text-[11px] uppercase tracking-widest text-[#44483d]/70 font-bold mb-1">
                  Customer
                </p>
                <p className="font-semibold text-[#1c1c11]">
                  {selectedOrder.customer?.name || "Unknown customer"}
                </p>
                <p>{selectedOrder.customer?.email || "No email provided"}</p>
              </div>

              <div className="bg-[#f6f4e1] rounded-2xl p-4">
                <p className="font-label text-[11px] uppercase tracking-widest text-[#44483d]/70 font-bold mb-1">
                  Status
                </p>
                <p className="font-semibold text-[#1c1c11]">
                  {selectedOrder.status || "Pending"}
                </p>
              </div>

              <div className="bg-[#f6f4e1] rounded-2xl p-4">
                <p className="font-label text-[11px] uppercase tracking-widest text-[#44483d]/70 font-bold mb-1">
                  Date
                </p>
                <p className="font-semibold text-[#1c1c11]">
                  {selectedOrder.placedAt
                    ? new Date(selectedOrder.placedAt).toLocaleDateString(
                        undefined,
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )
                    : "Not available"}
                </p>
              </div>

              <div className="bg-[#f6f4e1] rounded-2xl p-4">
                <p className="font-label text-[11px] uppercase tracking-widest text-[#44483d]/70 font-bold mb-1">
                  Total
                </p>
                <p className="font-semibold text-[#1c1c11]">
                  Rs. {selectedOrder.total ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
}
