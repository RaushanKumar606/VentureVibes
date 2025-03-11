const express = require("express");
const Train = require("../models/tour.model");

// Get all trains
const getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trains", error });
  }
};

// Create a new train
const createTrain = async (req, res) => {
  try {
    const train = new Train(req.body);
    await train.save();
    res.status(201).json({ message: "Train created successfully", train });
  } catch (error) {
    res.status(400).json({ message: "Error creating train", error });
  }
};

// Get train by ID
const getTrainById = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    res.status(200).json(train);
  } catch (error) {
    res.status(500).json({ message: "Error fetching train", error });
  }
};

// Update train
const updateTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    res.status(200).json({ message: "Train updated successfully", train });
  } catch (error) {
    res.status(500).json({ message: "Error updating train", error });
  }
};

// Delete train
const deleteTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndDelete(req.params.id);
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    res.status(200).json({ message: "Train deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting train", error });
  }
};

module.exports = {
  getAllTrains,
  createTrain,
  getTrainById,
  updateTrain,
  deleteTrain,
};
