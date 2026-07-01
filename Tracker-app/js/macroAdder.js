// ============================================================
//  MACRO ADDER POPUP
// ============================================================
function showMacros() {
  dom.macroPage.style.display = "flex";
}

dom.closeMacroPage.addEventListener("click", () => {
  dom.macroPage.style.display = "none";
  clearMacroInputs();
});

dom.addMacrosBtn.addEventListener("click", () => {
  const cals  = getInt(dom.calorieInput);
  const prots = getInt(dom.protInput);
  const carbs = getInt(dom.carbInput);
  const fats  = getInt(dom.fatInput);

  const day = currentDay();
  day.totals.cals  += cals;
  day.totals.prots += prots;
  day.totals.carbs += carbs;
  day.totals.fats  += fats;

  day.foodList.push({
    id: nextId++,
    name: dom.foodNameInput.value.trim() || "Unknown",
    cals, prots, carbs, fats,
  });

  clearMacroInputs();
  dom.macroPage.style.display = "none";
  saveState();
  render();
});
