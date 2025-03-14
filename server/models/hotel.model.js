const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming a User model
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  kilometers: {
    type: Number, // Distance from a city center or landmark
    required: true,
  },
  typeRoom: {
    type: String,
    enum: ["Single", "Double", "Suite", "Family", "Luxury"],
    required: true,
  },
  checkIn: {
    type: String, // Example: "12:00 PM"
    required: true,
  },
  checkOut: {
    type: String, // Example: "10:00 AM"
    required: true,
  },
  persons: {
    type: Number,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  children: {
    type: Number,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },

  status:{
      type:String,
      enum:["Available","Not Available"],
      required:true
  },

  amenities: {
    type: [String], // Example: ["Free WiFi", "Swimming Pool", "Parking"]
    default: [],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  images: { type: [String], required: true },
  description: {
    type: String,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports= Hotel;
