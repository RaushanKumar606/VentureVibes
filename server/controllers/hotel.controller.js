const Hotel = require("../models/hotel.model");
const fs = require('fs');
const path = require('path');
// Get all hotels
const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels", error });
  }
};

// Get a single hotel by ID
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotel", error });
  }
};

// Create a new hotel
const createHotel = async (req, res) => {
  try {
    // Convert numeric fields safely
    const kilometers = req.body.kilometers ? Number(req.body.kilometers) : null;
    const persons = req.body.persons ? Number(req.body.persons) : null;
    const pricePerNight = req.body.pricePerNight ? Number(req.body.pricePerNight) : null;
    const rating = req.body.rating ? Number(req.body.rating) : 0;

    // Fix typo and handle amenities properly
    const amenities = req.body.amenities
      ? Array.isArray(req.body.amenities)
        ? req.body.amenities
        : req.body.amenities.split(",")
      : [];

    const { name, location, typeRoom, status, description } = req.body;

    // Validation for required fields
    if (
      !name ||
      !location ||
      kilometers === null ||
      !typeRoom ||
      persons === null ||
      pricePerNight === null ||
      !amenities.length || // Ensures amenities is not empty
      rating < 0 ||
      !status ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // Create new hotel
    const newHotel = new Hotel({
      name,
      location,
      kilometers,
      typeRoom,
      persons,
      pricePerNight,
      amenities,
      status,
      rating,
      description,
      owner: req.user ? req.user._id : null,
    });

    await newHotel.save();
    res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      hotel: newHotel,
    });
  } catch (error) {
    console.error("Hotel Creation Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating hotel",
      error: error.message,
    });
  }
};

// Update a hotel by ID
const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedHotel)
      return res.status(404).json({ message: "Hotel not found" });

    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(400).json({ message: "Error updating hotel", error });
  }
};

// Delete a hotel by ID
const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hotel", error });
  }
};

module.exports = {
  deleteHotel,
  updateHotel,
  createHotel,
  getHotels,
  getHotelById,
};
