const express = require('express');
const { getAllUsers,updateUserData,deleteUserById ,getSingleUserById} = require('../controllers/admin.controller');
const { userMiddleware } = require('../middleware/user.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');

const router = express.Router();

// Define the route with userMiddleware, adminMiddleware, and getAllUsers
router.route('/users').get(userMiddleware, adminMiddleware, getAllUsers);
router.route('/users/:id').get(userMiddleware,adminMiddleware,getSingleUserById)
router.route('/users/update/:id').patch(userMiddleware,adminMiddleware,updateUserData);
router.route('/users/delete/:id').delete(userMiddleware,adminMiddleware,deleteUserById)

module.exports = router;