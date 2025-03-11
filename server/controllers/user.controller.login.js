
const User = require('../models/user.model');

// **---------------------**
// Login user Logic (for generating JWT token on login)
// **---------------------**

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      const userExist = await User.findOne({ email });
      if (!userExist) {
        return res.status(400).json({ message: 'Invalide email or password please try again' });
      }
      const token = await userExist.generateToken();
      const user = await userExist.comparePassword(password) 
      if (!user) {
        return res.status(400).json({ message: 'Invalide credentials' });
      }
      res.status(200).json({
        message: 'Login successful',
        userId:userExist._id.toString(),
         token
      });
    } catch (err) {
      res.status(500).json({ message: 'Error during login', error: err.message });
    }
  };

  module.exports = { loginUser };