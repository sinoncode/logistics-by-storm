import {
  useEffect,
} from "react";

import {
  Package,
  Truck,
} from "lucide-react";

import ShipmentLineChart from "@/components/charts/ShipmentLineChart";

import CustomSelect from "@/components/shared/CustomSelect";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  useShipmentChartStore,
} from "@/store/shipmentChartStore";

const ShipmentAnalyticsCard =
  () => {
    const {
      shipmentChart,

      filter,

      loading,

      fetchShipmentChart,

      setFilter,
    } =
      useShipmentChartStore();

    useEffect(() => {
      fetchShipmentChart(
        "yearly"
      );
    }, []);

    const handleFilterChange = (
      value: string
    ) => {
      const selectedFilter =
        value.toLowerCase();

      setFilter(
        selectedFilter
      );

      fetchShipmentChart(
        selectedFilter
      );
    };

    const totalShipments =
      shipmentChart?.data.reduce(
        (acc, curr) =>
          acc + curr,
        0
      ) || 0;

    return (
      <Card className="border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-sm overflow-hidden h-full">
        <CardContent className="p-6">

          {/* Header */}

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>
              <h3 className="text-xl font-bold">
                Shipment Analytics
              </h3>

              <p className="text-sm text-neutral-500">
                Shipment performance overview
              </p>
            </div>

            <div className="min-w-[140px]">
              <CustomSelect
                placeholder={
                  filter
                    .charAt(0)
                    .toUpperCase() +
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

          {/* Stats */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

            {/* Total Shipments */}

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4 bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-900">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Package size={22} />
                </div>

                <div>
                  <p className="text-sm text-neutral-500">
                    Total Shipments
                  </p>

                  <h4 className="text-xl font-bold">
                    {
                      totalShipments
                    }
                  </h4>
                </div>
              </div>
            </div>

            {/* Current Filter */}

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4 bg-gradient-to-br from-cyan-50 to-white dark:from-neutral-900 dark:to-neutral-900">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                  <Truck size={22} />
                </div>

                <div>
                  <p className="text-sm text-neutral-500">
                    Current Filter
                  </p>

                  <h4 className="text-xl font-bold capitalize">
                    {filter}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}

          <div className="mt-8">

            {loading ? (
              <div className="h-[320px] flex items-center justify-center text-sm text-neutral-500">
                Loading shipment chart...
              </div>
            ) : (
             <ShipmentLineChart
  labels={
    shipmentChart?.labels || []
  }
  seriesData={
    shipmentChart?.data || []
  }
  filter={filter}
  chartHeight={320}
/>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

export default ShipmentAnalyticsCard;