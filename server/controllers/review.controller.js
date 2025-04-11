const Tours = require('../models/tour.model');
const Hotel = require("../models/hotel.model")
const Booking = require("../models/booking.model")
const Bus = require("../models/bus.model")
const Flight = require("../models/flight.model")
const Train = require("../models/train.model")
const Review = require('../models/reviews.model');

// **---------------------**
// ** GET All Reviews **
// **---------------------**
const allReview = async (req, res) => {
    try {
        const { modelType } = req.query;
    
        const populateOptions = {
          path: "reviews",
          populate: {
            path: "author",
            select: "name _id image",
          },
        };
    
        const formatReviews = (items, type) =>
          items.flatMap((item) =>
            item.reviews.map((review) => ({
              _id: review._id,
              userId: review.author?._id,
              userName: review.author?.name,
              userImage: review.author?.image,
              comment: review.comment,
              rating: review.rating,
              product_Id:review.product_Id,
              source: type,
            }))
          );
    
        let allReviews = [];
    
        if (modelType) {
          let Model;
          switch (modelType.toLowerCase()) {
            case "tour":
              Model = Tours;
              break;
            case "hotel":
              Model = Hotel;
              break;
            case "bus":
              Model = Bus;
              break;
            case "flight":
              Model = Flight;
              break;
            case "train":
              Model = Train;
              break;
            default:
              return res.status(400).json({ message: "Invalid model type" });
          }
    
          const items = await Model.find().populate(populateOptions);
          allReviews = formatReviews(items, modelType);
        } else {
          const tourReviews = await Tours.find().populate(populateOptions);
          const hotelReviews = await Hotel.find().populate(populateOptions);
          const busReviews = await Bus.find().populate(populateOptions);
          const flightReviews = await Flight.find().populate(populateOptions);
          const trainReviews = await Train.find().populate(populateOptions);
    
          allReviews = [
            ...formatReviews(tourReviews, "Tour"),
            ...formatReviews(hotelReviews, "Hotel"),
            ...formatReviews(busReviews, "Bus"),
            ...formatReviews(flightReviews, "Flight"),
            ...formatReviews(trainReviews, "Train"),
          ];
        }
    
        if (!allReviews.length) {
          return res.status(404).json({ message: "No reviews found" });
        }
    
        res.status(200).json({ message: "All reviews", allReviews });
      } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
    };


// **---------------------**
// ** Create Review **
// **---------------------**
const createReview = async (req, res) => {
  try {
    const { comment, rating, product_Id, modelType, user_id } = req.body;
    if (!comment || !rating || !product_Id || !modelType || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
        const newReview = new Review({
            comment,
            rating,
            author: user_id ,
            product_Id:product_Id
        });

        await newReview.save();

        let Model;
        switch (modelType.toLowerCase()) {
            case 'tour': Model = Tours; break;
            case 'hotel': Model = Hotel; break;
            case 'bus': Model = Bus; break;
            case 'flight': Model = Flight; break;
            case 'train': Model = Train; break;
            default: return res.status(400).json({ message: 'Invalid model type' });
        }

        await Model.findByIdAndUpdate(
          product_Id,
          { $push: { reviews: newReview._id } },
          { new: true }
        );
      
    res.status(201).json({
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Error in createReview:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// **---------------------**
// ** Delete Review **
// **---------------------**
const deleteReview = async (req, res) => {
    try {
        const { reviewid } = req.params;
        const review = await Review.findById(reviewid);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        const models = [Tours, Hotel, Booking, Bus, Flight, Train];
        await Promise.all(models.map(model => 
            model.updateMany(
                { reviews: reviewid },
                { $pull: { reviews: reviewid } }
            )
        ));
        await Review.findByIdAndDelete(reviewid);
        res.status(200).json({ message: 'Review deleted successfully from all models' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { allReview, createReview, deleteReview };
