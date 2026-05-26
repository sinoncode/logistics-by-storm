import type { ApexOptions } from "apexcharts";

import Chart from "react-apexcharts";

interface ChartColorType {
  chartColor?: string;

  chartWidth?: number;

  chartHeight?: number;

  seriesData?: number[];
}

const SmallAreaChart = ({
  chartColor = "#487fff",

  chartWidth = 80,

  chartHeight = 42,

  seriesData = [],
}: ChartColorType) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "area",

      sparkline: {
        enabled: true,
      },

      toolbar: {
        show: false,
      },
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",

      width: 2,

      colors: [chartColor],

      lineCap: "round",
    },

    fill: {
      type: "gradient",

      colors: [chartColor],

      gradient: {
        shade: "light",

        type: "vertical",

        shadeIntensity: 0.5,

        gradientToColors: [`${chartColor}00`],

        opacityFrom: 0.75,

        opacityTo: 0.3,

        stops: [0, 100],
      },
    },

    tooltip: {
      enabled: true,
    },

    xaxis: {
      labels: {
        show: false,
      },
    },

    yaxis: {
      labels: {
        show: false,
      },
    },

    grid: {
      show: false,
    },
  };

  const chartSeries = [
    {
      name: "Data",

      data: seriesData,
    },
  ];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="area"
      height={chartHeight}
      width={chartWidth}
    />
  );
};

export default SmallAreaChart;