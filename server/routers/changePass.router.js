const express = require('express');
const {changePassword,forgetPassword,userPasswordReset, resetPassword} =  require('../controllers/userPassworsChange.js')
const {userMiddleware} = require('../middleware/user.middleware.js');


const router = express.Router();
// Public Router 
router.route('/forget-password').post(forgetPassword)
router.route('/reset-password/:token').post(resetPassword)
router.route('/reset-password/:id/:token').post(userPasswordReset)
// Private Router 
router.route('/changePassword').post(userMiddleware,changePassword)
module.exports = router;