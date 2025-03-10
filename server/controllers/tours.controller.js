const express = require("express");
const Tour = require('../models/tour.model'); 
const mongoose = require('mongoose');
const {cloudinary} = require('../cloudinary/cloudinary')


// Create a new tour
const createTour = async (req, res) => {
  try {
    console.log("Request received:", req.body);
    console.log("Uploaded file:", req.file); 
    const { title, description, price, country, location } = req.body;
    if (!title || !description || !price || !country || !location) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    let image = { url: "", filename: "" };
    if (req.file) {
      image = { url: req.file.path, filename: req.file.filename };
    }
    const newTour = new Tour({
      title,
      description,
      price,
      country,
      location,
      owner: req.user ? req.user._id : null, 
      image,
    });
    await newTour.save();
    return res.status(201).json({ success: true, data: newTour });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: error.message });
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
  const { title, price, location, country, description } = req.body;
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid tour ID' });
  }
  
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { title, price, location, country, description },
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



module.exports = { deleteTour,updateTour,getTourById,getAllTours,createTour };