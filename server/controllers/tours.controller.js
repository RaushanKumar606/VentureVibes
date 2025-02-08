
const Tour = require('../models/tour.model'); 

// Create a new tour
const createTour = async (req, res) => {
  try {
    const { title, description, price, country } = req.body;
    const newTour = new Tour({ title, description, price, country });
    await newTour.save();
    res.status(201).json({ success: true, data: newTour });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTour) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.status(200).json({ success: true, data: updatedTour });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a tour
const deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if (!deletedTour) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.status(200).json({ success: true, message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { deleteTour,updateTour,getTourById,getAllTours,createTour };