const foodService = require('../services/food.service');

const createFood = async (req, res) => {
    try {
        const { userName, name, quantity, calories, protein, carbs, fat } = req.body;

        const foodData = { userName, name, quantity, calories, protein, carbs, fat };
        const food = await foodService.createFood(foodData);

        res.json({ status: 'success', data: food });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Create Food Server Error' });
    }
};

const getFoodByUserNameAndDate = async (req, res) => {
    try {
        const { userName, day, month, year } = req.params;
        console.log('userName, day, month, year: ', userName, day, month, year);

        const date = { day: parseInt(day), month: parseInt(month), year: parseInt(year) };
        const foodRecords = await foodService.getFoodByUserNameAndDate(userName, date);
        res.json({ status: 'success', data: foodRecords });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Get Food Records Server Error' });
    }
};

const deleteFoodById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFood = await foodService.deleteFoodById(id);
        res.json({ status: 'success', data: deletedFood });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Delete Food Record Server Error' });
    }
};

module.exports = {
    createFood,
    getFoodByUserNameAndDate,
    deleteFoodById,
};
