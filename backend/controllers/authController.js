// In-memory mock user store for demonstration
const users = [];

// @desc    User Login
// @route   POST /api/auth/login
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide email and password" });
  }

  const name = email.split("@")[0] || "User";

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: "USR-" + Math.floor(1000 + Math.random() * 9000),
      name: name,
      email: email,
    },
    token: "mock-jwt-token-" + Date.now(),
  });
};

// @desc    User Registration
// @route   POST /api/auth/register
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    user: {
      id: "USR-" + Math.floor(1000 + Math.random() * 9000),
      name: name,
      email: email,
    },
    token: "mock-jwt-token-" + Date.now(),
  });
};

module.exports = {
  loginUser,
  registerUser,
};