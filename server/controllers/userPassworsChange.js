const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 


  // **---------------------**
// user changePassword Logic (for generating JWT token)
// **---------------------**

const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "New passwords do not match." });
  }

  if (newPassword.length < 8) {
    return res
      .status(400)
      .json({ error: "New password must be at least 8 characters long." });
  }

  const user = await User.findOne({ _id: req.userId })
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  // Check if the current password matches
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Current password is incorrect." });
  }

  // Hash and update the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate({ _id: req.userId },{$set:{password:hashedPassword}})
  res.status(200).json({ message: "Password updated successfully in db." });
};


  // **---------------------**
  //1. Password Reset Email Generation
// **---------------------**


const saveUserPasswordResetEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Create a unique secret for the user, combining the password and a secret key
    const secret = process.env.JWT_SECRET_KEY + user.password; 
    // Sign the token with the user's ID and the unique secret, setting expiration time to 15 minutes
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '15m' });

    // Construct the password reset link
    const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
    console.log(link)

    // Send the response back to the client (or email it to the user in a real application)
    res.status(200).json({ message: "Password reset link generated successfully.", link });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// **---------------------**
 // 2. User Password Reset Generation
// **---------------------**
// 2. User Password Reset
const userPasswordReset = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { id, token } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Invalid user ID." });
    }

    // Recreate the secret used when generating the token
    const secret = user._id + process.env.JWT_SECRET_KEY;

    // Verify the token
    console.log('t',token)
    jwt.verify(token, secret);

    // Validate the password fields
    if (!password || !confirmPassword) {
      return res.status(400).json({ error: "Both password fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await User.findByIdAndUpdate(user._id, { $set: { password: hashedPassword } });

    // Send a success response
    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid or expired token." });
  }
};



module.exports = { changePassword,saveUserPasswordResetEmail,userPasswordReset };

