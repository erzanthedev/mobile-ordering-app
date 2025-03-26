import menuArray from "./data.js";

let ordersArr = [];

// Utility Functions
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
          <button class="add-meal-btn push-right" data-add-item=${meal.id}>
            +
          </button>
        </div>
      </div>
`;
    })
    .join("");
};

const getCheckoutHtml = () => {
  return ordersArr
    .map((order) => {
      return `
            <div class="item">
              <p class="item-name">${order.name}</p>
              <span class="remove">remove</span>
              <span class="item-price push-right">$${order.price}</span>
            </div>

`;
    })
    .join("");
};

const showCheckout = () => {
  document.getElementById("checkout").classList.remove("hidden");
  document.getElementById("items-list").innerHTML = getCheckoutHtml();
};

const render = () => {
  document.getElementById("menu").innerHTML += getMealsHtml();
};

// Event Handlers
const handleAddItemClick = (itemId) => {
  const targetMealObj = menuArray.find(({ id }) => id === Number(itemId));

  const existingOrder = ordersArr.find(({ id }) => id === targetMealObj.id);

  if (existingOrder) {
    existingOrder.price *= 2;
  } else {
    ordersArr.push({ ...targetMealObj });
  }

  showCheckout();
};

// Event Listeners
document.addEventListener("click", (e) => {
  if (e.target.dataset.addItem) {
    handleAddItemClick(e.target.dataset.addItem);
  }
});

render();
