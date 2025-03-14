const express = require('express');
const adminController = require('../controllers/admin.controller');
// const { getAllUsers,updateUserData,deleteUserById ,getSingleUserById,getHotel} = require('../controllers/admin.controller');
const { userMiddleware } = require('../middleware/user.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');

const router = express.Router();

// Define the route with userMiddleware, adminMiddleware, and getAllUsers
router.route('/users').get(userMiddleware, adminMiddleware,adminController.getAllUsers);
router.route('/users/:id').get(userMiddleware,adminMiddleware,adminController.getSingleUserById)
router.route('/users/update/:id').patch(userMiddleware,adminMiddleware,adminController.updateUserData);
router.route('/users/delete/:id').delete(userMiddleware,adminMiddleware,adminController.deleteUserById)

//  Fligth,Bus,Hotel Tours admin router
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