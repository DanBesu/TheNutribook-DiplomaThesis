const FoodModel = require('../models/food.model');
const moment = require('moment');

const createFood = async (data) => {
    const { userId, name, quantity, calories, protein, carbs, fat } = data;

    const food = new FoodModel({
        userId,
        name,
        quantity,
        calories,
        protein,
        carbs,
        fat,
        timestamp: Date.now(),
    });

    await food.save();
    return food.toObject();
};

const getFoodByUserIdAndDate = async (userId, date) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const startOfDay = moment(jsDate).startOf('day').valueOf();
    const endOfDay = moment(jsDate).endOf('day').valueOf();

    return await FoodModel.find({
        userId,
        timestamp: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ timestamp: 1 }).lean().exec();
};

const deleteFoodById = async (id) => {
    return await FoodModel.findByIdAndDelete(id).lean().exec();
};

module.exports = {
    createFood,
    getFoodByUserIdAndDate,
    deleteFoodById,
};
