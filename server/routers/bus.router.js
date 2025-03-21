const express = require('express');
// const {getAllBuses,createBus,getBusById,updateBus,deleteBus}=require('../controllers/bus.controller')
const busController=require('../controllers/bus.controller')
const {userMiddleware} = require('../middleware/user.middleware.js');
const { adminMiddleware } = require('../middleware/admin.middleware');
const router = express.Router();

router.route('/bus').get(busController.getAllBuses)
router.route('/create-bus').post(userMiddleware,busController.createBus)
router.route('/bus/:id').get(busController.getBusById)
// router.route('/update-bus/:id').patch(userMiddleware,busController.updateBus)
// router.route('/delete/:id').delete(adminMiddleware,busController.deleteBus)
    
    module.exports = router;