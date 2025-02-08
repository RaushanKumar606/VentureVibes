const express = require('express');
const { deleteTour,updateTour,getTourById,getAllTours,createTour }=require('../controllers/tours.controller')
const {userMiddleware} = require('../middleware/user.middleware.js');
const router = express.Router();

router.route('/tours').get(  getAllTours);
router.route('/tourUpdate').patch(updateTour);
router.route('/tourCreate').post(createTour);
router.route('/tourCreate').post(getTourById);
router.route('/tourCreate').delete(deleteTour);
module.exports = router;
