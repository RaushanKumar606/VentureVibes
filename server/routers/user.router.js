const express = require('express');
const { createUser, user } = require('../controllers/user.controller'); 
const { validate } = require('../middleware/validate.middleware');
const { userValidationSchema } = require('../validators/user_validate');
const {userMiddleware} = require('../middleware/user.middleware.js');

const router = express.Router();

router.route('/signup')
  .post(validate(userValidationSchema), createUser);  

router.route('/user')
  .get(userMiddleware, user);  

module.exports = router;
