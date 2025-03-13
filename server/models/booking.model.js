// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   post: {
//     type: mongoose.Types.ObjectId,
//     ref: "Post",
//     required: true,
//   },
//   bookingDate: {
//     type: Date,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["pending", "completed", "cancelled"],
//     default: "pending",
//   },
//   paymentStatus: {
//     type: String,
//     enum: ["unpaid", "paid"],
//     default: "unpaid",
//   },
//   transactionId: {
//     type: String,
//   },
// });

// export default mongoose.model("Booking", bookingSchema);

const mongoose= require ("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    bookingType: {
      type: String,
      enum: ["Hotel", "Bus", "Flight", "Train"],
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      default: null,
    },
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", default: null },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      default: null,
    },
    train: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Train",
      default: null,
    },

    bookingDetails: {
      seatNumber: { type: String, default: null },
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Cancelled", "Refunded"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// Middleware to ensure seatNumber is only set for Bus, Flight, Train
bookingSchema.pre("save", function (next) {
  if (this.bookingType === "Hotel") {
    this.bus = this.flight = this.train = null;
    this.bookingDetails.seatNumber = null; // No seatNumber for Hotel
  } else if (this.bookingType === "Bus") {
    this.hotel = this.flight = this.train = null;
  } else if (this.bookingType === "Flight") {
    this.hotel = this.bus = this.train = null;
  } else if (this.bookingType === "Train") {
    this.hotel = this.bus = this.flight = null;
  }
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;