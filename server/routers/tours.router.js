const express = require('express');
const { deleteTour,updateTour,getTourById,getAllTours,createTour }=require('../controllers/tours.controller')
const {userMiddleware} = require('../middleware/user.middleware.js');
// const { toursSchemaValidation } = require('../validators/tour.validate.js');

const multer = require("multer");
const {storage}= require('../cloudinary/cloudinary')
const upload = multer({storage})


const router = express.Router();
router.route('/tours').get(  getAllTours);
router.route('/tours/:id').get(getTourById);

// router.route("/tours").post( upload.array('images', 5),userMiddleware, createTour);

router.route('/tours/update/:id').patch(userMiddleware,updateTour);
// router.route('/tours/:id').delete(userMiddleware,deleteTour);
module.exports = router;
