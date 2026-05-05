let products = [];
let cart = [];

const productsEl = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

// 🌍 ЯЗЫКИ
const langs = {
  ru: { title: "Магазин" },
  en: { title: "Shop" },
  zh: { title: "商店" }
};

function setLang(l) {
  document.getElementById("title").innerText = langs[l].title;
}

// 👤 РЕГИСТРАЦИЯ
function register() {
  const u = username.value;
  const p = password.value;
  localStorage.setItem("user", JSON.stringify({ u, p }));
  alert("Зарегистрирован");
}

function login() {
  const u = username.value;
  const p = password.value;
  const data = JSON.parse(localStorage.getItem("user"));
  if (data && data.u === u && data.p === p) {
    alert("Вход успешен");
  } else {
    alert("Ошибка");
  }
}

// 📦 ТОВАРЫ
function addProduct() {
  const name = document.getElementById("name").value;
  const desc = document.getElementById("desc").value;
  const price = Number(document.getElementById("price").value);
  const file = document.getElementById("image").files[0];

  if (!name || !desc || !price || !file) {
    alert("Заполни всё");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    products.push({
      id: Date.now(),
      name,
      desc,
      price,
      image: e.target.result
    });
    renderProducts();
  };
  reader.readAsDataURL(file);
}

function renderProducts() {
  productsEl.innerHTML = "";
  products.forEach(p => {
    productsEl.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <p>${p.price}</p>
        <button onclick="addToCart(${p.id})">+</button>
      </div>
    `;
  });
}

// 🛒 КОРЗИНА
function addToCart(id) {
  cart.push(products.find(p => p.id === id));
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  let sum = 0;
  cart.forEach(i => {
    sum += i.price;
    cartItems.innerHTML += `<li>${i.name}</li>`;
  });
  total.innerText = sum;
}

// 💳 ОПЛАТА
function checkout() {
  alert("Для реальной оплаты нужен сервер (Stripe/PayPal)");
}
