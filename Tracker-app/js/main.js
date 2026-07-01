// ============================================================
//  INIT
// ============================================================
import { state } from "./state.js";
import { loadState } from "./persistence.js";
import { render } from "./render.js";

// These modules only register event listeners — nothing else imports
// from them, so they must be imported here for their side effects to run.
import "./daySelector.js";
import "./macroLimits.js";
import "./macroAdder.js";
import "./foodLog.js";

loadState();

state.nextId = Object.values(state.days).reduce((max, day) => {
  return day.foodList.reduce((m, f) => Math.max(m, f.id), max);
}, 0) + 1;

render();
