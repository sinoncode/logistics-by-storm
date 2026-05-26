import Chart from "react-apexcharts";

import type { ApexOptions } from "apexcharts";

interface ShipmentLineChartProps {
  labels: string[];

  seriesData: number[];

  chartHeight?: number;
}

const ShipmentLineChart = ({
  labels,
  seriesData,
  chartHeight = 300,
}: ShipmentLineChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: "line",

      height: chartHeight,

      toolbar: {
        show: false,
      },

      zoom: {
        enabled: false,
      },

      animations: {
        enabled: true,

        easing: "easeinout",

        speed: 800,
      },
    },

    stroke: {
      curve: "smooth",

      width: 4,
    },

    colors: ["#487FFF"],

    grid: {
      borderColor: "#e5e7eb",

      strokeDashArray: 4,

      padding: {
        left: 10,
        right: 10,
      },
    },

    markers: {
      size: 5,

      strokeWidth: 2,

      hover: {
        size: 8,
      },
    },

    xaxis: {
      categories: labels,

      labels: {
        style: {
          fontSize: "12px",
        },
      },

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },

    tooltip: {
      theme: "light",

      y: {
        formatter: (value) =>
          `${value} Shipments`,
      },
    },

    dataLabels: {
      enabled: false,
    },

    fill: {
      type: "gradient",

      gradient: {
        shadeIntensity: 1,

        opacityFrom: 0.4,

        opacityTo: 0.05,

        stops: [0, 100],
      },
    },
  };

  const series = [
    {
      name: "Shipments",

      data: seriesData,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      height={chartHeight}
    />
  );
};

export default ShipmentLineChart;