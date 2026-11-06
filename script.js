const products = [
  { id: 1, name: "Sol Pendant", detail: "Gold-filled · 18 in", price: 68, art: "art-amber" },
  { id: 2, name: "Tide Hoops", detail: "Sterling silver", price: 54, art: "art-blue" },
  { id: 3, name: "Petal Ring", detail: "Gold vermeil · Sizes 5–9", price: 72, art: "art-pink" },
];

const cart = [];
const productGrid = document.querySelector("#productGrid");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");

function renderProducts() {
  productGrid.innerHTML = products.map((product) => `
    <article class="product-card">
      <div class="product-art ${product.art}" aria-label="Illustration of ${product.name}">
        <div class="product-shape"></div>
      </div>
      <div class="product-info">
        <div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-detail">${product.detail}</p>
        </div>
        <span class="product-price">$${product.price}</span>
      </div>
      <button class="add-button" type="button" data-product-id="${product.id}">Add to bag</button>
    </article>
  `).join("");
}

function renderCart() {
  cartCount.textContent = cart.length;
  cartTotal.textContent = `$${cart.reduce((total, product) => total + product.price, 0).toFixed(2)}`;

  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your bag is waiting for something lovely.</p>';
    return;
  }

  cartItems.innerHTML = cart.map((product, index) => `
    <div class="cart-item">
      <span class="cart-item-name">${product.name}</span>
      <span>$${product.price}</span>
      <button class="remove-button" type="button" data-cart-index="${index}">Remove</button>
    </div>
  `).join("");
}

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product-id]");
  if (!button) return;
  const product = products.find((item) => item.id === Number(button.dataset.productId));
  cart.push(product);
  renderCart();
  document.body.classList.add("cart-open");
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cart-index]");
  if (!button) return;
  cart.splice(Number(button.dataset.cartIndex), 1);
  renderCart();
});

document.querySelector("#cartButton").addEventListener("click", () => document.body.classList.add("cart-open"));
document.querySelector("#closeCart").addEventListener("click", () => document.body.classList.remove("cart-open"));
document.querySelector("#overlay").addEventListener("click", () => document.body.classList.remove("cart-open"));
document.querySelector("#checkoutButton").addEventListener("click", () => alert("Checkout will be connected in the next step."));

renderProducts();
renderCart();
