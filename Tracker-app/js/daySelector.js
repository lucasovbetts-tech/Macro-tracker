// ============================================================
//  DAY SELECTOR / WEEK NAV
// ============================================================
import { dom } from "./dom.js";
import { state, todayISO, peekDay } from "./state.js";
import { addDays, toISODate, formatWeekRange } from "./dateHelpers.js";
import { render } from "./render.js";

function renderDaySelector() {
  dom.dayItems.forEach((dayEl, i) => {
    const date = addDays(state.weekStart, i);
    const dateISO = toISODate(date);

    dayEl.querySelector(".dayDate").textContent = date.getDate();
    dayEl.classList.toggle("isToday", dateISO === todayISO);

    const radio = dayEl.querySelector("input[type=radio]");
    radio.checked = i === state.currentDayIndex;

    const dayCals = peekDay(dateISO).totals.cals;
    const pct = state.limits.cals ? Math.min((dayCals / state.limits.cals) * 100, 100) : 0;
    radio.style.setProperty("--p", pct);
  });

  const weekEnd = addDays(state.weekStart, 6);
  dom.weekLabel.textContent = formatWeekRange(state.weekStart, weekEnd);
}

function changeWeek(deltaDays) {
  state.weekStart = addDays(state.weekStart, deltaDays);
  render();
}

dom.dayRadios.forEach((radio, i) => {
  radio.addEventListener("change", () => {
    state.currentDayIndex = i;
    render();
  });
});

dom.prevWeekBtn.addEventListener("click", () => changeWeek(-7));
dom.nextWeekBtn.addEventListener("click", () => changeWeek(7));

export { renderDaySelector };
