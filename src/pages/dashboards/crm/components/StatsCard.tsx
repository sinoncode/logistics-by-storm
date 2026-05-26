import SmallAreaChart from "@/components/charts/SmallAreaChart";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  DollarSign,
  LineChart,
  TrendingUp,
  Users,
} from "lucide-react";

import { useEffect } from "react";

import { useDashboardStore } from "@/store/dashboardStore";

interface StatItem {
  id: string;

  title: string;

  value: string;

  change: string;

  chartData: number[];

  changeColor: "success" | "danger";

  gradientFrom: string;

  bgCircle: string;

  icon: LucideIcon;

  chartId?: string;
}
const StatsCard = () => {
  const { dashboard, loading, fetchDashboard } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const stats: StatItem[] = [
  {
  id: "new-users",

  title: "Total Users",

  value:
    dashboard?.tiles?.total_users?.toString() || "0",

  chartData:
    dashboard?.shipment_chart?.data || [],

  change: "+200",

  changeColor: "success",

  gradientFrom: "from-blue-600/10",

  bgCircle: "#487fff",

  icon: Users,
},
{
  id: "total-sales",

  title: "Total Shipments",

  value:
    dashboard?.tiles?.total_shipments?.toString() ||
    "0",

  chartData:
    dashboard?.shipment_chart?.data || [],

  change: "Shipments",

  changeColor: "danger",

  gradientFrom:
    "from-yellow-500/10",

  bgCircle: "#f4941e",

  icon: DollarSign,

  chartId:
    "total-sales-chart",
},

{
  id: "conversion",

  title: "Shipment Requested",

  value:
    dashboard?.tiles?.requested_shipments?.toString() ||
    "0",

  chartData:
    dashboard?.shipment_chart?.data || [],

  change: "Requests",

  changeColor: "danger",

  gradientFrom:
    "from-purple-600/10",

  bgCircle: "#daba07",

  icon: BarChart3,

  chartId:
    "conversion-user-chart",
},

{
  id: "leads",

  title: "Completed Shipments",

  value:
    dashboard?.tiles?.completed_shipments?.toString() ||
    "0",

  chartData:
    dashboard?.shipment_chart?.data || [],

  change: "Completed",

  changeColor: "success",

  gradientFrom:
    "from-pink-600/10",

  bgCircle: "#de3ace",

  icon: LineChart,

  chartId:
    "leads-chart",
},

{
  id: "total-profit",

  title: "Total Revenue",

  value: `$${(
    dashboard?.tiles?.total_revenue || 0
  ).toFixed(2)}`,

  chartData:
    dashboard?.revenue_chart?.data || [],

  change: "Revenue",

  changeColor: "success",

  gradientFrom:
    "from-cyan-600/10",

  bgCircle: "#00b8f2",

  icon: TrendingUp,

  chartId:
    "total-profit-chart",
},
  ];

  if (loading) {
    return <div className="py-10 text-center">Loading dashboard...</div>;
  }

  return (
    <>
      {stats.map((item) => {
        const Icon = item.icon;

        const colorClass =
          item.changeColor === "success"
            ? "bg-green-100 dark:bg-green-600/25 text-green-600 dark:text-green-400"
            : "bg-red-100 dark:bg-red-600/25 text-red-600 dark:text-red-400";

        return (
          <Card
            key={item.id}
            className={`card !px-4 !py-5 shadow-none rounded-lg !border border-gray-200 dark:border-neutral-600 h-full bg-gradient-to-l ${item.gradientFrom} to-bg-white`}
          >
            <CardContent className="p-0">
              <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      backgroundColor: item.bgCircle,
                    }}
                    className="w-[44px] h-[44px] text-white flex justify-center items-center rounded-full"
                  >
                    <Icon className="w-6 h-6" />
                  </span>

                  <div>
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-100">
                      {item.title}
                    </span>

                    <h6 className="font-semibold">{item.value}</h6>
                  </div>
                </div>

                <div className="remove-tooltip-title rounded-tooltip-value remove-tooltip-marker">
                  <SmallAreaChart
                    chartColor={item.bgCircle}
                    chartWidth={80}
                    chartHeight={42}
                    seriesData={item.chartData}
                  />
                </div>
              </div>

              <p className="text-sm mb-0 text-neutral-600 dark:text-neutral-100">
                Dashboard Statistics
              </p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default StatsCard;
