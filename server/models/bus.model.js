const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  operator: { type: String, required: true },
  busNumber: { type: String, required: true, unique: true },
  
  images: { type: [String], required: false }, // Not required

  departureTime: { type: String, required: true }, // e.g., "10:30 AM"
  arrivalTime: { type: String, required: true }, // e.g., "03:00 PM"
  duration: { type: Number, required: true }, // Duration in minutes

  departureLocation: { type: String, required: true },
  arrivalLocation: { type: String, required: true },

  to: { type: [String], required: true }, // Removed `enum` to allow flexibility
  day: { 
    type: [String], 
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], 
    required: true 
  },

  price: { type: Number, required: true },
  seatsAvailable: { type: Number, required: true },
  totalSeats: { type: Number, required: true },

  busType: { 
    type: String, 
    enum: ["AC", "Non-AC", "Sleeper", "Semi-Sleeper", "Seater"], 
    required: true 
  },

  status: { 
    type: String, 
    enum: ["Scheduled", "Delayed", "Cancelled", "Completed"], 
    default: "Scheduled" 
  },

  amenities: { 
    type: [String], 
    default: [] // Ensures it doesn’t return `undefined`
  },

  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],

  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: { type: String, required: true }, 
      createdAt: { type: Date, default: Date.now }
    }
  ],

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: { type: Date, default: Date.now }
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
