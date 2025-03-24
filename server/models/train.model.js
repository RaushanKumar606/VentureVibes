const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  prnNumber: {
    type: String,
    unique: true,
  },
  operator: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  departureTime: {
    type: String, // e.g., "10:30 AM"
    required: true,
  },
  arrivalTime: {
    type: String, // e.g., "03:00 PM"
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
  departureStation: {
    type: String,
    required: true,
  },
  arrivalStation: {
    type: String,
    required: true,
  },
  to: {
    type: [String], // List of destinations
    enum: ["Chennai", "Hyderabad", "Coimbatore", "Mumbai", "Goa"],
    required: true,
  },
  day: {
    type: [String], // Days of operation
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
  },
  bookings:{type:mongoose.Schema.Types.ObjectId,
    ref:"Booking"
  },
  price: {
      type: Number,
      required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  trainType: {
    type: String,
    enum: ["Express", "Superfast", "Passenger", "Shatabdi", "Rajdhani", "Garib Rath"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Delayed", "Cancelled", "Completed"],
    default: "Scheduled",
  },
  reviews: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Train = mongoose.model("Train", trainSchema);

module.exports = Train;
