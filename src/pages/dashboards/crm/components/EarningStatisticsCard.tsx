import { useEffect } from "react";

import {
  ArrowBigUp,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import BarChartYear from "@/components/charts/BarChartYear";

import CustomSelect from "@/components/shared/CustomSelect";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { useDashboardStore }
  from "@/store/dashboardStore";

import { useRevenueChartStore }
  from "@/store/revenueChartStore";

  import { useMemo } from "react";

const EarningStatisticsCard =
  () => {

    /* =====================================================
       DASHBOARD STORE
    ===================================================== */

    const {
      dashboard,
      loading:
        dashboardLoading,
      fetchDashboard,
    } = useDashboardStore();

    /* =====================================================
       REVENUE CHART STORE
    ===================================================== */

    const {
      revenueChart,
      filter,
      loading:
        revenueLoading,
      setFilter,
      fetchRevenueChart,
    } =
      useRevenueChartStore();

    /* =====================================================
       FETCH INITIAL DATA
    ===================================================== */

    useEffect(() => {
      fetchDashboard();

      fetchRevenueChart(
        "monthly"
      );
    }, []);

    /* =====================================================
       HANDLE FILTER CHANGE
    ===================================================== */

    const handleFilterChange = (
      value: string
    ) => {

      const selectedFilter =
        value.toLowerCase();

      setFilter(
        selectedFilter
      );

      fetchRevenueChart(
        selectedFilter
      );

      console.log(value);
    };

    /* =====================================================
   REPORT PERIOD LABEL
===================================================== */

const reportLabel =
  useMemo(() => {

    if (
      !revenueChart?.labels?.length
    ) {
      return "";
    }

    /* =========================
       MONTHLY
    ========================= */

    if (
      filter === "monthly"
    ) {

      const firstLabel =
        revenueChart.labels[0];

      // Example: 01 May

      const month =
        firstLabel.split(" ")[1];

      return `${month} Monthly Report`;
    }

    /* =========================
       YEARLY
    ========================= */

    if (
      filter === "yearly"
    ) {

      const currentYear =
        new Date().getFullYear();

      return `${currentYear} Yearly Report`;
    }

    /* =========================
       WEEKLY
    ========================= */

   if (
  filter === "weekly"
) {

  const fromDate =
    new Date(
      revenueChart.range.from
    );

  const month =
    fromDate.toLocaleString(
      "default",
      {
        month: "short",
      }
    );

  const day =
    fromDate.getDate();

  let week =
    "1st";

  if (
    day >= 8 &&
    day <= 14
  ) {
    week = "2nd";
  } else if (
    day >= 15 &&
    day <= 21
  ) {
    week = "3rd";
  } else if (
    day >= 22 &&
    day <= 28
  ) {
    week = "4th";
  } else if (
    day >= 29
  ) {
    week = "5th";
  }

  return `${month} ${week} Week Report`;
}

    return "";
  }, [
    filter,
    revenueChart,
  ]);

    /* =====================================================
       LOADING
    ===================================================== */

    if (
      dashboardLoading ||
      revenueLoading
    ) {
      return (
        <div className="py-10 text-center text-sm text-neutral-500">
          Loading revenue statistics...
        </div>
      );
    }

    return (
      <Card className="card h-full rounded-2xl border border-gray-200 dark:border-neutral-700 shadow-sm overflow-hidden">

        <CardContent className="p-6">

          {/* ============================================
              HEADER
          ============================================= */}

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>
              <h6 className="text-xl font-bold">
                Revenue Statistics
              </h6>

              <p className="text-sm text-neutral-500">
                Dynamic revenue analytics overview
              </p>
            </div>

            <div className="min-w-[140px]">

              <CustomSelect
  placeholder={
    filter.charAt(0).toUpperCase() +
    filter.slice(1)
  }
  options={[
    "Weekly",
    "Monthly",
    "Yearly",
  ]}
  onValueChange={
    handleFilterChange
  }
/>

            </div>
          </div>

          {/* ============================================
              STATS
          ============================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 mt-7">

            {/* Revenue */}

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4 bg-gradient-to-br from-cyan-50 to-white dark:from-neutral-900 dark:to-neutral-900">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                  <DollarSign size={22} />
                </div>

                <div>
                  <p className="text-sm text-neutral-500">
                    Revenue
                  </p>

                  <h4 className="text-xl font-bold">
                    $
                    {dashboard?.tiles?.total_revenue?.toFixed(
                      2
                    ) || "0.00"}
                  </h4>
                </div>

              </div>
            </div>

            {/* Shipments */}

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4 bg-gradient-to-br from-yellow-50 to-white dark:from-neutral-900 dark:to-neutral-900">

  <div className="flex items-center gap-3">

    <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
      <TrendingUp size={22} />
    </div>

    <div>

      <p className="text-sm text-neutral-500">
        Report Period
      </p>

      <h4 className="text-lg font-bold">
        {reportLabel}
      </h4>

    </div>

  </div>
</div>

            {/* Completed */}

            {/* <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4 bg-gradient-to-br from-green-50 to-white dark:from-neutral-900 dark:to-neutral-900">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                  <ArrowBigUp size={22} />
                </div>

                <div>
                  <p className="text-sm text-neutral-500">
                    Completed
                  </p>

                  <h4 className="text-xl font-bold">
                    {
                      dashboard?.tiles
                        ?.completed_shipments
                    }
                  </h4>
                </div>

              </div>
            </div> */}
          </div>

          {/* ============================================
              CHART
          ============================================= */}

          <div className="mt-8">

          <BarChartYear
  chartHeight={330}
  labels={
    revenueChart?.labels || []
  }
  seriesData={
    revenueChart?.data || []
  }
  filter={filter}
/>
          </div>

        </CardContent>
      </Card>
    );
  };

export default EarningStatisticsCard;