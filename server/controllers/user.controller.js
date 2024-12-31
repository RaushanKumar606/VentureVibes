
const User = require('../models/user.model');

// **---------------------**
// Create user Logic
// **---------------------**

const createUser = async (req, res) => {
  try {
    const { name, email, number, password, country } = req.body;


    if (!name || !email || !number || !password || !country) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    const existingPasswordUser = await User.findOne({ password });
    if (existingPasswordUser) {
      return res.status(400).json({ message: 'Password is already taken' });
    }

    const newUser = new User({ name, email, number, country, password });
    const savedUser = await newUser.save();

    // Return the response with the JWT token
    const token = await savedUser.generateToken();
  
    res.status(201).json({
      message: 'User created successfully',
      user: savedUser,
      userId:savedUser._id.toString() 
      ,token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message })
    next(error)
  }
};

// **---------------------**
// userData Access Logic
// **---------------------**

const user = async(req,res)=>{
  try {
      const userData = req.user;
 return res.status(200).json({userData})
      
  } catch (error) {
      
  }
}




module.exports = { createUser,user };
