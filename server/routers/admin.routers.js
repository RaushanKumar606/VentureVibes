const express = require('express');
const { getAllUsers } = require('../controllers/admin.controller');
const { userMiddleware } = require('../middleware/user.middleware');
const { adminMiddleware } = require('../middleware/admin.middleware');

const router = express.Router();

// Define the route with userMiddleware, adminMiddleware, and getAllUsers
router.route('/users').get(userMiddleware, adminMiddleware, getAllUsers);

module.exports = router;