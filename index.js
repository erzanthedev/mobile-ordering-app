import menuArray from "./data.js";

const paymentForm = document.getElementById("payment-form");

let ordersArr = [];

// Utility Functions
const getMealsHtml = () => {
  return menuArray
    .map((meal) => {
      const { emoji, name, ingredients, price, id } = meal;
      return `
      <div class="meal">
        <div class="meal-content">
          <span class="meal-emoji">${emoji}</span>
          <div class="meal-info">
            <h2 class="meal-title">${name}</h2>
            <p class="meal-ingredients">${ingredients}</p>
            <span class="meal-price">$${price}</span>
          </div>
          <button class="add-meal-btn push-right" data-add-item=${id}>
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
      const { name, id, price } = order;
      return `
            <div class="item">
              <p class="item-name">${name}</p>
              <span class="remove" data-remove=${id}>remove</span>
              <span class="item-price push-right">$${price}</span>
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

const handleCompleteOrderClick = () => {
  document.getElementById("payment-form").classList.remove("hidden");
};

const handlePayClick = (e) => {
  e.preventDefault();

  const paymentFormData = new FormData(paymentForm);
  const name = paymentFormData.get("fullName");

  const orderSuccess = document.getElementById("order-success");
  orderSuccess.innerHTML = `
    <p class="order-success-message">Thanks, ${name}! Your order is on its way!</p>
    `;
  orderSuccess.classList.remove("hidden");

  document.getElementById("payment-form").classList.add("hidden");
  document.getElementById("checkout").classList.add("hidden");

  paymentForm.reset();
};

// Event Listeners
document.addEventListener("click", (e) => {
  if (e.target.dataset.addItem) {
    handleAddItemClick(e.target.dataset.addItem);
  } else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  } else if (e.target.id === "complete-order-btn") {
    handleCompleteOrderClick();
  }
});

paymentForm.addEventListener("submit", (e) => {
  handlePayClick(e);
});

render();
