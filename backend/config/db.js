// Database Configuration & Data Storage Simulation
const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../data/products.json");

const getProducts = () => {
  try {
    const rawData = fs.readFileSync(productsPath, "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    return [];
  }
};

module.exports = {
  getProducts,
};