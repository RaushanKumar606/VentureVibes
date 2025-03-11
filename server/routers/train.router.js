const express = require('express');
// const {getAllTrains,createTrain,getTrainById,updateTrain,deleteTrain}=require('../controllers/train.controller')
const trainController = require('../controllers/train.controller')
const router = express.Router();

router.route('/').get(trainController.getAllTrains)
router.route('/create-train').post(trainController.createTrain)
router.route('/create-train/:id').get(trainController.getTrainById)
router.route('/update-train/:id').patch(trainController.updateTrain)
router.route('/delete/:id').delete(trainController.deleteTrain)

module.exports = router;