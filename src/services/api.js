import { products } from "../utils/products";

const PHP_API_BASE = "http://localhost:5000/api";

export const fetchProducts = async () => {
  try {
    const res = await fetch(`${PHP_API_BASE}/products.php`);
    const data = await res.json();
    if (data.success && data.data && data.data.length > 0) {
      return data.data;
    }
  } catch (error) {
    console.log("PHP/MySQL API offline, using fallback catalog data");
  }
  return products;
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${PHP_API_BASE}/products.php?id=${id}`);
    const data = await res.json();
    if (data.success && data.data) {
      return data.data;
    }
  } catch (error) {
    console.log("PHP/MySQL API offline, using fallback product detail");
  }
  return products.find((item) => item.id === id || item.id === String(id));
};

export const submitOrder = async (orderData) => {
  try {
    const res = await fetch(`${PHP_API_BASE}/checkout.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    if (data.success && data.data) {
      return data.data;
    }
  } catch (error) {
    console.log("PHP/MySQL API offline, generating local fallback order");
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