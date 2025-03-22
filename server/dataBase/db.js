const mongoose = require('mongoose');

// Database connection function
const connectDB = async () => {
  try {
    await mongoose.connect
    (
      process.env.MONGO_URI,
      // 'mongodb://127.0.0.1:27017/travlers',
       {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
