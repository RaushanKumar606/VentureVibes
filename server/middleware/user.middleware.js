const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const userMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({
      message: "Token is not provided",
    });
  }
  const jwtToken = token.replace("Bearer", "").trim();
  try {
    const isVerifyToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({ email: isVerifyToken.email }).select("-password");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = userData;
    req.token = jwtToken;
    req.userId = userData._id;
    next(); 
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized. Invalid token.",
      error: error.message, 
    });
  }
};

module.exports = {userMiddleware}
