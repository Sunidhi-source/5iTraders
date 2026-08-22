// Fire-and-forget helper for /api/sync-lead. Sync to the Sheet is a
// nice-to-have mirror, not the source of truth — a failed sync should
// never block a dashboard action or surface as a user-facing error, so
// this only logs on failure.
export function syncLeadToSheet(action, lead) {
  fetch("/api/sync-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, lead }),
  }).catch((err) => {
    console.error("[5i Traders] Sheet sync failed:", err?.message || err);
  });
}
