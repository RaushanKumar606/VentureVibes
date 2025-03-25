const express = require('express');
const { createUser, user,updateUser } = require('../controllers/user.controller'); 
const { validate } = require('../middleware/validate.middleware');
const { userValidationSchema } = require('../validators/user_validate');
const {userMiddleware} = require('../middleware/user.middleware.js');
const router = express.Router();

const upload = require("../middleware/multer.middleware");
router.route('/signup').post(upload.single('image'),createUser);  

router.route('/update').patch(userMiddleware,updateUser)
router.route('/user')
  .get(userMiddleware, user);  

module.exports = router;