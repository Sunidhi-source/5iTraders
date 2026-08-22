// POST /api/subscribe
// Appends { email, source, submittedAt } as a new row in the configured
// Google Sheet. Nothing here touches Supabase — this endpoint exists
// specifically for the "join the community" popup, separate from the
// admin dashboard / leads table.
//
// Required environment variables (set in Vercel Project Settings, not in
// a committed .env file):
//   GOOGLE_SERVICE_ACCOUNT_EMAIL  - the xxxx@xxxx.iam.gserviceaccount.com
//                                   from the service account's JSON key
//   GOOGLE_PRIVATE_KEY            - the private_key value from that same
//                                   JSON key (keep the \n sequences as-is;
//                                   Vercel stores them fine as a single
//                                   env var string)
//   GOOGLE_SHEET_ID               - the long ID in the sheet's URL, e.g.
//                                   docs.google.com/spreadsheets/d/<THIS>/edit
//   GOOGLE_SHEET_TAB              - optional, defaults to "Subscribers".
//                                   Must be the exact tab name in the sheet.
//
// The sheet must be shared with GOOGLE_SERVICE_ACCOUNT_EMAIL as an Editor,
// or every request here will fail with a permission error.

import { google } from "googleapis";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, source } = req.body || {};

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: "Enter a valid email address." });
  }

  const {
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY,
    GOOGLE_SHEET_ID,
    GOOGLE_SHEET_TAB,
  } = process.env;

  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
    console.error("Missing Google Sheets env vars for /api/subscribe");
    return res.status(500).json({ error: "Server is not configured yet." });
  }

  try {
    const auth = new google.auth.JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      // Env vars can't hold real newlines, so the key is stored with
      // literal "\n" sequences and un-escaped here.
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const tab = GOOGLE_SHEET_TAB || "Subscribers";

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${tab}!A:C`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[email.trim(), source || "popup", new Date().toISOString()]],
      },
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Google Sheets append failed:", err?.message || err);
    return res.status(502).json({ error: "Could not save your email right now. Please try again." });
  }
}
