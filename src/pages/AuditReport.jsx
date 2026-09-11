import { useEffect, useState } from "react";
import { fetchAuditData,fetchAuditDetails} from "../services/auditApi";
import AuditSummary from "../Components/AuditSummary/AuditSummary";
import CountDetail from "../Components/CountDetail/CountDetail";
import PackagesByCounter from "../Components/PackagesByCounter/PackagesByCounter";
import PackageCountByItem from "../Components/PackageCountByItem/PackageCountByItem";
import "./AuditReport.css";

function AuditReport() {
  const [auditData, setAuditData] = useState([]);
  const [auditDetails, setAuditDetails] = useState([]);

  useEffect(() => {
    async function loadAuditData() {
      try {
        const data = await fetchAuditData();

        console.log("API 1 full response:", data);
        console.log("API 1 records:", data.value);

        setAuditData(data.value || []);
      } catch (error) {
        console.error("API 1 error:", error);
      }
    }

    async function loadAuditDetails() {
  try {
    const data = await fetchAuditDetails();

    console.log("API 2 full response:", data);
    console.log("API 2 records:", data.value);

    setAuditDetails(data.value || []);
  } catch (error) {
    console.error("API 2 error:", error);
  }
}

   async function loadData() {
  await loadAuditData();
  await loadAuditDetails();
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

  console.log("Counters active:", countersActive);
  console.log("Lines flagged:", linesFlagged);
  console.log("Total count entries:", totalCountEntries);
  console.log("Lines matched exactly:", linesMatched);

  return (
    <main>
      <h1>Month End Audit Report</h1>

       <AuditSummary countersActive={countersActive} 
         linesFlagged={linesFlagged}
  linesMatched={linesMatched}/>

      <p>Total API records: {auditData.length}</p>

      <p>Unique packages: {uniquePackages}</p>

  <div className="audit-visuals">
  <PackageCountByItem auditDetails={auditDetails} />

  <PackagesByCounter counterData={counterData} />
</div>
      <CountDetail auditDetails={auditDetails} />
    </main>
  );
}

export default AuditReport;