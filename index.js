import menuArray from "./data.js";

console.log(menuArray);

const getMealsHtml = () => {
  return menuArray
    .map((meal) => {
      return `
      <div class="meal">
        <div class="meal-content">
          <span class="meal-emoji">${meal.emoji}</span>
          <div class="meal-info">
            <h2 class="meal-title">${meal.name}</h2>
            <p class="meal-ingredients">pepperoni,mushrom,mozarella</p>
            <span class="meal-price">$${meal.price}</span>
          </div>
          <button class="add-meal-btn push-right">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
`;
    })
    .join("");
};

const render = () => {
  document.getElementById("menu").innerHTML = getMealsHtml();
};

render();
