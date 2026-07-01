// ============================================================
//  DOM REFERENCES
// ============================================================
const dom = {
  // Macro adder popup
  macroPage:      document.getElementById("macroPage"),
  closeMacroPage: document.getElementById("close-btn"),
  addMacrosBtn:   document.getElementById("add-btn"),

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

  // Day selector / week nav
  weekLabel:   document.getElementById("weekLabel"),
  prevWeekBtn: document.getElementById("prevWeekBtn"),
  nextWeekBtn: document.getElementById("nextWeekBtn"),
  dayItems:    document.querySelectorAll("#dayContainer .day"),
  dayRadios:   document.querySelectorAll("#dayContainer input[type=radio]"),

  // Food edit popup
  foodEditPage:      document.getElementById("foodEditPage"),
  closeFoodEditPage: document.getElementById("close-edit-btn"),
  saveEditBtn:       document.getElementById("save-edit-btn"),
  editFoodNameInput: document.getElementById("edit-food-name-input"),
  editCalorieInput:  document.getElementById("edit-calories"),
  editProtInput:     document.getElementById("edit-protein"),
  editCarbInput:     document.getElementById("edit-carbs"),
  editFatInput:      document.getElementById("edit-fats"),
};
