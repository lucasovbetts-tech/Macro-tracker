// ============================================================
//  DATE HELPERS
// ============================================================
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun ... 6=Sat
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatWeekRange(start, end) {
  const startStr = `${MONTH_NAMES[start.getMonth()]} ${start.getDate()}`;
  const endStr = `${MONTH_NAMES[end.getMonth()]} ${end.getDate()}`;
  return `${startStr} – ${endStr}, ${end.getFullYear()}`;
}
