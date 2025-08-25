import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-date-fns"; // Ensure date-fns is imported for time scale

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin
);

const ChartComponent = ({ data }) => {
  const [timeFormat, setTimeFormat] = useState("minute");
  // Chart data from passed `data` prop
  const chartData = {
    labels: data?.map((item) => new Date(item?.ETime || item?.ExitTime || Date.now())), // Fallback to current time if ETime or ExitTime is missing
    datasets: [
      {
        label: "Equity Curve",
        data: data.map((item) => item?.EquityCurve || item?.PnL || 0), // Fallback to 0 if EquityCurve or PnL is missing
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(136, 136, 136, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  // Update time format based on zoom level
  const updateTimeFormat = (chart) => {
    // Get the current range of the chart (zoom level)
    const { min, max } = chart.chartArea;
    const timeRange = max - min;

    if (timeRange > 86400000) { // 86400000ms = 24 hours
      setTimeFormat("day"); // Show date if more than 24 hours
    } else {
      setTimeFormat("minute"); // Show time in minutes if less than 24 hours
    }
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      zoom: {
        zoom: {
          wheel: { enabled: true }, // Enable zoom using mouse wheel
          pinch: { enabled: true }, // Enable pinch zoom
          mode: "xy", // Zoom along both x and y axes
        },
        pan: {
          enabled: true, // Enable panning
          mode: "xy", // Allow panning on both x and y axes (horizontal + vertical panning)
          speed: 10, // Set pan speed
        },
      },
    },
    scales: {
      x: {
        type: "time", // Use 'time' scale for x-axis
        time: {
          unit: timeFormat, // Dynamic time format based on zoom level
          tooltipFormat: "yyyy-MM-dd hh:mm a", // Updated format for tooltip with AM/PM
          displayFormats: {
            minute: "hh:mm a", // Show time in hours and minutes with AM/PM when zoomed in
            day: "MMM D", // Show day when zoomed out (24 hours or more)
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 15, // Limit visible labels to avoid overlap
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true, // Start y-axis from zero
        ticks: {
          autoSkip: true, // Auto skip y-axis labels if necessary
          font: { size: 12 },
        },
      },
    },
    // Update time format whenever the chart is zoomed or panned
    onZoom: updateTimeFormat,
    onPan: updateTimeFormat,
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default ChartComponent;
