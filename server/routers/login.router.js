const express = require('express');
const { loginUser } = require('../controllers/user.controller.login'); 
const {validate}=require('../middleware/validate.middleware');
const {loginValidationSchema}= require('../validators/login.validate')

const router = express.Router();



// Route to create a new user
router.post('/login',validate(loginValidationSchema),loginUser);

module.exports = router;
