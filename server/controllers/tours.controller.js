const express = require("express");
const Tour = require('../models/tour.model');
const mongoose = require('mongoose');
const uploadOnCloudinary=require('../utils/cloudinary')

// Create a new tour
const createTour = async (req, res) => {
  try {
    // console.log("Request Body:", req.body); 
    // console.log("Uploaded File:", req.file);
    const { title, bestTimeToTravel, description, price, location, country } = req.body;
    let destinations = [];
    let duration = {};
    let dayWisePlan = [];
    try {
      destinations = req.body.destinations ? JSON.parse(req.body.destinations) : [];
      duration = req.body.duration ? JSON.parse(req.body.duration) : {};
      dayWisePlan = req.body.dayWisePlan ? JSON.parse(req.body.dayWisePlan) : [];
    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid JSON format in form-data fields" });
    }

    if (!title || !bestTimeToTravel || !description || !price || !location || !country || !destinations || !dayWisePlan) {
      return res.status(400).json({ success: false, message: "All fields are required to create the tour" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded!" });
    }
    let imageUrl = null;
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    if (cloudinaryResponse) {
      imageUrl = cloudinaryResponse.secure_url;
    }

    const newTour = new Tour({
      title,
      description,
      price,
      location,
      country,
      destinations,
      duration,
      bestTimeToTravel,
      dayWisePlan,
      images: imageUrl, 
      owner: req.user ? req.user._id : null,
    });

    await newTour.save();
    res.status(201).json({ message: "Tour created successfully", tour: newTour });

  } catch (error) {
    console.error("Error creating tour:", error);
    res.status(500).json({ message: "Error creating tour", error: error.message || error });
  }
};


// Get all tours
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({ success: true, tours });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single tour by ID
const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.status(200).json({ success: true, data: tour });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a tour

const updateTour = async (req, res) => {
  const { title, dayWisePlan, bestTimeToTravel, description, price, location, country, destinations, duration } = req.body;
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid tour ID' });
  }
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { title, dayWisePlan, bestTimeToTravel, description, price, location, country, destinations, duration },
      { new: true, runValidators: true }
    );
    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      updateTour.image = { url, filename };
    }
    if (!updatedTour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }
    res.status(200).json({ success: true, data: updatedTour });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete a tour
const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid tour ID' });
    }
    const deletedTour = await Tour.findByIdAndDelete(id);
    if (!deletedTour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }
    res.status(200).json({ success: true, message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = { deleteTour, updateTour, getTourById, getAllTours, createTour };