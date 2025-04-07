require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require('path');

// this is  user router 
const userRouter = require('./routers/user.router'); 
const loginRouter =require('./routers/login.router')
const changePassword =require('./routers/changePass.router')
const review = require("./routers/review.router")
const adminRouter = require('./routers/admin.routers')
const Tours = require('./routers/tours.router')
const connectDB = require('./dataBase/db');
const Flight = require('./routers/flight.router');
const Hotel = require('./routers/hotel.router');
const Bus = require('./routers/bus.router');
const Train = require('./routers/train.router');
const bookingRoutes =require( "./routers/booking.router");
// const  Chatbot = require('./routers/chatbot');

require('dotenv').config();

const corsOption = 
{ 
  origin: ["https://stately-sfogliatella-0dd300.netlify.app",
    "http://localhost:5173"
   ],   methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true 
  };

// Middleware to parse JSON data
app.use(cors(corsOption))
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/admin',adminRouter)
app.use('/api', userRouter);
app.use('/api', loginRouter);
app.use('/api',changePassword)
app.use('/api',Tours)
app.use('/api',Flight)
app.use('/api',Hotel)

app.use('/api',Bus)
app.use('/api',Train)
app.use("/api/bookings", bookingRoutes);
app.use('/api',review)
// app.use('/api',Chatbot)
 app.get('/',(req,res)=>{
  res.send({
    activeStatus:true,
    error:false,
  })
 })

const PORT1 = process.env.PORT || 5000;

// Start the server
app.listen(PORT1, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT1}`);
});
