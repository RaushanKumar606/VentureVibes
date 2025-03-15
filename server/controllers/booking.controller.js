const Booking = require("../models/booking.model.js");
const Hotel = require("../models/hotel.model.js");
const Bus = require("../models/bus.model.js");
const Flight = require("../models/flight.model.js");
const Train = require("../models/train.model.js");
const User = require("../models/user.model.js");

const createBooking = async (req, res) => {
    try {
        const { bookingType, bookingDetails } = req.body;
        const userId = req.user ? req.user._id : null;
        const busId = req.body.bus && req.body.bus._id ? req.body.bus._id : null;
        const flightId = req.body.flight && req.body.flight._id ? req.body.flight._id : null;
        const trainId = req.body.train && req.body.train._id ? req.body.train._id : null;
        const hotelId = req.body.hotel && req.body.hotel._id ? req.body.hotel._id : null;
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
        let bookedItem = null;
        if (bookingType === "Hotel" && hotelId) {
            bookedItem = await Hotel.findById(hotelId);
        } else if (bookingType === "Bus" && busId) {
            bookedItem = await Bus.findById(busId);
        } else if (bookingType === "Flight" && flightId) {
            bookedItem = await Flight.findById(flightId);
        } else if (bookingType === "Train" && trainId) {
            bookedItem = await Train.findById(trainId);
        }
        if (!bookedItem) {
            return res.status(404).json({ message: `${bookingType} not found ` });
        }
        const newBooking = new Booking({
            user: userId,
            bookingType,
            hotel: hotelId || null,
            bus: busId || null,
            flight: flightId || null,
            train: trainId || null,
            bookingDetails: bookingType === "Hotel" ? {} : { seatNumber: bookingDetails?.seatNumber || null },
            paymentStatus: "Pending",
        });
        await newBooking.save();
        res.status(201).json({ message: "Booking successful", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error: error.message });
    }
};
// Get All Bookings for a User
const getUserBookings = async (req, res) => {
    try {
        const userId = req.params.userId;
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

// ✅ Cancel a Booking
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

module.exports = { updatePaymentStatus, cancelBooking, getUserBookings, createBooking }