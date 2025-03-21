const express = require('express');
const hotelController = require('../controllers/hotel.controller');
const {userMiddleware} = require('../middleware/user.middleware.js');
const { adminMiddleware } = require('../middleware/admin.middleware');
const upload = require('../middleware/multer.middleware');
const router = express.Router();

// const multer = require("multer");
// const {storage}= require('../cloudinary/cloudinary')
// const upload = multer({storage})

router.route('/hotels').get( hotelController.getHotels);         
router.route("/hotel/:id").get( hotelController.getHotelById);  

// router.route('/create-hotel').post(userMiddleware, upload.array('images', 5), hotelController.createHotel); 
// router.route("/update-hotel/:id").patch(userMiddleware,hotelController.updateHotel);    
// router.route("/delete/:id").delete( adminMiddleware,userMiddleware,hotelController.deleteHotel); 

module.exports = router;

