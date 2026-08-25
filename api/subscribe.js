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

// Google's own guidance for handling 429 (rate limit) and 5xx responses:
// don't fail immediately, retry a few times with a growing delay. The
// Sheets API's per-service-account write limit is 60/minute — a fixed
// service account (like this one) can hit that during a burst of popup
// signups even though the site overall has plenty of headroom. Most
// individual retries here resolve within a second or two, invisibly to
// the visitor; only a request that's still failing after all attempts
// falls through to the error response below.
const MAX_ATTEMPTS = 4;
const BASE_DELAY_MS = 500; // 500ms, 1s, 2s between attempts

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryable(err) {
  const status = err?.code || err?.response?.status;
  // 429 = rate limited, 500/503 = transient Google-side error. Anything
  // else (bad auth, permission denied, malformed request) won't be fixed
  // by retrying, so fail fast on those instead of stalling the request.
  return status === 429 || status === 500 || status === 503;
}

async function appendWithRetry(sheets, params) {
  let lastErr;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      return await sheets.spreadsheets.values.append(params);
    } catch (err) {
      lastErr = err;
      if (!isRetryable(err) || attempt === MAX_ATTEMPTS - 1) throw err;
      const delay = BASE_DELAY_MS * 2 ** attempt;
      await sleep(delay);
    }
  }
  throw lastErr;
}

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

    await appendWithRetry(sheets, {
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
    const status = err?.code || err?.response?.status;
    const message =
      status === 429
        ? "We're saving a lot of signups right now — please try again in a few seconds."
        : "Could not save your email right now. Please try again.";
    return res.status(502).json({ error: message });
  }
}
