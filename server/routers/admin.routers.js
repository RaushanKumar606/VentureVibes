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

module.exports = router;