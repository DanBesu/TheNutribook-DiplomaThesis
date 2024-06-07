const express = require('express');

const weightRecordRouter = express.Router();

const weightRecordController = require('../controllers/weight-record.controller');

weightRecordRouter.post('', weightRecordController.create);

weightRecordRouter.get('/all/:token', weightRecordController.getAllByUser);

weightRecordRouter.get('/last/:token', weightRecordController.getLastByUser);

module.exports = weightRecordRouter;
