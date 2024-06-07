const express = require('express');
const foodController = require('../controllers/food.controller');

const foodRouter = express.Router();

foodRouter.post('', foodController.createFood);

foodRouter.get('', foodController.getFoodByUserAndDate);

foodRouter.delete('/:id', foodController.deleteFoodById);

module.exports = foodRouter;
