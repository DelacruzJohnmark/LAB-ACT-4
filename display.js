import { getStockStatus } from "./inventoryUtils.js";

export function displayProducts(products) {
  const productList = document.getElementById("productList");
  const noResultsMessage = document.getElementById("noResultsMessage");
  const resultCount = document.getElementById("resultCount");

  productList.innerHTML = "";

  if (products.length === 0) {
    noResultsMessage.hidden = false;
    resultCount.textContent = "0 products";
    return;
  }

  noResultsMessage.hidden = true;
  resultCount.textContent = `${products.length} product${products.length === 1 ? "" : "s"}`;

  products.forEach(({ id, name, category, price, stock }) => {
    const status = getStockStatus(stock);
    const statusClass = status.toLowerCase().replaceAll(" ", "-");

    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <h3>${name}</h3>
      <span class="category">${category}</span>
      <dl class="product-details">
        <div>
          <dt>ID</dt>
          <dd>${id}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>₱${price.toLocaleString()}</dd>
        </div>
        <div>
          <dt>Stock</dt>
          <dd>${stock}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>${status}</dd>
        </div>
      </dl>
      <div class="status ${statusClass}">● ${status}</div>
    `;

    productList.appendChild(card);
  });
}

export function displaySummary(products, calculateTotalInventoryValue, countLowStockProducts, countOutOfStockProducts) {
  const total = calculateTotalInventoryValue(products);
  const lowStock = countLowStockProducts(products);
  const outOfStock = countOutOfStockProducts(products);

  document.getElementById("totalInventoryValue").textContent =
    `₱${total.toLocaleString()}`;
  document.getElementById("lowStockCount").textContent = lowStock;
  document.getElementById("outOfStockCount").textContent = outOfStock;
}
