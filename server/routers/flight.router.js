const express = require('express');
const flightController = require('../controllers/flight.controller')
const {userMiddleware} = require('../middleware/user.middleware.js');
const { adminMiddleware } = require('../middleware/admin.middleware');
const router = express.Router();
// const {getAllFlights,createFlight,getFlightById,updateFlight,deleteFlight}=require('../controllers/flight.controller')
const multer = require("multer");
const {storage}= require('../cloudinary/cloudinary')
const upload = multer({storage})

router.route('/').get(flightController.getAllFlights)
router.route('/create-flight').post( userMiddleware,upload.array('images', 2),flightController.createFlight)
router.route('/create-flight/:id').get(flightController.getFlightById)
router.route('/update-flight/:id').patch(adminMiddleware,flightController.updateFlight)
router.route('/delete/:id').delete(userMiddleware,adminMiddleware,flightController.deleteFlight)

module.exports = router;