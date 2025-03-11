const express = require('express')
const {createReview,deleteReview,allReview} = require('../controllers/review.controller')
const {userMiddleware} = require('../middleware/user.middleware.js');
const router = express.Router()

router.route('/review').get(allReview);
router.route('/review').post(userMiddleware,createReview);
router.route('/review/:id/:reviewId').delete(deleteReview);
module.exports = router;