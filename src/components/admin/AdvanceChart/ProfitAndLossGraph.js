import React, { useState, useEffect, useRef, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin
);

const ProfitAndLossGraph = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const chartRef = useRef(null);

  // Filter data: only show the first hour based on ETime
  useEffect(() => {
    if (data && data.length > 0) {
      const firstTime = new Date(data[0].ETime);
      const oneHourLater = new Date(firstTime.getTime() + 60 * 60 * 1000);
      const initialFilteredData = data.filter((item) => {
        const itemTime = new Date(item.ETime);
        return itemTime >= firstTime && itemTime <= oneHourLater;
      });
      setFilteredData(initialFilteredData.length > 0 ? initialFilteredData : data);
      setOriginalData(data);
    }
  }, [data]);

  // Reset zoom and revert to original data
  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
    setFilteredData(originalData);
  };

  // Define a preset palette of vibrant colors
  const palette = [
    "#66BB6A", // Green
    "#FFA726", // Orange
    "#42A5F5", // Blue
    "#AB47BC", // Purple
    "#EF5350", // Red
    "#29B6F6", // Light Blue
    "#FFCA28", // Amber
  ];

  // Compute colors for each bar using the palette cyclically
  const presetColors = useMemo(() => {
    return filteredData.map((_, i) => palette[i % palette.length]);
  }, [filteredData]);

  const chartData = {
    labels: filteredData.map((item) => new Date(item.ETime)),
    datasets: [
      {
        label: "Profit & Loss",
        data: filteredData.map((item) => item?.PnL || 0),
        backgroundColor: filteredData.map((item) =>
          item?.PnL > 0 ? "#66BB6A" : "#EF5350" // Green for profit, Red for loss
        ),
        borderColor: "#ffffff", // White border for a modern look
        borderWidth: 2,
        barThickness: 18,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      zoom: {
        pan: { enabled: true, mode: "xy", speed: 10 },
        zoom: {
          wheel: { enabled: true, speed: 0.05 },
          pinch: { enabled: true },
          mode: "xy",
          scaleMode: "xy",
        },
      },
      tooltip: {
        backgroundColor: "#5e5c5c",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#555",
        borderWidth: 1,
      },
      legend: {
        labels: {
          font: { family: "Roboto, sans-serif", size: 14 },
          color: "#555",
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
          tooltipFormat: "yyyy-MM-dd hh:mm a",
          displayFormats: {
            minute: "hh:mm a",
            hour: "MMM d, hh:mm a",
            day: "MMM d",
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          font: { size: 12, family: "Roboto, sans-serif" },
          color: "#555",
        },
        grid: {
          color: "#ccc", // Gray grid lines for minimalism
          borderColor: "#ccc",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          autoSkip: true,
          font: { size: 12, family: "Roboto, sans-serif" },
          color: "#555",
        },
        grid: {
          color: "#ccc", // Gray grid lines for minimalism
          borderColor: "#ccc",
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", height: "500px", width: "100%" }}>
      <button
        onClick={resetZoom}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          padding: "6px 14px",
          background: "#2196f3",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        Reset Zoom
      </button>

      {filteredData.length > 0 ? (
        <Bar ref={chartRef} data={chartData} options={chartOptions} />
      ) : (
        <p style={{ textAlign: "center", color: "red", fontSize: "16px" }}>
          No data available to display
        </p>
      )}
    </div>
  );
};

export default ProfitAndLossGraph;
