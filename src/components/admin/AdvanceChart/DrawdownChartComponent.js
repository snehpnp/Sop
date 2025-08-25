import React, { useState, useEffect, useRef } from "react";
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

const DrawdownChartComponent = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      const firstTimestamp = new Date(data[0]?.ETime || data[0]?.ExitTime).getTime();
      const oneHourLater = firstTimestamp + 60 * 60 * 1000; // +1 hour in milliseconds

      const initialFilteredData = data.filter(
        (item) => new Date(item.ETime || item.ExitTime).getTime() <= oneHourLater
      );

      setFilteredData(initialFilteredData);
    }
  }, [data]);

  // Always start curve from 0 at the first timestamp
  let chartPoints = [];
  if (filteredData.length > 0) {
    const firstTime = new Date(filteredData[0]?.ETime || filteredData[0]?.ExitTime || Date.now());
    chartPoints.push({ x: firstTime, y: 0 });
    chartPoints = chartPoints.concat(
      filteredData.map((item) => ({
        x: new Date(item?.ETime || item?.ExitTime || Date.now()),
        y: item?.Drawdown || 0,
      }))
    );
  }

  const chartData = {
    labels: chartPoints.map((pt) => pt.x),
    datasets: [
      {
        label: "Drawdown",
        data: chartPoints.map((pt) => pt.y),
        borderColor: "#2196f3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x", // Allow panning in x-axis only
          speed: 10,
        },
        zoom: {
          wheel: { enabled: true, speed: 0.05 }, // Smooth zoom on mouse wheel
          pinch: { enabled: true }, // Zoom on pinch (mobile)
          mode: "xy", // Zoom only in x direction
          scaleMode: "xy", // Prevent y-axis zooming
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
            hour: "MMM D, hh:mm a",
            day: "MMM D",
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          autoSkip: true,
          font: { size: 12 },
        },
      },
    },
  };

  // Reset Zoom handler
  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <button
        onClick={handleResetZoom}
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
      <Line ref={chartRef} data={chartData} options={chartOptions} height={350}/>
    </div>
  );
};

export default DrawdownChartComponent;
