import React from "react";
import "../styles/dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Weekly Sales",
        data: [5, 12, 8, 20, 15],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ["Products", "Orders"],
    datasets: [
      {
        label: "Count",
        data: [25, 5],
        backgroundColor: "#60a5fa",
      },
    ],
  };

  return (
    <div className="dashboard-wrapper">
      {/* ===== TOP CARDS ===== */}
      <div className="stats-cards">
        <div className="card">
          <h3>Total Products</h3>
          <p>25</p>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p>5</p>
        </div>

        <div className="card">
          <h3>Total Users</h3>
          <p>3</p>
        </div>
      </div>

      {/* ===== CHARTS ===== */}
      <div className="charts-section">
        <div className="chart-card">
          <Line data={lineData} />
        </div>

        <div className="chart-card">
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
