import { useState } from "react";
import "./CountDetail.css";

function CountDetail({ auditDetails, auditData }) {
  const [activeTab, setActiveTab] = useState("discrepancies");

  const discrepancyData = auditData.filter(
    (item) => Number(item.Desc_Qty) !== 0
  );

  const matchedData = auditData.filter(
  (item) => Number(item.Desc_Qty) === 0
);

 let tableData = discrepancyData;

  if (activeTab === "discrepancies") {
    tableData = discrepancyData;
  }

  if (activeTab === "allLines") {
  tableData = auditData;
}

if (activeTab === "matched") {
  tableData = matchedData;
}

if (activeTab === "notAudited") {
  tableData = auditDetails;
}
  return (
    <section className="count-detail">
      <div className="count-detail-header">
<h2>
  {activeTab === "discrepancies"
    ? `Count detail (${discrepancyData.length})`
    : activeTab === "allLines"
    ? `Count detail (${auditData.length})`
    : activeTab === "matched"
    ? `Count detail (${matchedData.length})`
    : `Count detail (${auditDetails.length})`}
</h2>
        <div className="count-detail-actions">
          <input
            type="text"
            placeholder="Search item, tag, counter"
          />

          <button type="button">
            Search
          </button>

          <button type="button">
            Clear filter
          </button>

          <button type="button">
            Export to Excel
          </button>
        </div>
      </div>

      <div className="count-detail-tabs">

        <button
          type="button"
          className={activeTab === "discrepancies" ? "active" : ""}
          onClick={() => setActiveTab("discrepancies")}
        >
          Discrepancies
        </button>

        <button
          type="button"
          className={activeTab === "allLines" ? "active" : ""}
          onClick={() => setActiveTab("allLines")}
        >
          All Lines
        </button>

        <button
          type="button"
          className={activeTab === "matched" ? "active" : ""}
          onClick={() => setActiveTab("matched")}
        >
          Matched
        </button>

        <button
          type="button"
          className={activeTab === "notAudited" ? "active" : ""}
          onClick={() => setActiveTab("notAudited")}
        >
          Not Audited
        </button>
      </div>

      <div className="count-detail-table-container">
        <table className="count-detail-table">
          <thead>
            <tr>
              <th>ITEM</th>
              <th>METRC UID</th>
              <th>HARVEST</th>
              <th>WAREHOUSE</th>
            </tr>
          </thead>

          <tbody>
     

            {activeTab === "discrepancies" &&
              tableData.map((item, index) => (
                <tr key={`${item.U_METRCUID}-${index}`}>
                  <td>{item.U_NITEM}</td>
                  <td>{item.U_METRCUID}</td>
                  <td>{item.U_NHRST}</td>
                  <td>{item.U_NLOCN}</td>
                </tr>
              ))}

              {activeTab === "allLines" &&
  tableData.map((item, index) => (
    <tr key={`${item.U_METRCUID}-${index}`}>
      <td>{item.U_NITEM}</td>
      <td>{item.U_METRCUID}</td>
      <td>{item.U_NHRST}</td>
      <td>{item.U_NLOCN}</td>
    </tr>
  ))}

  {activeTab === "matched" &&
  tableData.map((item, index) => (
    <tr key={`${item.U_METRCUID}-${index}`}>
      <td>{item.U_NITEM}</td>
      <td>{item.U_METRCUID}</td>
      <td>{item.U_NHRST}</td>
      <td>{item.U_NLOCN}</td>
    </tr>
  ))}

{activeTab === "notAudited" &&
  tableData.map((item, index) => (
    <tr key={`${item.METRCUID}-${index}`}>
      <td>{item.ItemName}</td>
      <td>{item.METRCUID}</td>
      <td>{item.HarvestName}</td>
      <td>{item.BinLocationCode}</td>
    </tr>
  ))}
            {activeTab !== "countDetails" &&
              activeTab !== "discrepancies" && (
                <tr>
                  <td colSpan="4"></td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CountDetail;