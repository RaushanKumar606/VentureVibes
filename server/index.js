const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/user.router'); 
const loginRouter =require('./routers/login.router')
const userData =  require('./routers/user.router');
const changePassword =require('./routers/changePass.router')
const emailSendPass=require('./routers/changePass.router')
const userPassReset =require('./routers/changePass.router')
const adminRouter = require('./routers/admin.routers')
const connectDB = require('./dataBase/db');

require('dotenv').config();

const corsOption = { 
  origin: "http://localhost:5173",
   methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true };



// Middleware to parse JSON data
app.use(cors(corsOption))
app.use(express.json());
app.use(bodyParser.json());


// Admin routers
app.use('/api/admin',adminRouter)

// Define a simple route
app.use('/api', userRouter);
app.use('/api', loginRouter);
app.use('/api',userData)
app.use('/api',changePassword)
app.use('/api',emailSendPass)
app.use('/api',userPassReset)



const PORT1 = process.env.PORT || 5000;

// Start the server
app.listen(PORT1, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT1}`);
});
