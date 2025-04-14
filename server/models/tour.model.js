

const mongoose = require("mongoose");
const { Schema } = mongoose;

const toursSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  destinations: [  // Multiple destinations
    {
      type: String,
      required: true
    }
  ],
  bestTimeToTravel: {
    type: String,
    required: true
  },
  duration:
  {
    days: { type: Number, required: true },
    nights: { type: Number, required: true }
  }
  ,

  images: { type: [String], required: true },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  location: {
    type: String
  },
  country: {
    type: String
  },
  dayWisePlan: [
    {
      day: { type: Number, required: true },
      activity: { type: String, required: true }
    }
  ],

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: "Review",

    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // geometry: {
  //   type: {
  //     type: String,
  //     enum: ['Point'], // Only allow 'Point'
  //     required: true
  //   },
  //   coordinates: {
  //     type: [Number], // [longitude, latitude]
  //     required: true
  //   }
  // }
  
});

const Tours = mongoose.model("Tour", toursSchema);
module.exports = Tours;
