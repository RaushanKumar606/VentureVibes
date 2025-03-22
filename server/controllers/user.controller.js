
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const  uploadOnCloudinary = require("../utils/cloudinary");
// **---------------------**
// Create user Logic
// **---------------------**
const createUser = async (req, res, next) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({ message: " No image uploaded!" });
    }
    const { name, email, number, password, country } = req.body;
    if (!name || !email || !number || !password || !country) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    let imageUrl = null;
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    if (cloudinaryResponse) {
      imageUrl = cloudinaryResponse.secure_url;
    }
    

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, number, country, password: hashedPassword, image:imageUrl });
    const savedUser = await newUser.save();
    const token = await savedUser.generateToken();
    res.status(201).json({
      message: 'User created successfully',
      user: savedUser,
      userId: savedUser._id.toString(),
      image:savedUser.imageUrl,
      token
    });

  } catch (error) {
    console.error("❌ Error Creating User:", JSON.stringify(error, null, 2));
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
    next(error);
  }
};

// **---------------------**
// userUpdate Logic
// **---------------------**
const updateUser = async (req, res) => {
  try {
    const { name, email, number, dob, country } = req.body;
    const userId = req.params.id;
    if (!name || !email || !number || !dob || !country) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message })
    next(error)
  }
};


// **---------------------**
// userData Access Logic
// **---------------------**

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData })

  } catch (error) {

  }
}


module.exports = { createUser, user,updateUser };
