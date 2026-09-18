import { useEffect, useState } from "react";
import {
  fetchAuditData,
  fetchAuditDetails,
  fetchItemGroupCounts
} from "../services/auditApi";
import AuditSummary from "../Components/AuditSummary/AuditSummary";
import CountDetail from "../Components/CountDetail/CountDetail";
import PackagesByCounter from "../Components/PackagesByCounter/PackagesByCounter";
import PackageCountByItem from "../Components/PackageCountByItem/PackageCountByItem";
import "./AuditReport.css";

function AuditReport() {
  const [auditData, setAuditData] = useState([]);
  const [auditDetails, setAuditDetails] = useState([]);
  const [itemGroupCounts, setItemGroupCounts] = useState([]);
  const [auditDataLoaded, setAuditDataLoaded] = useState(false);
  const [auditDetailsLoaded, setAuditDetailsLoaded] = useState(false);
  const [itemGroupCountsLoaded, setItemGroupCountsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data1 = await fetchAuditData();

        console.log("API 1 full response:", data1);
        console.log("API 1 records:", data1.value);

        setAuditData(data1.value || []);
        setAuditDataLoaded(true);

        const data2 = await fetchAuditDetails();

        console.log("API 2 full response:", data2);
        console.log("API 2 records:", data2.value);

        setAuditDetails(data2.value || []);
        setAuditDetailsLoaded(true);

        const data3 = await fetchItemGroupCounts();

        console.log("Item group count full response:", data3);
        console.log("Item group count records:", data3.value);

        setItemGroupCounts(data3.value || []);
        setItemGroupCountsLoaded(true);
      } catch (error) {
        console.error("API error:", error);
      }
    }

    loadData();
  }, []);

  const uniquePackages = new Set(
    auditData
      .map((item) => item.U_METRCUID)
      .filter(Boolean)
  ).size;

  const packagesByCounter = new Map();

  auditData.forEach((item) => {
    const counter = item.U_NAME;

    if (!counter) {
      return;
    }

    if (!packagesByCounter.has(counter)) {
      packagesByCounter.set(counter, 0);
    }

    packagesByCounter.set(
      counter,
      packagesByCounter.get(counter) + 1
    );
  });

  const counterData = Array.from(
    packagesByCounter,
    ([counter, count]) => ({
      counter,
      packageCount: count,
    })
  );

  console.log("Packages counted by counter:", counterData);

  const countersActive = counterData.length;

  const linesFlagged = auditData.filter(
    (item) => Number(item.Desc_Qty) !== 0
  ).length;

  const totalCountEntries = counterData.reduce(
    (total, item) => total + item.packageCount,
    0
  );

  const linesMatched = totalCountEntries - linesFlagged;

  const allLinesCount = auditData.length;
  const notAuditedCount = auditDetails.length;
  const totalAuditLines = allLinesCount + notAuditedCount;

  const auditCoverage =
    totalAuditLines > 0
      ? (allLinesCount / totalAuditLines) * 100
      : 0;

  const currentDate = new Date();

  const currentMonth = currentDate.toLocaleString(
    "en-US",
    {
      month: "long"
    }
  );

  const currentYear = currentDate.getFullYear();

  const lastDayOfMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const periodText = `${currentMonth} ${currentYear}`;
  const closingDateText = `${currentMonth.slice(0, 3)} ${lastDayOfMonth}`;

  const pageDataLoaded =
    auditDataLoaded && auditDetailsLoaded;

  const auditReportClassName = [
    "audit-report",
    !auditDataLoaded ? "audit-data-pending" : "",
    !auditDetailsLoaded ? "audit-details-pending" : "",
    !itemGroupCountsLoaded ? "item-group-counts-pending" : "",
    !pageDataLoaded ? "audit-page-pending" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className={auditReportClassName}>
      <header className="audit-report-header">
        <div className="audit-report-title">
          <h1>Month End Audit Report</h1>

          <p>
            {pageDataLoaded
              ? `${allLinesCount} OF ${totalAuditLines} PACKAGES AUDITED`
              : ""}
          </p>
        </div>

        <div className="audit-report-controls">
          <div className="audit-report-period">
            <span className="audit-report-period-label">
              PERIOD
            </span>

            <span className="audit-report-period-value">
              {periodText} • closes {closingDateText}
            </span>
          </div>

          <button
            type="button"
            className="audit-header-icon-button"
            aria-label="Refresh"
          >
            ↻
          </button>

          <button
            type="button"
            className="audit-clear-data-button"
          >
            Clear Data
          </button>
        </div>
      </header>

      <AuditSummary
        auditCoverage={
          pageDataLoaded ? auditCoverage : null
        }
        allLinesCount={
          pageDataLoaded ? allLinesCount : null
        }
        totalAuditLines={
          pageDataLoaded ? totalAuditLines : null
        }
        countersActive={
          auditDataLoaded ? countersActive : null
        }
        linesFlagged={
          auditDataLoaded ? linesFlagged : null
        }
        linesMatched={
          auditDataLoaded ? linesMatched : null
        }
      />

      <div className="audit-visuals">
        <PackageCountByItem
          itemGroupCounts={itemGroupCounts}
        />

        <PackagesByCounter
          counterData={counterData}
        />
      </div>

      <CountDetail
        auditDetails={auditDetails}
        auditData={auditData}
      />
    </main>
  );
}

export default AuditReport;