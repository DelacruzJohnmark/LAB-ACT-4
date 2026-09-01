export function searchProducts(products, query) {
  const searchTerm = query.trim().toLowerCase();

  if (!searchTerm) {
    return products;
  }

  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );
}

export function filterProductsByCategory(products, category) {
  if (category === "All") {
    return products;
  }

  return products.filter(product => product.category === category);
}

export function getStockStatus(stock) {
  if (stock === 0) {
    return "Out of Stock";
  }

  if (stock >= 1 && stock <= 5) {
    return "Low Stock";
  }

  return "In Stock";
}

export function calculateTotalInventoryValue(products) {
  return products.reduce((total, product) => {
    return total + (product.price * product.stock);
  }, 0);
}

export function countLowStockProducts(products) {
  return products.filter(product => product.stock >= 1 && product.stock <= 5).length;
}

export function countOutOfStockProducts(products) {
  return products.filter(product => product.stock === 0).length;
}
