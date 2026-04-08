import React, { useMemo, useState } from "react";
import { DashboardShell, GhostButton } from "../components/DashboardShell";
import { MetricCard } from "../components/MetricCard";
import {
  getRevenueSummary,
  getOrderStats,
  getBestSellers,
  getActivityFeed,
} from "../api/analytics";
import { useApiResource } from "../hooks/useApiResource";
import Card1 from "../../assets/Card1.png";
import Card2 from "../../assets/Card2.png";
import Card3 from "../../assets/Card3.png";

const rangeOptions = [
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
];

const bestsellerFallbacks = [Card1, Card2, Card3];

function formatCurrency(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

function normalizeBestSeller(item, index) {
  return {
    id: item.id || item._id || item.productId || `${item.title || "item"}-${index}`,
    title: item.title || item.name || item.productName || "Untitled work",
    units: item.units || item.quantity || item.sold || 0,
    price: item.price || item.revenue || 0,
    image:
      item.img ||
      item.image ||
      item.main ||
      item.thumbnail ||
      item.product?.main ||
      bestsellerFallbacks[index % bestsellerFallbacks.length],
  };
}

function normalizeFeedItem(item, index) {
  return {
    id: item.id || item.orderId || item._id || `activity-${index + 1}`,
    customer: item.customer || item.customerName || "Collector",
    ago: item.ago || item.timeAgo || "Recently",
    amount: item.amount || item.total || item.value || 0,
    status: item.status || "Success",
  };
}

export default function SalesAnalytics() {
  const [selectedRange, setSelectedRange] = useState("30d");

  const revenue = useApiResource(
    () => getRevenueSummary(selectedRange),
    [selectedRange]
  );
  const orders = useApiResource(
    () => getOrderStats(selectedRange),
    [selectedRange]
  );
  const best = useApiResource(() => getBestSellers("90d", 3), []);
  const feed = useApiResource(() => getActivityFeed({ limit: 4 }), []);

  const hasError = revenue.error || orders.error || best.error || feed.error;
  const isLoading =
    revenue.loading || orders.loading || best.loading || feed.loading;

  const bestSellers = useMemo(
    () => (best.data?.items ?? []).map(normalizeBestSeller),
    [best.data]
  );

  const activityFeed = useMemo(
    () => (feed.data?.items ?? []).map(normalizeFeedItem),
    [feed.data]
  );

  const totalRevenue = Number(revenue.data?.total || 0);
  const totalOrders = Number(orders.data?.count || 0);
  const averageValue = Number(orders.data?.avgValue || 0);
  const revenueDelta =
    typeof revenue.data?.deltaPct === "number"
      ? revenue.data.deltaPct
      : typeof orders.data?.deltaPct === "number"
      ? orders.data.deltaPct
      : 0;

  const miniTrend = useMemo(() => {
    const base = totalRevenue || 1;
    const intensity = Math.max(14, Math.min(82, Math.round(base / 1500)));
    return [
      24,
      Math.max(18, intensity - 16),
      Math.max(26, intensity - 6),
      Math.max(22, intensity - 10),
      Math.max(34, intensity + 8),
      Math.max(28, intensity + 2),
      Math.max(40, intensity + 14),
    ];
  }, [totalRevenue]);

  const trendPoints = miniTrend
    .map((value, index) => `${index * 56},${110 - value}`)
    .join(" ");

  const handleExport = () => {
    const csvSections = [
      ["Sales Analytics Export"],
      [`Range`, selectedRange],
      [],
      ["Revenue Summary"],
      ["Total Revenue", totalRevenue],
      ["Revenue Delta %", revenueDelta],
      [],
      ["Order Summary"],
      ["Total Orders", totalOrders],
      ["Average Order Value", averageValue],
      [],
      ["Best Sellers"],
      ["Title", "Units Sold", "Value"],
      ...bestSellers.map((item) => [item.title, item.units, item.price]),
      [],
      ["Recent Activity"],
      ["Order", "Customer", "When", "Amount", "Status"],
      ...activityFeed.map((item) => [
        item.id,
        item.customer,
        item.ago,
        item.amount,
        item.status,
      ]),
    ];

    const escapeCsvValue = (value) => {
      const stringValue = value == null ? "" : String(value);
      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const csvContent = csvSections
      .map((row) => row.map(escapeCsvValue).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = `sales-analytics-${selectedRange}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  };

  return (
    <DashboardShell
      title="Sales Analytics"
      subtitle="A sharper view of momentum, collector activity, and top-performing work."
      actions={
        <div className="flex flex-wrap gap-3">
          {rangeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSelectedRange(option.value)}
              className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-colors ${
                selectedRange === option.value
                  ? "bg-[#385419] text-white border-[#385419]"
                  : "bg-white text-[#385419] border-[#c4c8b9] hover:bg-[#f6f4e1]"
              }`}
            >
              {option.label}
            </button>
          ))}
          <GhostButton icon="file_download" onClick={handleExport}>
            Export CSV
          </GhostButton>
        </div>
      }
    >
      {isLoading ? (
        <div className="text-[#44483d]">Loading analytics...</div>
      ) : hasError ? (
        <div className="text-[#ba1a1a]">
          Failed to load analytics.{" "}
          {revenue.error?.message ||
            orders.error?.message ||
            best.error?.message ||
            feed.error?.message}
        </div>
      ) : (
        <div className="space-y-8">
          <section className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top_left,_rgba(254,214,91,0.25),_transparent_30%),linear-gradient(135deg,#1f2b13_0%,#385419_50%,#607d3b_100%)] text-white shadow-[0_24px_80px_rgba(56,84,25,0.22)]">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-10 right-10 h-40 w-40 rounded-full border border-white/20" />
              <div className="absolute bottom-0 left-8 h-28 w-28 rounded-full border border-white/20" />
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-8 p-6 md:p-8 lg:p-10">
              <div>
                <p className="mb-3 text-xs font-label uppercase tracking-[0.35em] text-white/75">
                  Revenue Pulse
                </p>
                <h3 className="max-w-xl text-3xl md:text-4xl font-headline font-bold leading-tight">
                  {formatCurrency(totalRevenue)}
                </h3>
                <p className="mt-3 max-w-2xl text-sm md:text-base text-white/80">
                  The studio is tracking {totalOrders} orders in the current{" "}
                  {selectedRange} window with an average order value of{" "}
                  {formatCurrency(averageValue)}.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/70">
                      Revenue Delta
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {revenueDelta >= 0 ? "+" : ""}
                      {revenueDelta.toFixed(1)}%
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/70">
                      Best Seller Count
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {bestSellers.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/70">
                      Revenue Trend
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      A simple momentum view for the selected period.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#fed65b] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#745c00]">
                    Live
                  </span>
                </div>

                <svg
                  viewBox="0 0 336 120"
                  className="h-40 w-full overflow-visible"
                  aria-label="Revenue trend chart"
                >
                  <defs>
                    <linearGradient id="trendStroke" x1="0%" x2="100%">
                      <stop offset="0%" stopColor="#fed65b" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke="rgba(255,255,255,0.16)"
                    strokeWidth="1"
                    points="0,90 336,90"
                  />
                  <polyline
                    fill="none"
                    stroke="url(#trendStroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={trendPoints}
                  />
                  {miniTrend.map((value, index) => (
                    <circle
                      key={`${value}-${index}`}
                      cx={index * 56}
                      cy={110 - value}
                      r="5"
                      fill="#fcfae6"
                      stroke="#fed65b"
                      strokeWidth="3"
                    />
                  ))}
                </svg>

                <div className="mt-2 grid grid-cols-7 text-[10px] uppercase tracking-[0.25em] text-white/55">
                  {["W1", "W2", "W3", "W4", "W5", "W6", "W7"].map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard label="Orders Closed" value={totalOrders} icon="shopping_bag">
              <p className="mt-2 text-xs text-[#385419] font-semibold">
                {revenueDelta >= 0 ? "Growth is holding steady." : "Watch conversion pace closely."}
              </p>
            </MetricCard>
            <MetricCard
              label="Average Order Value"
              value={formatCurrency(averageValue)}
              icon="diamond"
            >
              <p className="mt-2 text-xs text-[#385419] font-semibold">
                Crafted purchases are staying premium.
              </p>
            </MetricCard>
            <MetricCard
              label="Revenue Per Order"
              value={formatCurrency(totalOrders ? totalRevenue / totalOrders : 0)}
              accent="primary"
              icon="monitoring"
            >
              <p className="mt-2 text-xs text-white/80 font-semibold">
                A healthy snapshot of current pricing strength.
              </p>
            </MetricCard>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="rounded-[28px] bg-white p-6 shadow-sm border border-[#ebe8cf]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#385419] font-bold">
                    Masterpiece Rankings
                  </p>
                  <h3 className="mt-2 text-2xl font-headline font-semibold text-[#1c1c11]">
                    Best-selling works
                  </h3>
                </div>
                <span className="rounded-full bg-[#f6f4e1] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#385419]">
                  90 Days
                </span>
              </div>

              <div className="space-y-4">
                {bestSellers.length === 0 ? (
                  <div className="rounded-2xl bg-[#f6f4e1] px-4 py-6 text-[#44483d]">
                    No bestseller data available yet.
                  </div>
                ) : (
                  bestSellers.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[22px] bg-[#fcfae6] p-4 border border-[#ece8cb]"
                    >
                      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[#f6f4e1]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          onError={(event) => {
                            event.currentTarget.src =
                              bestsellerFallbacks[index % bestsellerFallbacks.length];
                          }}
                        />
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-[#385419] font-bold">
                          Rank #{index + 1}
                        </p>
                        <h4 className="mt-1 text-lg font-headline font-semibold text-[#1c1c11]">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm text-[#44483d]">
                          {item.units} units sold
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm uppercase tracking-[0.2em] text-[#44483d]">
                          Value
                        </p>
                        <p className="mt-1 text-lg font-bold text-[#385419]">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[28px] bg-[#f6f4e1] p-6 shadow-sm border border-[#ebe8cf]">
              <div className="mb-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#385419] font-bold">
                  Collector Activity
                </p>
                <h3 className="mt-2 text-2xl font-headline font-semibold text-[#1c1c11]">
                  Latest commissions
                </h3>
              </div>

              <div className="space-y-3">
                {activityFeed.length === 0 ? (
                  <div className="rounded-2xl bg-white px-4 py-6 text-[#44483d]">
                    No recent activity available yet.
                  </div>
                ) : (
                  activityFeed.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="rounded-[22px] bg-white p-4 shadow-sm border border-[#ece8cb]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fed65b] text-[#745c00]">
                            <span className="material-symbols-outlined text-base">
                              shopping_bag
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1c1c11]">
                              Order #{item.id}
                            </p>
                            <p className="mt-1 text-sm text-[#44483d]">
                              {item.customer}
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#7b806f]">
                              {item.ago}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-base font-bold text-[#385419]">
                            +{formatCurrency(item.amount)}
                          </p>
                          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#44483d]">
                            {item.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </DashboardShell>
  );
}
