// ============================================================
//  INIT
// ============================================================
loadState();

nextId = Object.values(state.days).reduce((max, day) => {
  return day.foodList.reduce((m, f) => Math.max(m, f.id), max);
}, 0) + 1;

render();
