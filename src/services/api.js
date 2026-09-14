import { products } from "../utils/products";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    const data = await res.json();
    if (data.success && data.data.length > 0) {
      return data.data;
    }
  } catch (error) {
    console.log("Backend offline, using fallback data");
  }
  return products;
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    const data = await res.json();
    if (data.success) {
      return data.data;
    }
  } catch (error) {
    console.log("Backend offline, using fallback product");
  }
  return products.find((item) => item.id === id || item.id === String(id));
};

export const submitOrder = async (orderData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    if (data.success) {
      return data.data;
    }
  } catch (error) {
    console.log("Backend offline, generating fallback order");
  }
  return {
    ...orderData,
    id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    status: "Processing",
    createdAt: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  };
};