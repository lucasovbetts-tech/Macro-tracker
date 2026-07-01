// ============================================================
//  STATE
// ============================================================
import { toISODate, addDays, getMonday } from "./dateHelpers.js";

const today = new Date();
today.setHours(0, 0, 0, 0);
const todayISO = toISODate(today);

const state = {
  days: {}, // 'YYYY-MM-DD' -> { totals, foodList }
  limits: { cals: 2000, prots: 150, carbs: 200, fats: 70 },
  weekStart: getMonday(today),
  currentDayIndex: (today.getDay() + 6) % 7, // Mon=0 ... Sun=6
  nextId: 1,
};

function currentDateISO() {
  return toISODate(addDays(state.weekStart, state.currentDayIndex));
}

function getDayData(dateISO) {
  if (!state.days[dateISO]) {
    state.days[dateISO] = {
      totals: { cals: 0, prots: 0, carbs: 0, fats: 0 },
      foodList: [],
    };
  }
  return state.days[dateISO];
}

function currentDay() {
  return getDayData(currentDateISO());
}

// Read-only lookup that doesn't create an entry for days with no data yet.
function peekDay(dateISO) {
  return state.days[dateISO] || { totals: { cals: 0, prots: 0, carbs: 0, fats: 0 }, foodList: [] };
}

export { state, todayISO, currentDay, peekDay };
