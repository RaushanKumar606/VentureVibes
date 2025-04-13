const express =require("express");
const bookings =require("../controllers/booking.controller");
const {userMiddleware} = require('../middleware/user.middleware.js');

const router = express.Router();
router.route("/create").post(userMiddleware,bookings.createBooking);
router.route("/users/:userId").get( userMiddleware,bookings.getUserBooks);
router.route("/cancel/:id").delete(userMiddleware, bookings.cancelBooking);
router.route("/paymentStatus").put(userMiddleware, bookings.updatePaymentStatus);
router.route("/create-payment-intent").post(userMiddleware,bookings.createPaymentIntent);
router.route('/send-whatsapp').post(userMiddleware, bookings.sendWhatSms);




module.exports=router;
