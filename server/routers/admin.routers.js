const express = require('express');
const adminController = require('../controllers/admin.controller');
const { createTour,deleteTour }=require('../controllers/tours.controller')
const hotelController = require('../controllers/hotel.controller');
const busController=require('../controllers/bus.controller')
const flightController = require('../controllers/flight.controller')
const { userMiddleware } = require('../middleware/user.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');
const upload = require("../middleware/multer.middleware");
const router = express.Router();

// Define the route with userMiddleware, adminMiddleware, and getAllUsers
router.route('/users').get(userMiddleware, adminMiddleware,adminController.getAllUsers);
router.route('/users/:id').get(userMiddleware,adminMiddleware,adminController.getSingleUserById)
router.route('/users/update/:id').patch(userMiddleware,adminMiddleware,adminController.updateUserData);
router.route('/users/delete/:id').delete(userMiddleware,adminMiddleware,adminController.deleteUserById)

// how many user booking  this router 
router.route('/users-bookings').get(userMiddleware,adminMiddleware,adminController.getUserBookings)

// Admin All post Flight
router.route('/create-flight').post(userMiddleware,adminMiddleware,upload.single('image'),flightController.createFlight)
router.route('/update-flight/:id').patch(adminMiddleware,flightController.updateFlight)
router.route('/delete/:id').delete(userMiddleware,adminMiddleware,flightController.deleteFlight)

// admin tours
router.route("/create-tour").post( upload.single('image'), createTour);
router.route('/create-tour/:id').delete(userMiddleware,deleteTour);

// Admin hotel
router.route('/create-hotel').post(userMiddleware, upload.single('image'), hotelController.createHotel); 
router.route("/update-hotel/:id").patch(userMiddleware,hotelController.updateHotel);    
router.route("/delete/:id").delete( adminMiddleware,userMiddleware,hotelController.deleteHotel); 

// Admin bus create
router.route('/create-bus').post(userMiddleware,upload.single('image'),busController.createBus)
router.route('/create-bus/:id').get(userMiddleware,busController.getBusById)
router.route('/create-bus/update/:id').patch(userMiddleware,busController.updateBus)
router.route('/delete/:id').delete(adminMiddleware,busController.deleteBus)

// Get Fligth,Bus,Hotel Tours admin router
router.route('/hotels').get(userMiddleware, adminMiddleware, adminController.getHotel);
router.route('/buses').get(userMiddleware, adminMiddleware,adminController.getBus);
router.route('/flights').get(userMiddleware, adminMiddleware,adminController.getFlight);
router.route('/tours').get(userMiddleware, adminMiddleware, adminController.getAllTours);

// total user get api 
router.route('/total-users').get(userMiddleware, adminMiddleware, adminController.getTotelUsers);
router.route('/total-hotels').get(userMiddleware, adminMiddleware, adminController.getTotelHotel);
router.route('/total-flights').get(userMiddleware, adminMiddleware, adminController.getTotalFlight);
router.route('/total-bus').get(userMiddleware, adminMiddleware, adminController.getTotelBus);
router.route('/total-trains').get(userMiddleware, adminMiddleware, adminController.getTotalTrein);
router.route('/total-tours').get(userMiddleware, adminMiddleware, adminController.getTotalTours);
router.route('/total-bookings').get(userMiddleware, adminMiddleware, adminController.getTotelBooking);

module.exports = router;