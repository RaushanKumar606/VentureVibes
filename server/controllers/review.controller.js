const Tours = require('../models/tour.model');
const Review = require('../models/reviews.model');

// **---------------------**
// ** GET All Reviews **
// **---------------------**
const allReview = async (req, res) => {
    try {
        const tours = await Tours.find().populate('reviews');
        if (!tours || tours.length === 0) {
            return res.status(404).json({ message: 'No tours found' });
        }
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// **---------------------**
// ** Create Review **
// **---------------------**
const createReview = async (req, res) => {
    try {
        const { reviews, rating } = req.body;
        if (!reviews || !rating ) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newReview = new Review({
            reviews,
            rating,
            author: req.user._id
        });
        await newReview.save()
        await Tours.findByIdAndUpdate( { $push: { reviews: newReview._id } });
        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// **---------------------**
// ** Delete Review **
// **---------------------**
const deleteReview = async (req, res) => {
    try {
        const { id, reviewid } = req.params;
        const tour = await Tours.findById(id);
        const review = await Review.findById(reviewid);
        if (!tour || !review) {
            return res.status(404).json({ message: 'Review or Tour not found' });
        }
        await Review.findByIdAndDelete(reviewid);
        await Tours.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = { allReview, createReview, deleteReview };
