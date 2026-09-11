import "./CountDetail.css";

function CountDetail({ auditDetails }) {
  return (
    <section className="count-detail">
      <div className="count-detail-header">
        <h2>Count Detail ({auditDetails.length})</h2>

        {/* <div className="count-detail-actions">
          <input
            type="text"
            placeholder="Search item, tag, counter"
          />

          <button>Clear filter</button>

          <button>Export to Excel</button>
        </div> */}
      </div>

      <div className="count-detail-tabs">
        <button>Count Details</button>
        <button>Discrepancies</button>
        <button>All Lines</button>
        <button>Matched</button>
        <button>Not Audited</button>
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
            {auditDetails.map((item, index) => (
              <tr key={`${item.METRCUID}-${index}`}>
                <td>
                 {item.ItemName}
                </td>
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