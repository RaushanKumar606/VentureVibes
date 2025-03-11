const express = require("express");
const Bus = require("../models/bus.model");

// Get all buses
const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching buses", error });
  }
};

// Create a new bus
const createBus = async (req, res) => {
  try {
    if (!req.body || !req.file){
      return res.status(400).json({ success: false, message: "All required fields must"})
    }

    const { name, operator, departureTime, arrivalTime, duration, departureLocation, arrivalLocation, to, day, price, seatsAvailable, busType, status } = req.body;
    if (!name || !operator || !departureTime || !arrivalTime || !duration || !departureLocation || !arrivalLocation || !to || !day || !price || !seatsAvailable || !busType) {
      return res.status(400).json({ success: false, message: "All required fields must be provided" });
    }

   
    const images = req.files.map(file => ({
      url: file.path, 
      filename: file.filename,
    }));
    const newBus = new Bus({
      name,
      operator,
      images,
      departureTime,
      arrivalTime,
      duration,
      departureLocation,
      arrivalLocation,
      to,
      day,
      price,
      seatsAvailable,
      busType,
      status,
      owner: req.user ? req.user._id : null,
    });

    await newBus.save();
    res.status(201).json({ success: true, message: "Bus created successfully", bus: newBus });
  } catch (error) {
    console.error("Bus Creation Error:", error);
    res.status(500).json({ success: false, message: "Error creating bus", error: error.message });
  }
};

// Get bus by ID
const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bus", error });
  }
};

// Update bus
const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json({ message: "Bus updated successfully", bus });
  } catch (error) {
    res.status(500).json({ message: "Error updating bus", error });
  }
};

// Delete bus
const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bus", error });
  }
};

module.exports = {
  getAllBuses,
  createBus,
  getBusById,
  updateBus,
  deleteBus,
};
