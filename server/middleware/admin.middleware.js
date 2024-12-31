const adminMiddleware = (req, res, next) => {
   console.log(req.user)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. User not authenticated." });
    }
  
    // Check if the user is an admin
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res.status(403).json({ message: "Forbidden. User is not an admin." });
    }
  
    // If the user is an admin, proceed to the next middleware/route handler
    next();
  };
  
  module.exports = { adminMiddleware };