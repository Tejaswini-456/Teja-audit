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

function PackageCountByItem({ auditDetails }) {
  const itemCounts = new Map();

  auditDetails.forEach((item) => {
    const itemName = item.ItemName;

    if (!itemName) {
      return;
    }

    if (!itemCounts.has(itemName)) {
      itemCounts.set(itemName, 0);
    }

    itemCounts.set(
      itemName,
      itemCounts.get(itemName) + 1
    );
  });

  const itemData = Array.from(
    itemCounts,
    ([itemName, count]) => ({
      itemName,
      count,
    })
  );

  const top20Items = itemData
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  console.log("Item counts:", itemData);
  console.log("Top 20 items:", top20Items);

  return (
    <section className="package-count-by-item">
      <h2>Package count by item</h2>

      <p>Count of count entries per item, top 20</p>

      <div className="package-count-chart">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={top20Items}
            margin={{
              top: 30,
              right: 20,
              left: 10,
              bottom: 100,
            }}
          >
            
           <CartesianGrid
  vertical={false}
  horizontal={true}
  stroke="#3a3d40"
/>

            <XAxis
  dataKey="itemName"
  tick={false}
/>

            <YAxis />

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