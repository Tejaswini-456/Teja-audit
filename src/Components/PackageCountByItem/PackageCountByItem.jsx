import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import "./PackageCountByItem.css";

function PackageCountByItem({ itemGroupCounts }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const itemGroupData = itemGroupCounts
    .filter((item) => item.ItmsGrpNam)
    .map((item) => ({
      itemGroupName: item.ItmsGrpNam,
      count: Number(item.records) || 0,
    }));

  const top20ItemGroups = itemGroupData
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  console.log("Item group counts:", itemGroupData);
  console.log("Top 20 item groups:", top20ItemGroups);

  return (
    <section
      className={`package-count-by-item ${
        isExpanded ? "expanded" : ""
      }`}
    >
      <div className="package-count-header">
        <div>
          <h2>Package count by item group</h2>
          <p>Count of audit records per item group, top 20</p>
        </div>

        <button
          type="button"
          className="package-count-expand-button"
          onClick={() => setIsExpanded((previous) => !previous)}
          aria-label={isExpanded ? "Minimize chart" : "Expand chart"}
          title={isExpanded ? "Minimize chart" : "Expand chart"}
        >
          {isExpanded ? "⤡" : "⤢"}
        </button>
      </div>

      <div className="package-count-chart">
        <ResponsiveContainer width="100%" height="100%">
     <BarChart
  data={top20ItemGroups}
  margin={{
    top: 30,
    right: 20,
    left: 10,
    bottom: 20,
  }}
  barCategoryGap="4%"
>
            <CartesianGrid
              vertical={false}
              horizontal={true}
              stroke="#3a3d40"
            />
<XAxis
  dataKey="itemGroupName"
  tick={false}
/>

            <YAxis
              tickCount={5}
              allowDecimals={false}
            />

            <Tooltip />

           <Bar
  dataKey="count"
  fill="#20c997"
  barSize={18}
>
              <LabelList
                dataKey="count"
                position="top"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default PackageCountByItem;