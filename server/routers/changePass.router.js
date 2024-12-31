const express = require('express');
const {changePassword,saveUserPasswordResetEmail,userPasswordReset} =  require('../controllers/userPassworsChange.js')
const {userMiddleware} = require('../middleware/user.middleware.js');


const router = express.Router();
// Public Router 
router.route('/saveUserPasswordResetEmail').post(saveUserPasswordResetEmail)
router.route('/send-reset-password-email').post(saveUserPasswordResetEmail)
router.route('/reset-password/:id/:token').post(userPasswordReset)

// Private Router 
router.route('/changePassword').post(userMiddleware,changePassword)
module.exports = router;