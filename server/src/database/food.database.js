const FoodModel = require('../models/food.model');
const moment = require('moment');

const createFood = async (data) => {
    const { userName, name, quantity, calories, protein, carbs, fat } = data;

    const food = new FoodModel({
        userName,
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

const getFoodByUserNameAndDate = async (userName, date) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const startOfDay = moment(jsDate).startOf('day').valueOf();
    const endOfDay = moment(jsDate).endOf('day').valueOf();

    return await FoodModel.find({
        userName,
        timestamp: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ timestamp: 1 }).lean().exec();
};

const deleteFoodById = async (id) => {
    return await FoodModel.findByIdAndDelete(id).lean().exec();
};

const updateFoodById = async (id, data) => {
    const { name, quantity, calories, protein, carbs, fat } = data;

    return await FoodModel.findByIdAndUpdate(id, {
        name,
        quantity,
        calories,
        protein,
        carbs,
        fat,
    }, { new: true }).lean().exec();
};

module.exports = {
    createFood,
    getFoodByUserNameAndDate,
    deleteFoodById,
    updateFoodById,
};
