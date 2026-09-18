// const API_BASE_URL = "https://ghdev.seedandbeyond.com:20100/b1s/v2/sml.svc/CV_GH_MONTHENDAUDIT_VW";
// const API_2_BASE_URL = "https://ghdev.seedandbeyond.com:20100/b1s/v2/sml.svc/CV_GH_BATCHQUERY_VW";

// const API_HEADERS = {
//   Authorization: "Basic eyJVc2VyTmFtZSI6IlNoaXZhcmFqIiwiQ29tcGFueURCIjoiREVWIn06U2hpdmFyYWpAR0g5Yg==",
//   "Content-Type": "application/json",
// };

// const AUDIT_DATA_QUERY =
//   "?$filter=U_MetrcLicense%20eq%20%27CCL21-0005102%27&$orderby=DateTime%20desc";

// const AUDIT_DETAILS_QUERY =
//   "?$filter=U_MetrcLicense%20eq%20%27CCL21-0005102%27%20and%20Quantity%20ne%200&$select=METRCUID,ItemCode,ItemName,BinLocationCode,U_MetrcLicense,HarvestName";

// async function fetchAuditData() {
//   const response = await fetch(`${API_BASE_URL}${AUDIT_DATA_QUERY}`, {
//     method: "GET",
//     headers: API_HEADERS,
//   });

//   if (!response.ok) {
//     throw new Error(`API request failed: ${response.status}`);
//   }

//   return response.json();
// }

// async function fetchAuditDetails() {
//   const response = await fetch(
//     `${API_2_BASE_URL}${AUDIT_DETAILS_QUERY}`,
//     {
//       method: "GET",
//       headers: API_HEADERS,
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`API 2 request failed: ${response.status}`);
//   }

//   return response.json();
// }

// async function fetchAuditDataPage(skip = 0, top = 50) {
//   const response = await fetch(
//     `${API_BASE_URL}${AUDIT_DATA_QUERY}&$skip=${skip}&$top=${top}`,
//     {
//       method: "GET",
//       headers: API_HEADERS,
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Audit data page request failed: ${response.status}`);
//   }

//   return response.json();
// }

// async function fetchAuditDetailsPage(skip = 0, top = 50) {
//   const response = await fetch(
//     `${API_2_BASE_URL}${AUDIT_DETAILS_QUERY}&$skip=${skip}&$top=${top}`,
//     {
//       method: "GET",
//       headers: API_HEADERS,
//     }
//   );

//   if (!response.ok) {
//     throw new Error(
//       `Audit details page request failed: ${response.status}`
//     );
//   }

//   return response.json();
// }

// export { fetchAuditData };
// export { fetchAuditDetails };
// export { fetchAuditDataPage };
// export { fetchAuditDetailsPage };

const API_BASE_URL = "https://ghdev.seedandbeyond.com:20100/b1s/v2/sml.svc/CV_GH_MONTHENDAUDIT_VW";
const API_2_BASE_URL = "https://ghdev.seedandbeyond.com:20100/b1s/v2/sml.svc/CV_GH_BATCHQUERY_VW";

const API_HEADERS = {
  Authorization: "Basic eyJVc2VyTmFtZSI6IlNoaXZhcmFqIiwiQ29tcGFueURCIjoiREVWIn06U2hpdmFyYWpAR0g5Yg==",
  "Content-Type": "application/json",
};

const AUDIT_DATA_QUERY =
  "?$filter=U_MetrcLicense%20eq%20%27CCL21-0005102%27&$orderby=DateTime%20desc";

const AUDIT_DETAILS_QUERY =
  "?$filter=U_MetrcLicense%20eq%20%27CCL21-0005102%27%20and%20Quantity%20ne%200&$select=METRCUID,ItemCode,ItemName,BinLocationCode,U_MetrcLicense,HarvestName";

const ITEM_GROUP_COUNTS_QUERY =
  "?$apply=filter(U_MetrcLicense%20eq%20%27CCL21-0005102%27)/groupby((ItmsGrpNam),aggregate($count%20as%20records))";

async function fetchAuditData() {
  const response = await fetch(`${API_BASE_URL}${AUDIT_DATA_QUERY}`, {
    method: "GET",
    headers: API_HEADERS,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

async function fetchAuditDetails() {
  const response = await fetch(
    `${API_2_BASE_URL}${AUDIT_DETAILS_QUERY}`,
    {
      method: "GET",
      headers: API_HEADERS,
    }
  );

  if (!response.ok) {
    throw new Error(`API 2 request failed: ${response.status}`);
  }

  return response.json();
}

async function fetchItemGroupCounts() {
  const response = await fetch(
    `${API_BASE_URL}${ITEM_GROUP_COUNTS_QUERY}`,
    {
      method: "GET",
      headers: API_HEADERS,
    }
  );

  if (!response.ok) {
    throw new Error(
      `Item group count request failed: ${response.status}`
    );
  }

  return response.json();
}

async function fetchAuditDataPage(skip = 0, top = 50) {
  const response = await fetch(
    `${API_BASE_URL}${AUDIT_DATA_QUERY}&$skip=${skip}&$top=${top}`,
    {
      method: "GET",
      headers: API_HEADERS,
    }
  );

  if (!response.ok) {
    throw new Error(`Audit data page request failed: ${response.status}`);
  }

  return response.json();
}

async function fetchAuditDetailsPage(skip = 0, top = 50) {
  const response = await fetch(
    `${API_2_BASE_URL}${AUDIT_DETAILS_QUERY}&$skip=${skip}&$top=${top}`,
    {
      method: "GET",
      headers: API_HEADERS,
    }
  );

  if (!response.ok) {
    throw new Error(
      `Audit details page request failed: ${response.status}`
    );
  }

  return response.json();
}

export { fetchAuditData };
export { fetchAuditDetails };
export { fetchItemGroupCounts };
export { fetchAuditDataPage };
export { fetchAuditDetailsPage };