const express = require('express');
const weightRecordController = require('../controllers/weight-record.controller');

const weightRecordRouter = express.Router();

weightRecordRouter.post('', weightRecordController.create);

weightRecordRouter.get('/all/:token', weightRecordController.getAllByUser);

weightRecordRouter.get('/last/:token', weightRecordController.getLastByUser);

module.exports = weightRecordRouter;
