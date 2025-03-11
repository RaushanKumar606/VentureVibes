const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
  airline: {
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
    iataCode: { type: String, required: true },
  },
  images: [  
    {
        url: String,
        filename: String
    }
],
  minPrice: {
    currencyCode: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  departureTime: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  arrivalTime: {
    start: { type: String, required: true },
    end: { type: String, required: true },
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
    enum: ["Scheduled", "Delayed", "Cancelled", "Completed"],
    default: "Scheduled",
  },
  travellerType: {
    type: String,
    enum: ["ADULT", "CHILD", "INFANT"],
    required: true,
    default: "ADULT",
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