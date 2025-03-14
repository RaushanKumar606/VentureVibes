const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  operator: {
    type: String,
    required: true,
  },
  busNumber:{
    type:String,
    required:true,
    unique:true,
  },
  images: { type: [String], required: true },
  
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
  departureLocation: {
    type: String,
    required: true,
  },
  arrivalLocation: {
    type: String,
    required: true,
  },
  to: {
    type: [String], // List of cities the bus travels to
    enum: ["Chennai", "Hyderabad", "Coimbatore", "Mumbai", "Goa"],
    required: true,
  },
  day: {
    type: [String], // Days of operation
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
  },
  price: {
    amount: {
      type: Number,
      required: true,
    },
    currencyCode: {
      type: String,
      required: true,
    },
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  totalSeats:{
    type:Number,
    required:true,
  },
  busType: {
    type: String,
    enum: ["AC", "Non-AC", "Sleeper", "Semi-Sleeper", "Seater"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Delayed", "Cancelled", "Completed"],
    default: "Scheduled",
  },
amenities:[{type:String,}],
bookings:{type:mongoose.Schema.Types.ObjectId,
  ref:"Booking"
},
   reviews: [
      {
        user: {
           type: mongoose.Schema.Types.ObjectId,
          ref: "review",
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

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
