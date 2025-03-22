const express = require("express");
const Bus = require("../models/bus.model");
const uploadOnCloudinary = require("../utils/cloudinary");
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
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: " Request body is empty!" });
    }
    let {
      name, operator, busNumber, departureTime, arrivalTime, duration,
      departureLocation, arrivalLocation, to, day, price, seatsAvailable,
      busType, status, totalSeats, amenities
    } = req.body;

    departureTime = new Date(departureTime);
    arrivalTime = new Date(arrivalTime);

    if (isNaN(departureTime.getTime()) || isNaN(arrivalTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: " Invalid date format! Use 'YYYY-MM-DDTHH:mm:ss.sssZ'."
      });
    }

     let imageUrl = null;
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if (cloudinaryResponse) {
          imageUrl = cloudinaryResponse.secure_url;
        }
    const parsedBus = {
      name,
      operator,
      busType,
      busNumber,
      departureTime,
      arrivalTime,
      duration: Number(duration),
      departureLocation,
      arrivalLocation,
      to: Array.isArray(to) ? to : to.split(","),
      day: Array.isArray(day) ? day : day.split(","),
      price: Number(price),
      seatsAvailable: Number(seatsAvailable),
      totalSeats: Number(totalSeats),
      amenities: Array.isArray(amenities) ? amenities : amenities.split(","),
      status, image: imageUrl,
      owner: req.user ? req.user._id : null,
    };
    const newBus = new Bus(parsedBus);
    await newBus.save();

    res.status(201).json({
      success: true,
      message: "Bus created successfully",
      bus: newBus,
    });

  } catch (error) {
    console.error(" Bus Creation Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating bus",
      error: error.message,
    });
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
