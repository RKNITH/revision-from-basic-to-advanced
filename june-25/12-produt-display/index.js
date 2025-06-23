const products = [
    { id: 1, name: "Laptop", price: 60000, rating: 4.5, image: "https://picsum.photos/200/150?random=1" },
    { id: 2, name: "Headphones", price: 2000, rating: 4.2, image: "https://picsum.photos/200/150?random=2" },
    { id: 3, name: "Camera", price: 30000, rating: 4.8, image: "https://picsum.photos/200/150?random=3" },
    { id: 4, name: "Smartphone", price: 25000, rating: 4.6, image: "https://picsum.photos/200/150?random=4" },
    { id: 5, name: "Watch", price: 4000, rating: 4.1, image: "https://picsum.photos/200/150?random=5" }
];



let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sort");
const cartItems = document.getElementById("cart-items");
const totalAmount = document.getElementById("total-amount");

function renderProducts(arr) {
    productList.innerHTML = "";
    arr.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>Price: ₹${p.price}</p>
      <p>Rating: ${p.rating} ⭐</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
        productList.appendChild(card);
    });
}

function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const li = document.createElement("li");
        li.innerHTML = `
      <span>${item.name}</span>
      <div class="cart-item-controls">
        <button onclick="changeQty(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <span>₹${item.price * item.quantity}</span>
    `;
        cartItems.appendChild(li);
    });

    totalAmount.textContent = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQty(id, delta) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }
    updateCart();
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
});

sortSelect.addEventListener("change", () => {
    let sorted = [...products];
    switch (sortSelect.value) {
        case "priceLow": sorted.sort((a, b) => a.price - b.price); break;
        case "priceHigh": sorted.sort((a, b) => b.price - a.price); break;
        case "ratingHigh": sorted.sort((a, b) => b.rating - a.rating); break;
    }
    renderProducts(sorted);
});

renderProducts(products);
updateCart();