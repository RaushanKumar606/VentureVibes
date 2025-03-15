const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');


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
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Current password is incorrect." });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate({ _id: req.userId }, { $set: { password: hashedPassword } })
  res.status(200).json({ message: "Password updated successfully in db." });
};


// **---------------------**
//1. Password Reset Email Generation
// **---------------------**


const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const token = jwt.sign({ email}, process.env.JWT_SECRET_KEY, { expiresIn: '55m' });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS   
      }
    });
    const mailOptions = {
      from: 'feongoerem@gmail.com',  
      to: email,  
      subject: "Password Reset",
      text: `click on this link to generate the new password ${process.env.CLIENT_URL}/reset-password/${token}`,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    res.status(200).json({ message: "Password reset link generated successfully.", });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// **---------------------**
// 3 User Password Reset Generation
// **---------------------**

const resetPassword = async (req, res) => {
  try {
    const {token} = req.params;
    const{password}=req.body;
    if(!password){
      return     res.status(400).json({ message: "Please Provide the password " });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY );
    const user = await User.findOne({email:decode.email});
    const newHashPassword = await hashedPassword(password);
    user.password = newHashPassword;
    await user.save();
    return res.status(200).json({message:"Password reset successfuly"})
  } catch (error) {
    
  }
}

// **---------------------**
// .4 User Password Change  
// **---------------------**

// 2. User Password  change
const userPasswordReset = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { id, token } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Invalid user ID." });
    }
    const secret = user._id + process.env.JWT_SECRET_KEY;
    jwt.verify(token, secret);
    if (!password || !confirmPassword) {
      return res.status(400).json({ error: "Both password fields are required." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user._id, { $set: { password: hashedPassword } });
    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    res.status(400).json({ error: "Invalid or expired token." });
  }
};

module.exports = { changePassword, forgetPassword, userPasswordReset ,resetPassword};

