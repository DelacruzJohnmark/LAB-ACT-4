import { products } from "./products.js";
import {
  searchProducts,
  filterProductsByCategory,
  calculateTotalInventoryValue,
  countLowStockProducts,
  countOutOfStockProducts
} from "./inventoryUtils.js";
import { displayProducts, displaySummary } from "./display.js";

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

function updateDisplay() {
  const searched = searchProducts(products, searchInput.value);
  const filtered = filterProductsByCategory(searched, categoryFilter.value);

  displayProducts(filtered);
  displaySummary(
    products,
    calculateTotalInventoryValue,
    countLowStockProducts,
    countOutOfStockProducts
  );
}

searchBtn.addEventListener("click", updateDisplay);

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    updateDisplay();
  }
});

categoryFilter.addEventListener("change", updateDisplay);

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "All";
  updateDisplay();
});

updateDisplay();
