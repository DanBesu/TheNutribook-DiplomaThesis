const express = require('express');
const foodController = require('../controllers/food.controller');

const foodRouter = express.Router();

foodRouter.post('', foodController.createFood);
foodRouter.get('/:userName/:day/:month/:year', foodController.getFoodByUserNameAndDate);
foodRouter.delete('/:id', foodController.deleteFoodById);
foodRouter.put('/:id', foodController.updateFoodById);
foodRouter.get('/', foodController.getAll);

module.exports = foodRouter;
