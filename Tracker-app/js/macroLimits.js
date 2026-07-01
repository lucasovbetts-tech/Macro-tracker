// ============================================================
//  MACRO LIMITS POPUP
// ============================================================
import { dom } from "./dom.js";
import { state } from "./state.js";
import { getNum } from "./helpers.js";
import { saveState } from "./persistence.js";
import { render } from "./render.js";

function macroEditButton() {
  dom.macroLimitPopUp.style.display = "flex";
}

function saveMacroLimits() {
  const cals  = getNum(dom.maxCalsInput);
  const prots = getNum(dom.maxProtsInput);
  const carbs = getNum(dom.maxCarbsInput);
  const fats  = getNum(dom.maxFatsInput);

  if (cals > 0) state.limits.cals = cals;
  if (prots > 0) state.limits.prots = prots;
  if (carbs > 0) state.limits.carbs = carbs;
  if (fats > 0) state.limits.fats = fats;

  dom.macroLimitPopUp.style.display = "none";
  saveState();
  render();
}

dom.macroEditBtn.addEventListener("click", macroEditButton);
dom.saveLimitsBtn.addEventListener("click", saveMacroLimits);

dom.cancelBtn.addEventListener("click", () => {
  dom.macroLimitPopUp.style.display = "none";
});
