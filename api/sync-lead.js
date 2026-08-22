import { google } from "googleapis";

const HEADER = [
  "Lead ID",
  "Name",
  "Email",
  "Phone",
  "City",
  "Status",
  "Service interest",
  "Plan interest",
  "Course",
  "Algo add-on",
  "Course amount",
  "Google Meet link",
  "Note",
  "Submitted",
  "Last synced",
];

function rowFromLead(lead) {
  return [
    lead.id ?? "",
    lead.name ?? "",
    lead.email ?? "",
    // Leading "'" forces Sheets to treat this as plain text — otherwise a
    // phone number starting with "+" (e.g. "+91 88474 53944") gets parsed
    // as the start of a formula and shows #ERROR!.
    lead.phone ? `'${lead.phone}` : "",
    lead.city ?? "",
    lead.status ?? "",
    lead.service_interest ?? "",
    lead.plan_interest ?? "",
    lead.course_type ?? "",
    lead.algo_addon ? "Yes" : "",
    lead.course_amount ?? "",
    lead.google_meet_link ?? "",
    lead.note ?? "",
    lead.created_at ? new Date(lead.created_at).toLocaleString() : "",
    new Date().toLocaleString(),
  ];
}

async function getSheetsClient() {
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;
  const auth = new google.auth.JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

// Finds the 0-indexed row number of a Lead ID in column A, or -1.
// Also returns the tab's numeric sheetId, needed for row deletion.
async function findRow(sheets, spreadsheetId, tab, leadId) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheet = meta.data.sheets.find((s) => s.properties.title === tab);
  if (!sheet) throw new Error(`Tab "${tab}" not found in the sheet.`);
  const sheetId = sheet.properties.sheetId;

  const colA = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${tab}!A:A`,
  });
  const rows = colA.data.values || [];
  const rowIndex = rows.findIndex((r) => r[0] === String(leadId));
  return { rowIndex, sheetId };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, lead } = req.body || {};
  if (!lead?.id || !["upsert", "delete"].includes(action)) {
    return res.status(400).json({ error: "Missing action or lead.id." });
  }

  const {
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY,
    GOOGLE_SHEET_ID,
    GOOGLE_LEADS_SHEET_TAB,
    SYNC_DELETE_FROM_SHEET,
  } = process.env;

  if (
    !GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !GOOGLE_PRIVATE_KEY ||
    !GOOGLE_SHEET_ID
  ) {
    console.error("Missing Google Sheets env vars for /api/sync-lead");
    return res.status(500).json({ error: "Server is not configured yet." });
  }

  const tab = GOOGLE_LEADS_SHEET_TAB || "Leads";

  try {
    const sheets = await getSheetsClient();
    const { rowIndex, sheetId } = await findRow(
      sheets,
      GOOGLE_SHEET_ID,
      tab,
      lead.id,
    );

    if (action === "delete") {
      if (rowIndex === -1)
        return res
          .status(200)
          .json({ ok: true, note: "Row not found, nothing to do." });

      if (SYNC_DELETE_FROM_SHEET === "true") {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: GOOGLE_SHEET_ID,
          requestBody: {
            requests: [
              {
                deleteDimension: {
                  range: {
                    sheetId,
                    dimension: "ROWS",
                    startIndex: rowIndex,
                    endIndex: rowIndex + 1,
                  },
                },
              },
            ],
          },
        });
      } else {
        // Non-destructive default: mark it rather than remove it.
        await sheets.spreadsheets.values.update({
          spreadsheetId: GOOGLE_SHEET_ID,
          range: `${tab}!F${rowIndex + 1}:O${rowIndex + 1}`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                "Deleted from DB",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                new Date().toLocaleString(),
              ],
            ],
          },
        });
      }
      return res.status(200).json({ ok: true });
    }

    // action === "upsert"
    const values = [rowFromLead(lead)];

    if (rowIndex === -1) {
      // Not present yet — make sure the header exists, then append.
      const check = await sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${tab}!A1:A1`,
      });
      if (!check.data.values) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: GOOGLE_SHEET_ID,
          range: `${tab}!A1`,
          valueInputOption: "USER_ENTERED",
          requestBody: { values: [HEADER] },
        });
      }
      await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${tab}!A:O`,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values },
      });
    } else {
      await sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${tab}!A${rowIndex + 1}:O${rowIndex + 1}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Google Sheets lead sync failed:", err?.message || err);
    return res.status(502).json({ error: "Could not sync to Google Sheets." });
  }
}
