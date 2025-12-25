import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", sales: 5 },
  { day: "Tue", sales: 12 },
  { day: "Wed", sales: 8 },
  { day: "Thu", sales: 20 },
  { day: "Fri", sales: 15 },
];

export default function SalesChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 style={{ marginBottom: "10px" }}>Weekly Sales</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3b5bfd"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
