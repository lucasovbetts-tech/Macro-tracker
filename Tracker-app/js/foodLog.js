// ============================================================
//  FOOD LOG — DELETE
// ============================================================
function foodLogDel(id) {
  const day = currentDay();
  const food = day.foodList.find(f => f.id === id);

  if (food) {
    day.totals.cals  -= Number(food.cals)  || 0;
    day.totals.prots -= Number(food.prots) || 0;
    day.totals.carbs -= Number(food.carbs) || 0;
    day.totals.fats  -= Number(food.fats)  || 0;
  }

  day.foodList = day.foodList.filter(f => f.id !== id);
  saveState();
  render();
}

// ============================================================
//  FOOD LOG — EDIT POPUP
// ============================================================
let editingFoodId = null;

function openFoodEditPopup(id) {
  const food = currentDay().foodList.find(f => f.id === id);
  if (!food) return;

  editingFoodId = id;
  dom.editFoodNameInput.value = food.name;
  dom.editCalorieInput.value  = food.cals;
  dom.editProtInput.value     = food.prots;
  dom.editCarbInput.value     = food.carbs;
  dom.editFatInput.value      = food.fats;

  dom.foodEditPage.style.display = "flex";
}

function closeFoodEditPopup() {
  dom.foodEditPage.style.display = "none";
  editingFoodId = null;
}

dom.closeFoodEditPage.addEventListener("click", closeFoodEditPopup);

dom.saveEditBtn.addEventListener("click", () => {
  const day = currentDay();
  const food = day.foodList.find(f => f.id === editingFoodId);
  if (!food) return;

  // Remove the food's current contribution from the day's totals.
  day.totals.cals  -= Number(food.cals)  || 0;
  day.totals.prots -= Number(food.prots) || 0;
  day.totals.carbs -= Number(food.carbs) || 0;
  day.totals.fats  -= Number(food.fats)  || 0;

  const cals  = getInt(dom.editCalorieInput);
  const prots = getInt(dom.editProtInput);
  const carbs = getInt(dom.editCarbInput);
  const fats  = getInt(dom.editFatInput);

  food.name  = dom.editFoodNameInput.value.trim() || "Unknown";
  food.cals  = cals;
  food.prots = prots;
  food.carbs = carbs;
  food.fats  = fats;

  day.totals.cals  += cals;
  day.totals.prots += prots;
  day.totals.carbs += carbs;
  day.totals.fats  += fats;

  closeFoodEditPopup();
  saveState();
  render();
});
