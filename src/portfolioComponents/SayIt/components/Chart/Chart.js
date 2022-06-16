import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
//Css
import "./Chart.sass";

const data01 = [
  { name: "Support", value: 31 },
  { name: "Complaints", value: 18 },
  { name: "Sales", value: 53 },
  { name: "IT issue", value: 31 },
];

const colors = ["#f76c82", "#66d4f1", "#fbd277", "#b3a4ee"];
export default function Chart() {
  return (
    <div id={"chart__container"} className="create__card__container">
      <div id="chart__card">
        <ResponsiveContainer>
          <PieChart width={200} height={200}>
            <Pie
              data={data01}
              dataKey="value"
              fill="#8884d8"
              paddingAngle={3}
              labelLine
              label
            >
              {data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
