// ============================================================
//  HELPERS
// ============================================================
import { dom } from "./dom.js";

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

export { clearMacroInputs, getInt, getNum };
