const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Define the User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Validates a 10-digit number
      },
      message: (props) => `${props.value} is not a valid 10-digit number!`,
    },
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean, 
    default: false, 
  },
  
  password: {
    type: String,
    required: true, 
    unique: true,   
    validate: {
      validator: function (v) {
        return /[a-z]/.test(v) && /[A-Z]/.test(v) && /\d/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v);
      },
      message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
    },
  },
}, {
  timestamps: true, 
});

// **Pre-save middleware to hash the password before saving**
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
    
      this.password = await bcrypt.hash(this.password, 10); 
    }
    next();
  });
// token generater 
  userSchema.methods.generateToken = async function () {
    try {
      return jwt.sign(
        {
          userId: this._id.toString(),
          email: this.email,
          isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30d", 
        }
      );
    } catch (error) {
      console.error("Error generating JWT:", error);
      
    }
  };

  userSchema.methods.comparePassword =async function(password){
return bcrypt.compare(password,this.password)
  }

// Create the User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
