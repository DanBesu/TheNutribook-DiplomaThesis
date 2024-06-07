const FoodDatabase = require('../database/food.database');

/**
 * Creates a new food entry.
 * @param {Object} data - The data for the new food entry.
 * @param {string} data.userName - The userName of the user.
 * @param {string} data.name - The name of the food item.
 * @param {number} data.quantity - The quantity of the food item.
 * @param {number} data.calories - The calories in the food item.
 * @param {number} data.protein - The protein content in the food item.
 * @param {number} data.carbs - The carbohydrate content in the food item.
 * @param {number} data.fat - The fat content in the food item.
 * @returns {Promise<Object>} The created food entry.
 */
const createFood = async (data) => {
    return await FoodDatabase.createFood(data);
};

/**
 * Retrieves food entries for a specific user on a specific date.
 * @param {string} userName - The name of the user.
 * @param {Object} date - The date object.
 * @param {number} date.day - The day of the date.
 * @param {number} date.month - The month of the date.
 * @param {number} date.year - The year of the date.
 * @returns {Promise<Array>} An array of food entries.
 */
const getFoodByUserNameAndDate = async (userName, date) => {
    console.log('userName, date: ', userName, date);

    return await FoodDatabase.getFoodByUserNameAndDate(userName, date);
};

/**
 * Deletes a food entry by its ID.
 * @param {string} id - The ID of the food entry.
 * @returns {Promise<Object>} The deleted food entry.
 */
const deleteFoodById = async (id) => {
    return await FoodDatabase.deleteFoodById(id);
};

module.exports = {
    createFood,
    getFoodByUserNameAndDate,
    deleteFoodById,
};
