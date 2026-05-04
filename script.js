let products = [];
let cart = [];

function addProduct() {
  const name = document.getElementById("name").value;
  const desc = document.getElementById("desc").value;
  const price = Number(document.getElementById("price").value);
  const imageInput = document.getElementById("image");
  const file = imageInput.files[0];

  if (!name || !desc || !price || !file) {
    alert("Заполни все поля");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const product = {
      id: Date.now(),
      name,
      desc,
      price,
      image: e.target.result
    };

    products.push(product);
    renderProducts();

    document.getElementById("name").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("price").value = "";
    imageInput.value = "";
  };

  reader.readAsDataURL(file);
}

function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <p>${p.price}₽</p>
        <button onclick="addToCart(${p.id})">Купить</button>
        <button class="delete-btn" onclick="deleteProduct(${p.id})">Удалить</button>
      </div>
    `;
  });
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  renderProducts();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    list.innerHTML += `<li>${item.name} - ${item.price}₽</li>`;
  });

  document.getElementById("total").innerText = total;
}

function checkout() {
  if (cart.length === 0) {
    alert("Корзина пуста!");
    return;
  }

  alert("Покупка оформлена!");
  cart = [];
  renderCart();
}
