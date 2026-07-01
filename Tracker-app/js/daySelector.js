// ============================================================
//  DAY SELECTOR / WEEK NAV
// ============================================================
function renderDaySelector() {
  dom.dayItems.forEach((dayEl, i) => {
    const date = addDays(weekStart, i);
    const dateISO = toISODate(date);

    dayEl.querySelector(".dayDate").textContent = date.getDate();
    dayEl.classList.toggle("isToday", dateISO === todayISO);

    const radio = dayEl.querySelector("input[type=radio]");
    radio.checked = i === currentDayIndex;

    const dayCals = peekDay(dateISO).totals.cals;
    const pct = state.limits.cals ? Math.min((dayCals / state.limits.cals) * 100, 100) : 0;
    radio.style.setProperty("--p", pct);
  });

  const weekEnd = addDays(weekStart, 6);
  dom.weekLabel.textContent = formatWeekRange(weekStart, weekEnd);
}

function changeWeek(deltaDays) {
  weekStart = addDays(weekStart, deltaDays);
  render();
}

dom.dayRadios.forEach((radio, i) => {
  radio.addEventListener("change", () => {
    currentDayIndex = i;
    render();
  });
});

dom.prevWeekBtn.addEventListener("click", () => changeWeek(-7));
dom.nextWeekBtn.addEventListener("click", () => changeWeek(7));
