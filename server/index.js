require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require('path');

// this is  user router 
const userRouter = require('./routers/user.router'); 
const loginRouter =require('./routers/login.router')
// const userData =  require('./routers/user.router');
// const userUpdate = require('./routers/user.router')
const changePassword =require('./routers/changePass.router')
// const emailSendPass=require('./routers/changePass.router')
// const userPassReset =require('./routers/changePass.router')
// const getUserBookings = require('./routers/booking.router')
// Admin Router 
const adminRouter = require('./routers/admin.routers')

// const getHotel = require('./routers/admin.routers')
// const getFlight= require('./routers/admin.routers')
// const getBus = require('./routers/admin.routers')
// const getTour = require('./routers/admin.routers')
//  Tours Router
const Tours = require('./routers/tours.router')
const connectDB = require('./dataBase/db');
// const createTour  = require('./routers/tours.router');
// const updateTour  = require('./routers/tours.router');
// const deleteTour  = require('./routers/tours.router');
// Flight Router
const Flight = require('./routers/flight.router');
// const FlightById=require('./routers/flight.router')
// Hotel Router
const Hotel = require('./routers/hotel.router');
// const HotelById = require('./routers/hotel.router')
// Bus Router
const Bus = require('./routers/bus.router');
// const BusById = require('./routers/bus.router')
// Train Router
const Train = require('./routers/train.router');
// const TrainById = require('./routers/train.router')

// Bookiing roouter 
const bookingRoutes =require( "./routers/booking.router");

require('dotenv').config();

const corsOption = 
{ 
  origin: "http://localhost:5173",
   methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true 
  };

// Middleware to parse JSON data
app.use(cors(corsOption))
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Admin routers
app.use('/api/admin',adminRouter)
// app.use('/api/admin',getHotel) 
// app.use('/api/admin',getFlight) 
// app.use('/api/admin',getTour) 
// app.use('/api/admin',getBus) 

// Define a simple route
app.use('/api', userRouter);
app.use('/api', loginRouter);
// app.use('/api',userData)
// app.use('/api',userUpdate)
app.use('/api',changePassword)
// app.use('/api',emailSendPass)
// app.use('/api',userPassReset)
  // Tours
app.use('/api',Tours)
// app.use('/api',deleteTour)
// app.use('/api',updateTour)
// app.use('/api',createTour)

// Flight
app.use('/api',Flight)
// app.use('/api',FlightById)

// Hotel
app.use('/api',Hotel)
// app.use('/api',HotelById)

// BUS
app.use('/api',Bus)
// app.use('/api',BusById)
// TRAIN
app.use('/api',Train)
// app.use('/api',TrainById)
// Booking
app.use("/api/bookings", bookingRoutes);

const PORT1 = process.env.PORT || 5000;

// Start the server
app.listen(PORT1, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT1}`);
});
