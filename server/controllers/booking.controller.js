const Booking = require("../models/booking.model.js");
const Hotel = require("../models/hotel.model.js");
const Bus = require("../models/bus.model.js");
const Flight = require("../models/flight.model.js");
const Train = require("../models/train.model.js");
const User = require("../models/user.model.js");
const Razorpay = require("razorpay");

const createBooking = async (req, res) => {
  try {
    const { bookingType, bookingDate, transactionId } = req.body;
    const userId = req.user?._id;
    if (!bookingType) {
      return res.status(400).json({ message: "Booking type is required" });
    }
    const validBookingTypes = ["Hotel", "Bus", "Flight", "Train"];
    if (!validBookingTypes.includes(bookingType)) {
      return res.status(400).json({ message: "Invalid booking type" });
    }
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let referenceId = req.body[bookingType.toLowerCase()];
    if (!referenceId) {
      return res.status(400).json({ message: `${bookingType} ID is required` });
    }

    const ModelMap = { Hotel, Bus, Flight, Train };
    const bookedItem = await ModelMap[bookingType].findById(referenceId);

    if (!bookedItem) {
      return res.status(404).json({ message: `${bookingType} not found` });
    }

    const newBooking = new Booking({
      user: userId,
      bookingType,
      [bookingType.toLowerCase()]: referenceId,
      bookingDate,
      transactionId,
      paymentStatus: "Paid",
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful", booking: newBooking });

  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};


// Get All Bookings for a User

const getUserBooks = async (req, res) => {
    try {
      const userId = req.user?.id || req.params.userId;
        const bookings = await Booking.find({ user: userId })
            .populate("user","name email")
            .populate("hotel")
            .populate("bus")
            .populate("flight")
            .populate("train");
        if (!bookings.length) return res.status(404).json({ message: "No bookings found" });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error });
    }
};


// Cancel a Booking
const cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: "Booking not found" });
        await Booking.findByIdAndDelete(bookingId);
        res.status(200).json({ message: "Booking canceled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error canceling booking", error });
    }
};
//  Update Payment Status
const updatePaymentStatus = async (req, res) => {
    try {
        const { bookingId, status } = req.body;
        const validStatuses = ["Pending", "Paid", "Cancelled", "Refunded"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid payment status" });
        }
        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { paymentStatus: status },
            { new: true }
        );
        if (!booking) return res.status(404).json({ message: "Booking not found" });
        res.status(200).json({ message: "Payment status updated", booking });
    } catch (error) {
        res.status(500).json({ message: "Error updating payment status", error });
    }
};

const createPaymentIntent = async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
  try {
    const { amount, currency, receipt } = req.body;

    if (!amount || !currency || !receipt) {
      return res.status(400).json({ message: "Amount, currency, and receipt are required" });
    }

    const options = {
      amount: amount * 100,
      currency:'INR',
      receipt:`receipt_${Date.now()}`
      
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create payment order", error: error.message });
  }
};






module.exports = { updatePaymentStatus, cancelBooking, getUserBooks, createBooking ,createPaymentIntent}