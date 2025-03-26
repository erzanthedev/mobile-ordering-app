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
              <span class="remove" data-remove=${order.id}>remove</span>
              <span class="item-price push-right">$${order.price}</span>
            </div>

`;
    })
    .join("");
};

const renderCheckout = () => {
  document.getElementById("checkout").classList.remove("hidden");
  document.getElementById("items-list").innerHTML = getCheckoutHtml();
};

const getTotalPrice = () => {
  const totalAmount = ordersArr.reduce((total, currentObj) => {
    return total + currentObj.price;
  }, 0);

  document.getElementById("total-price").innerHTML = `$${totalAmount}`;
};

const render = () => {
  document.getElementById("menu").innerHTML += getMealsHtml();
};

// Event Handlers
const handleAddItemClick = (itemId) => {
  const targetMeal = menuArray.find(({ id }) => id === Number(itemId));

  const existingOrder = ordersArr.find(({ id }) => id === targetMeal.id);

  if (!existingOrder) {
    ordersArr.push({ ...targetMeal });
  } else {
    existingOrder.price *= 2;
  }

  getTotalPrice();
  renderCheckout();
};

const handleRemoveClick = (itemId) => {
  const targetMealIndex = ordersArr.findIndex(
    ({ id }) => id === Number(itemId),
  );

  if (targetMealIndex > -1) {
    ordersArr.splice(targetMealIndex, 1);
  }

  getTotalPrice();
  renderCheckout();
};

// Event Listeners
document.addEventListener("click", (e) => {
  if (e.target.dataset.addItem) {
    handleAddItemClick(e.target.dataset.addItem);
  } else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  }
});

render();
