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
    console.log("Request Headers:", req.headers);  
    console.log("Request Files:", req.files); // Debugging
    console.log("Request Body:", req.body); // Debugging

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Images are required",
      });
    }
const kilometers = Number(req.body.kilometers);
const persons = Number(req.body.persons);
const pricePerNight = Number(req.body.pricePerNight);
const rating = Number(req.body.rating);
const amenities = req.body.ameities 
  ? (Array.isArray(req.body.ameities) ? req.body.ameities : req.body.ameities.split(",")) 
  : [];



    const {
      name,
      location,
      typeRoom,
      status,
      description,
    } = req.body;

      //  const imageUrl = req.files.map(file=>file.path);
      //  console.log("all image url", imageUrl);

      const imageUrl = req.files.map(file => `/uploads/${file.filename}`);

    if (
      !name ||
      !location ||  
      !kilometers ||
      !typeRoom ||
      !persons ||
      !pricePerNight ||
      !amenities ||
      !rating ||
      !status ||
      !description

    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "All required fields must be provided",
        });
    }
   
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
      images:imageUrl,
      description,
      owner: req.user ? req.user._id : null,
    });
    await newHotel.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Hotel created successfully",
        hotel: newHotel,
      });
  } catch (error) {
    console.error("Hotel Creation Error:", error);
    res
      .status(500)
      .json({
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
