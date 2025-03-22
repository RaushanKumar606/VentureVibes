const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
 
  kilometers: {
    type: Number, 
    required: true,
  },
  typeRoom: {
    type: String,
    enum: ["Single", "Double", "Suite", "Family", "Luxury"],
    required: true,
  },
  
  persons: {
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
booking:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Booking",
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
