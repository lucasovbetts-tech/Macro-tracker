// ============================================================
//  PERSISTENCE
// ============================================================
import { state } from "./state.js";

const STORAGE_KEY = "macroTrackerData";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.days) state.days = saved.days;
    if (saved.limits) state.limits = saved.limits;
  } catch (e) {
    console.error("Failed to load saved data", e);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ days: state.days, limits: state.limits }));
}

export { loadState, saveState };
