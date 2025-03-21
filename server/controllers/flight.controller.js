const Flight = require("../models/flight.model"); 

const createFlight = async (req, res) => {
  try {
    const {
      airline,
      minPrice,
      departureTime,
      arrivalTime,
      duration,
      flightNumber,
      seatsAvailable,
      status,
      travellerType,
      from,
      to,
    } = req.body;

    if (!airline || !minPrice || !departureTime || !arrivalTime || !duration || !flightNumber || !seatsAvailable || !travellerType || !from || !to) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }console.dir(req.body, { depth: null });

    const newFlight = new Flight({
      airline,
      minPrice: Number(minPrice),
      from,
      to,
      departureTime,
      arrivalTime,
      duration: Number(duration),
      flightNumber,
      seatsAvailable: Number(seatsAvailable),
      status,
      travellerType,
      // image: req.file.path, 
      owner: req.user ? req.user._id : null,
    });

    await newFlight.save();
    res.status(201).json({
      success: true,
      message: "Flight created successfully",
      flight: newFlight,
    });
  } catch (error) {
    console.error("Error creating flight:", error);
    res.status(500).json({
      success: false,
      message: "Error creating flight",
      error: error.stack, 
    });
  }
};

// ✅ Get All Flights
const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json({ success: true, flights });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching flights", error: error.message });
  }
};

// ✅ Get a Single Flight by ID
const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ success: false, message: "Flight not found" });
    }
    res.status(200).json({ success: true, flight });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching flight", error: error.message });
  }
};

// ✅ Update a Flight
const updateFlight = async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedFlight) {
      return res.status(404).json({ success: false, message: "Flight not found" });
    }
    res.status(200).json({ success: true, message: "Flight updated successfully", flight: updatedFlight });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating flight", error: error.message });
  }
};

// ✅ Delete a Flight
const deleteFlight = async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
    if (!deletedFlight) {
      return res.status(404).json({ success: false, message: "Flight not found" });
    }
    res.status(200).json({ success: true, message: "Flight deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting flight", error: error.message });
  }
};

module.exports = {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
};
