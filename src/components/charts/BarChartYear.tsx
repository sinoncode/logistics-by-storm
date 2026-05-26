import type { ApexOptions } from "apexcharts";

import Chart from "react-apexcharts";

interface BarChartYearProps {
  chartHeight?: number;

  labels?: string[];

  seriesData?: number[];
}

const BarChartYear = ({
  chartHeight = 330,

  labels = [],

  seriesData = [],
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
        style: {
          fontSize: "12px",
        },
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