import "./AuditSummary.css";
function AuditSummary({countersActive,linesFlagged,
  linesMatched }) {
  return (
    <section className="audit-summary">
      <div className="summary-card">
        <p className="summary-title">AUDIT COVERAGE</p>
        <h2 className="summary-value">%</h2>
        <p className="summary-description">x of y items counted</p>
      </div>

      <div className="summary-card">
        <p className="summary-title">LINES FLAGGED</p>
        <h2 className="summary-value">{linesFlagged}</h2>
        <p className="summary-description">{linesMatched} lines matched exactly</p>
      </div>

      <div className="summary-card">
        <p className="summary-title">COUNTERS ACTIVE</p>
        <h2 className="summary-value">{countersActive}</h2>
        <p className="summary-description">Employees submitting counts</p>
      </div>
    </section>
  );
}

export default AuditSummary;