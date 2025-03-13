const adminMiddleware = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. User not authenticated." });
    }
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res.status(403).json({ message: "Forbidden. User is not an admin." });
    }
    next();
  };
  
  module.exports = { adminMiddleware };