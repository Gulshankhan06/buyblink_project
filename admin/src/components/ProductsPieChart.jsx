import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Men", value: 6 },
  { name: "Women", value: 4 },
  { name: "Kids", value: 2 },
];

export default function ProductsPieChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 style={{ textAlign: "center" }}>Products by Category</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            fill="#3b5bfd"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
