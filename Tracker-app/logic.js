// ============================================================
//  STATE
// ============================================================
const state = {
  totals: { cals: 0, prots: 0, carbs: 0, fats: 0 },
  limits: { cals: 2000, prots: 150, carbs: 200, fats: 70 },
  foodList: [],
};

// ============================================================
//  DOM REFERENCES
// ============================================================
const dom = {
  // Macro adder popup
  macroPage:     document.querySelector(".macroPage"),
  closeMacroPage: document.getElementById("close-btn"),
  addMacrosBtn:  document.getElementById("add-btn"),

  // Inputs — macro adder
  calorieInput:  document.getElementById("calories"),
  protInput:     document.getElementById("protein"),
  carbInput:     document.getElementById("carbs"),
  fatInput:      document.getElementById("fats"),
  foodNameInput: document.getElementById("food-name-input"),

  // Calorie display
  calorieBar:    document.getElementById("fillBar"),
  calorieLabel:  document.getElementById("label"),
  maxCalDisplay: document.getElementById("maxCalDisplay"),

  // Macro displays
  totalProts:    document.getElementById("totalProts"),
  totalCarbs:    document.getElementById("totalCarbs"),
  totalFats:     document.getElementById("totalFats"),
  maxProtDisplay: document.getElementById("maxProtDisplay"),
  maxCarbDisplay: document.getElementById("maxCarbDisplay"),
  maxFatDisplay:  document.getElementById("maxFatDisplay"),

  // Rings
  protRing:      document.getElementById("protRing"),
  carbRing:      document.getElementById("carbRing"),
  fatRing:       document.getElementById("fatRing"),

  // Macro limits popup
  macroLimitPopUp: document.getElementById("macroLimitPopUp"),
  cancelBtn:       document.getElementById("cancelBtn"),

  // Limits inputs
  maxCalsInput:  document.getElementById("maxCals"),
  maxProtsInput: document.getElementById("maxProts"),
  maxCarbsInput: document.getElementById("maxCarbs"),
  maxFatsInput:  document.getElementById("maxFats"),

  // Food log
  foodContainer: document.getElementById("foodContainer"),
};

// ============================================================
//  RENDER
// ============================================================
function render() {
  const { totals, limits } = state;

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
}

function renderMacro(labelEl, ringEl, maxEl, current, max, name, unit) {
  const pct = max ? Math.min((current / max) * 100, 100) : 0;
  labelEl.textContent = `${name}: ${current}${unit}`;
  maxEl.textContent   = `${max}${unit}`;
  ringEl.style.setProperty("--p", pct);
}

function renderFoodLog() {
  dom.foodContainer.innerHTML = "";

  for (const food of state.foodList) {
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
            <button onclick="foodLogEdit()" class="ti ti-edit foodLogEdit"></button>
            <button onclick="foodLogDel(this, ${food.id})" class="ti ti-x foodLogDel"></button>
          </div>
        </div>
      </div>`;

      const delBtn = box.querySelector(".foodLogDel");
      
      delBtn.addEventListener("click", () => {
        foodLogDel(food.id);
      });

    dom.foodContainer.appendChild(box);
  }
}

// ============================================================
//  HELPERS
// ============================================================
function clearMacroInputs() {
  dom.calorieInput.value  = "";
  dom.protInput.value     = "";
  dom.carbInput.value     = "";
  dom.fatInput.value      = "";
  dom.foodNameInput.value = "";
}

function getInt(el) {
  return parseInt(el.value) || 0;
}

function getNum(el) {
  return Number(el.value) || 0;
}

// ============================================================
//  MACRO LIMITS POPUP
// ============================================================
function macroEditButton() {
  dom.macroLimitPopUp.style.display = "flex";
}

function saveMacroLimits() {

  const cals = getNum(dom.maxCalsInput);
  const prots = getNum(dom.maxProtsInput);
  const carbs = getNum(dom.maxCarbsInput);
  const fats = getNum(dom.maxFatsInput);

  if (!isNaN(cals) && cals > 0) state.limits.cals = cals;
  if (!isNaN(prots) && prots > 0) state.limits.prots = prots;
  if (!isNaN(carbs) && carbs > 0) state.limits.carbs = carbs;
  if (!isNaN(fats) && fats > 0) state.limits.fats = fats;

  dom.macroLimitPopUp.style.display = "none";
  render();
}

dom.cancelBtn.addEventListener("click", () => {
  dom.macroLimitPopUp.style.display = "none";
});

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
  // Update state
  state.totals.cals  += getInt(dom.calorieInput);
  state.totals.prots += getInt(dom.protInput);
  state.totals.carbs += getInt(dom.carbInput);
  state.totals.fats  += getInt(dom.fatInput);

  state.foodList.push({
    id: nextId++,
    name:  dom.foodNameInput.value || "Unknown",
    cals:  dom.calorieInput.value,
    prots: dom.protInput.value,
    carbs: dom.carbInput.value,
    fats:  dom.fatInput.value,
  });

  clearMacroInputs();
  dom.macroPage.style.display = "none";
  render();
});

// ============================================================
//  INIT
// ============================================================
render();


// ============================================================
//  food edit buttons
// ============================================================

let nextId = 1;

function foodLogDel(btn, id) {
  state.foodList = state.foodList.filter(f => f.id !== id);
  renderFoodLog();
}