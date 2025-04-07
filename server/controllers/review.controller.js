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
        const tourReviews = await Tours.find().populate("reviews");
        const hotelReviews = await Hotel.find().populate("reviews");
        const busReviews = await Bus.find().populate("reviews");
        const flightReviews = await Flight.find().populate("reviews");
        const trainReviews = await Train.find().populate("reviews");

        const allReviews = [
            ...tourReviews.map(tour => tour.reviews).flat(),
            ...hotelReviews.map(hotel => hotel.reviews).flat(),
            ...busReviews.map(bus => bus.reviews).flat(),
            ...flightReviews.map(flight => flight.reviews).flat(),
            ...trainReviews.map(train => train.reviews).flat()
        ];

        if (allReviews.length === 0) {
            return res.status(404).json({ message: "No reviews found" });
        }

        res.status(200).json(allReviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// **---------------------**
// ** Create Review **
// **---------------------**
const createReview = async (req, res) => {
    try {

        const { reviews, rating, modelType, produce_Id } = req.body;
        if (!reviews || !rating || !modelType || !produce_Id) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newReview = new Review({
            reviews,
            rating,
            author: req.user ? req.user._id : null,
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

        await Model.findByIdAndUpdate(produce_Id, { $push: { reviews: newReview._id } });

        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        console.error("Error in createReview:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
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
