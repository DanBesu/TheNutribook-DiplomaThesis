const express = require('express');

const weightRecordRouter = express.Router();

const weightRecordController = require('../controllers/weight-record.controller');

weightRecordRouter.post('', weightRecordController.create);

weightRecordRouter.get('/:userId', weightRecordController.getAllByUserId);

weightRecordRouter.get('/:userId', weightRecordController.getLastByUserId);

module.exports = weightRecordRouter;
