import type { ApexOptions } from "apexcharts";

import Chart from "react-apexcharts";

interface BarChartYearProps {
  chartHeight?: number;

  labels?: string[];

  seriesData?: number[];

  filter?: string;
}

const BarChartYear = ({
  chartHeight = 330,

  labels = [],

  seriesData = [],

  filter,
}: BarChartYearProps) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",

      toolbar: {
        show: false,
      },

      sparkline: {
        enabled: false,
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 6,

        columnWidth: "45%",
      },
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: false,
    },

  xaxis: {
  categories: labels,

  labels: {
    show: true,

    formatter: (
      value: string
    ) => {

      /* =========================
         MONTHLY
         Show only dates
      ========================= */

      if (
        filter === "monthly"
      ) {

        // 01 May => 01

        return value.split(
          " "
        )[0];
      }

      /* =========================
         YEARLY / WEEKLY
      ========================= */

      return value;
    },
  },

  axisBorder: {
    show: true,
  },

  axisTicks: {
    show: true,
  },
},

    yaxis: {
      labels: {
        formatter: (value) => `$${value}`,
      },
    },

    grid: {
      borderColor: "#f1f1f1",

      strokeDashArray: 4,
    },

    tooltip: {
      y: {
        formatter: (value) =>
          `$${value}`,
      },
    },

    colors: ["#00b8f2"],
  };

  const chartSeries = [
    {
      name: "Revenue",

      data: seriesData,
    },
  ];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      height={chartHeight}
    />
  );
};

export default BarChartYear;