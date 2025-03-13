const express =require("express");
const bookings =require("../controllers/booking.controller");
const {userMiddleware} = require('../middleware/user.middleware.js');

const router = express.Router();
router.post("/create", userMiddleware,bookings.createBooking);
router.get("/user/:userId", userMiddleware,bookings.getUserBookings);
router.delete("/cancel/:id",userMiddleware, bookings.cancelBooking);
router.put("/paymentStatus",userMiddleware, bookings.updatePaymentStatus);

module.exports=router;
