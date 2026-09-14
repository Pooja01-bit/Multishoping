import { products } from "../utils/products";

// Simulated API service layer for MultiMart E-Commerce
export const fetchProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 300);
  });
};

export const fetchProductById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((item) => item.id === id || item.id === String(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    }, 200);
  });
};

export const submitOrder = async (orderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const createdOrder = {
        ...orderData,
        id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        status: "Processing",
        createdAt: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
      resolve(createdOrder);
    }, 500);
  });
};

