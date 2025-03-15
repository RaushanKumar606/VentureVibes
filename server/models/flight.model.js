const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
  airline: {
    name: { type: String, required: true },
  },
  from:{
    type:String,
    required:true,
  },
  to:{
    type:String,
    required:true,
  },
  images: { type: [String], required: true },
  minPrice: {
    type: Number, required: true 
  },
  departureTime: {
          Date
  },
  arrivalTime: {
   Date
  },
  duration: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  flightNumber: { type: String, required: true },
  carrier: {
    operating: { type: String, required: true },
    marketing: { type: String, required: true },
  },
  seatsAvailable: { type: Number, required: true },
  status: {
    type: String,
    enum: [
      "Scheduled",
      "On Time",
      "Delayed",
      "Boarding",
      "Departed",
      "In Air",
      "Landed",
      "Cancelled",
      "Diverted"
    ],
    default: "Scheduled",
  },
bookings:{type:mongoose.Schema.Types.ObjectId,
  ref:"Booking"
},

  travellerType: {
    type: String,
    enum: ["OneWay", "Round Trip", "Direct Flight", "Demostic Flight ", "InterNational Flight"],
    required: true,
    default: "One Way",
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
  createdAt: { type: Date, default: Date.now },
});
const Flight = mongoose.model("Flight", FlightSchema);
module.exports= Flight;