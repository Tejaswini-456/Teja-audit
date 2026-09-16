import { useState } from "react";
import * as XLSX from "xlsx";
import "./CountDetail.css";

function CountDetail({ auditDetails, auditData }) {
  const [activeTab, setActiveTab] = useState("discrepancies");
  const [searchText, setSearchText] = useState("");

  const discrepancyData = auditData.filter(
    (item) => Number(item.Desc_Qty) !== 0
  );

  const matchedData = auditData.filter(
    (item) => Number(item.Desc_Qty) === 0
  );

  let tableData = discrepancyData;

  if (activeTab === "allLines") {
    tableData = auditData;
  }

  if (activeTab === "matched") {
    tableData = matchedData;
  }

  if (activeTab === "notAudited") {
    tableData = auditDetails;
  }

  const filteredTableData = tableData.filter((item) => {
    const itemName =
      activeTab === "notAudited"
        ? item.ItemName
        : item.U_NITEM;

    return String(itemName || "")
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });

  const detailCount =
    activeTab === "discrepancies"
      ? discrepancyData.length
      : activeTab === "allLines"
      ? auditData.length
      : activeTab === "matched"
      ? matchedData.length
      : auditDetails.length;

  function handleExport() {
    const exportData = filteredTableData.map((item) => {
      if (activeTab === "notAudited") {
        return {
          ITEM: item.ItemName,
          "METRC UID": item.METRCUID,
          HARVEST: item.HarvestName,
          WAREHOUSE: item.BinLocationCode,
        };
      }

      return {
        ITEM: item.U_NITEM,
        "METRC UID": item.U_METRCUID,
        HARVEST: item.U_NHRST,
        WAREHOUSE: item.U_NLOCN,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Count Detail"
    );

    XLSX.writeFile(
      workbook,
      `count-detail-${activeTab}.xlsx`
    );
  }

  return (
    <section className="count-detail">
      <div className="count-detail-header">
        <h2>
          Count detail ({detailCount})
        </h2>

        <div className="count-detail-actions">
          <input
            type="text"
            placeholder="Search item, tag, counter"
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
          />

          <button
            type="button"
            onClick={() => setSearchText("")}
          >
            Clear filter
          </button>

          <button
            type="button"
            onClick={handleExport}
          >
            Export to Excel
          </button>
        </div>
      </div>

      <div className="count-detail-tabs">
        <button
          type="button"
          className={
            activeTab === "discrepancies" ? "active" : ""
          }
          onClick={() => setActiveTab("discrepancies")}
        >
          Discrepancies
        </button>

        <button
          type="button"
          className={
            activeTab === "allLines" ? "active" : ""
          }
          onClick={() => setActiveTab("allLines")}
        >
          All Lines
        </button>

        <button
          type="button"
          className={
            activeTab === "matched" ? "active" : ""
          }
          onClick={() => setActiveTab("matched")}
        >
          Matched
        </button>

        <button
          type="button"
          className={
            activeTab === "notAudited" ? "active" : ""
          }
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
              filteredTableData.map((item, index) => (
                <tr
                  key={`${item.U_METRCUID}-${index}`}
                >
                  <td>{item.U_NITEM}</td>
                  <td>{item.U_METRCUID}</td>
                  <td>{item.U_NHRST}</td>
                  <td>{item.U_NLOCN}</td>
                </tr>
              ))}

            {activeTab === "allLines" &&
              filteredTableData.map((item, index) => (
                <tr
                  key={`${item.U_METRCUID}-${index}`}
                >
                  <td>{item.U_NITEM}</td>
                  <td>{item.U_METRCUID}</td>
                  <td>{item.U_NHRST}</td>
                  <td>{item.U_NLOCN}</td>
                </tr>
              ))}

            {activeTab === "matched" &&
              filteredTableData.map((item, index) => (
                <tr
                  key={`${item.U_METRCUID}-${index}`}
                >
                  <td>{item.U_NITEM}</td>
                  <td>{item.U_METRCUID}</td>
                  <td>{item.U_NHRST}</td>
                  <td>{item.U_NLOCN}</td>
                </tr>
              ))}

            {activeTab === "notAudited" &&
              filteredTableData.map((item, index) => (
                <tr
                  key={`${item.METRCUID}-${index}`}
                >
                  <td>{item.ItemName}</td>
                  <td>{item.METRCUID}</td>
                  <td>{item.HarvestName}</td>
                  <td>{item.BinLocationCode}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CountDetail;