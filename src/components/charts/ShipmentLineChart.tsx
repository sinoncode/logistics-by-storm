import Chart from "react-apexcharts";

import type { ApexOptions } from "apexcharts";

interface ShipmentLineChartProps {
  labels: string[];

  seriesData: number[];

  chartHeight?: number;

  filter?: string;
}

const ShipmentLineChart = ({
  labels,
  seriesData,
  chartHeight = 300,
  filter = "yearly",
}: ShipmentLineChartProps) => {

  /* =========================================
     FORMAT LABELS
  ========================================= */

const formattedLabels =
  filter === "monthly"
    ? labels.map((label) => {
        // "01 May"
        // becomes "01"

        return label.split(" ")[0];
      })
    : labels;

  /* =========================================
     CHART OPTIONS
  ========================================= */

  const options: ApexOptions = {
    chart: {
      type: "area",

      height: chartHeight,

      toolbar: {
        show: false,
      },

      zoom: {
        enabled: false,
      },

      animations: {
        enabled: true,

        speed: 900,

        animateGradually: {
          enabled: true,
          delay: 150,
        },

        dynamicAnimation: {
          enabled: true,
          speed: 500,
        },
      },
    },

    colors: ["#487FFF"],

    stroke: {
      curve: "smooth",

      width: 4,
    },

    fill: {
      type: "gradient",

      gradient: {
        shadeIntensity: 1,

        opacityFrom: 0.35,

        opacityTo: 0.03,

        stops: [0, 100],
      },
    },

    grid: {
      borderColor: "#e5e7eb",

      strokeDashArray: 5,

      padding: {
        left: 10,
        right: 10,
      },
    },

    markers: {
      size: 4,

      strokeWidth: 2,

      hover: {
        size: 7,
      },
    },

    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories:
        formattedLabels,

      labels: {
        show: true,

        rotate: 0,

        hideOverlappingLabels:
          false,

        trim: true,

        style: {
          fontSize: "12px",

          colors:
            "#6b7280",
        },

        formatter: (
          value: string
        ) => {
          return value;
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
        formatter: (
          value: number
        ) =>
          `${value} Shipments`,
      },
    },

    responsive: [
      {
        breakpoint: 768,

        options: {
          stroke: {
            width: 3,
          },

          markers: {
            size: 3,
          },
        },
      },
    ],
  };

  /* =========================================
     SERIES
  ========================================= */

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