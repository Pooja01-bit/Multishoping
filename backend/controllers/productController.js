const { getProducts } = require("../config/db");

// @desc    Fetch all products
// @route   GET /api/products
const getAllProducts = (req, res) => {
  try {
    const products = getProducts();
    const { category, search } = req.query;

    let filtered = [...products];

    if (category && category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (search) {
      filtered = filtered.filter((p) =>
        p.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
const getProductById = (req, res) => {
  try {
    const products = getProducts();
    const product = products.find(
      (p) => p.id === req.params.id || p.id === String(req.params.id)
    );

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};