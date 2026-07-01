// ============================================================
//  RENDER
// ============================================================
function render() {
  const { totals } = currentDay();
  const { limits } = state;

  // Calorie bar + label
  const calPct = limits.cals ? Math.min((totals.cals / limits.cals) * 100, 100) : 0;
  dom.calorieBar.style.width    = calPct + "%";
  dom.calorieLabel.textContent  = `Calories: ${totals.cals} /`;
  dom.maxCalDisplay.textContent = `${limits.cals}kcal`;

  // Macro labels + rings
  renderMacro(dom.totalProts, dom.protRing, dom.maxProtDisplay, totals.prots, limits.prots, "Protein", "g");
  renderMacro(dom.totalCarbs, dom.carbRing, dom.maxCarbDisplay, totals.carbs, limits.carbs, "Carbs",   "g");
  renderMacro(dom.totalFats,  dom.fatRing,  dom.maxFatDisplay,  totals.fats,  limits.fats,  "Fat",     "g");

  // Food log
  renderFoodLog();

  // Day selector rings reflect each day's calorie progress
  renderDaySelector();
}

function renderMacro(labelEl, ringEl, maxEl, current, max, name, unit) {
  const pct = max ? Math.min((current / max) * 100, 100) : 0;
  labelEl.textContent = `${name}: ${current}${unit}`;
  maxEl.textContent   = `${max}${unit}`;
  ringEl.style.setProperty("--p", pct);
}

function renderFoodLog() {
  dom.foodContainer.innerHTML = "";

  for (const food of currentDay().foodList) {
    const box = document.createElement("div");
    box.className = "foodBox";

    box.innerHTML = `
      <div class="foodCard">
        <h3 class="ti ti-apple foodSymbol">${food.name}</h3>
        <div class="macros">
          <p class="ti ti-flame   calsSymbol">${food.cals}kcal</p>
          <p class="ti ti-meat   protsSymbol">${food.prots}g</p>
          <p class="ti ti-wheat  carbsSymbol">${food.carbs}g</p>
          <p class="ti ti-droplet  fatSymbol">${food.fats}g</p>
          <div class="foodLogEditBtns">
            <button class="ti ti-edit foodLogEdit"></button>
            <button class="ti ti-x foodLogDel"></button>
          </div>
        </div>
      </div>`;

    box.querySelector(".foodLogEdit").addEventListener("click", () => {
      openFoodEditPopup(food.id);
    });

    box.querySelector(".foodLogDel").addEventListener("click", () => {
      foodLogDel(food.id);
    });

    dom.foodContainer.appendChild(box);
  }
}
