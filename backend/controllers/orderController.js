// In-memory mock order store
const orders = [];

// @desc    Process Checkout & Create Order
// @route   POST /api/orders/checkout
const createOrder = (req, res) => {
  const { shippingAddress, phone, paymentMethod, totalAmount, items } = req.body;

  if (!items || items.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No items in cart to checkout" });
  }

  const newOrder = {
    id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    shippingAddress,
    phone,
    paymentMethod,
    totalAmount,
    items,
    status: "Processing",
    createdAt: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  };

  orders.unshift(newOrder);

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: newOrder,
  });
};

// @desc    Get All Orders
// @route   GET /api/orders
const getOrders = (req, res) => {
  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
};

module.exports = {
  createOrder,
  getOrders,
};