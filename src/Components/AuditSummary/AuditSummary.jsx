import "./AuditSummary.css";

function AuditSummary({
  auditCoverage,
  allLinesCount,
  totalAuditLines,
  countersActive,
  linesFlagged,
  linesMatched
}) {
  return (
    <section className="audit-summary">
      <div className="summary-card">
        <p className="summary-title">AUDIT COVERAGE</p>

        <h2 className="summary-value">
          {auditCoverage === null
            ? ""
            : `${auditCoverage.toFixed(0)}%`}
        </h2>

        <p className="summary-description">
          {allLinesCount === null ||
          totalAuditLines === null
            ? ""
            : `${allLinesCount} of ${totalAuditLines} items counted`}
        </p>
      </div>

      <div className="summary-card">
        <p className="summary-title">LINES FLAGGED</p>

        <h2 className="summary-value">
          {linesFlagged === null
            ? ""
            : linesFlagged}
        </h2>

        <p className="summary-description">
          {linesMatched === null
            ? ""
            : `${linesMatched} lines matched exactly`}
        </p>
      </div>

      <div className="summary-card">
        <p className="summary-title">COUNTERS ACTIVE</p>

        <h2 className="summary-value">
          {countersActive === null
            ? ""
            : countersActive}
        </h2>

        <p className="summary-description">
          Employees submitting counts
        </p>
      </div>
    </section>
  );
}

export default AuditSummary;