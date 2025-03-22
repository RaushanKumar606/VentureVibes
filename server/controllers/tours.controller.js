const express = require("express");
const Tour = require('../models/tour.model');
const mongoose = require('mongoose');


// Create a new tour


const createTour = async (req, res) => {
  try {
  
    const { title, bestTimeToTravel, description, price, location, country } = req.body;
    const destinations = req.body.destinations || [];
    const duration = req.body.duration || {};
    const dayWisePlan = req.body.dayWisePlan || [];

    if (!title || !dayWisePlan.length || !bestTimeToTravel || !description || !price || !location || !country || !destinations.length || !duration.days || !duration.nights) {
      return res.status(400).json({ success: false, message: "All fields are required to create the tour" });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: " No images uploaded!" });
    }
      let imageUrls = [];
        for (let file of req.files) {
          const cloudinaryResponse = await uploadOnCloudinary(file.path);
          if (cloudinaryResponse) {
            imageUrls.push(cloudinaryResponse.secure_url);
          }
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
      images: imageUrls,
      owner: req.user ? req.user._id : null,
    });

    await newTour.save();
    res.status(201).json({ message: "Tour created successfully", tour: newTour });
  } catch (error) {
    res.status(500).json({
      message: "Error creating tour",
      error: error.message || error,
    });
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