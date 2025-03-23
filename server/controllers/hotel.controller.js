const Hotel = require("../models/hotel.model");
const fs = require('fs');
const path = require('path');
const uploadOnCloudinary = require("../utils/cloudinary");
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

const createHotel = async (req, res) => {
  try {
 
    
    const kilometers = Number(req.body.kilometers);
    const persons = Number(req.body.persons);
    const pricePerNight = Number(req.body.pricePerNight);
    const rating = req.body.rating ? Number(req.body.rating) : 0;
    let amenities = req.body.amenities;
    if (!Array.isArray(amenities)) {
      amenities = amenities ? amenities.split(",") : []; // Convert CSV string to array
    }
    if (!req.file || req.file.length === 0) {
      return res.status(400).json({ message: " No images uploaded!" });
    }
    // Upload images to Cloudinary
    let imageUrls = null;
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResponse) {
        imageUrls = cloudinaryResponse.secure_url;
      }
    

    const { name, location, typeRoom, status, description } = req.body;

    // Validate required fields
    if (!name || !location || !kilometers || !typeRoom || !persons || !pricePerNight || !status || !description) {
      return res.status(400).json({ success: false, message: " All required fields must be provided" });
    }

    const newHotel = new Hotel({
      name,
      owner: req.user._id, 
      location,
      kilometers,
      typeRoom,
      persons,
      pricePerNight,
      amenities,
      status,
      rating,
      description,
      images: imageUrls,
    });
    await newHotel.save();
    res.status(201).json({ success: true, message: " Hotel created successfully", hotel: newHotel });
  } catch (error) {
    console.error(" Error creating hotel:", error);
    res.status(500).json({ success: false, message: "Error creating hotel", error: error.message });
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
