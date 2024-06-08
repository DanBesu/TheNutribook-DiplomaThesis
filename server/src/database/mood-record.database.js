const MoodRecordModel = require('../models/mood-record.model');
const moment = require('moment');

/**
 * Create a new Mood Record.
 * @param {Object} data - The mood record data.
 * @returns {Promise<Object>} - The created mood record.
 */
const createMoodRecord = async (data) => {
    const moodRecord = new MoodRecordModel(data);
    return await moodRecord.save();
};

const getAll = async () => {
    return await MoodRecordModel.find({});
};

/**
 * Get all Mood Records by userName and date.
 * @param {String} userName - The user's name.
 * @param {Object} date - An object containing day, month, and year.
 * @returns {Promise<Array>} - The mood records.
 */
const getAllByUserNameAndDate = async (userName, date) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const startOfDay = moment(jsDate).startOf('day').valueOf();
    const endOfDay = moment(jsDate).endOf('day').valueOf();
    return await MoodRecordModel.find({
        userName,
        timestamp: { $gte: startOfDay, $lte: endOfDay }
    });
};

/**
 * Delete a Mood Record by ID.
 * @param {String} id - The mood record ID.
 * @returns {Promise<Object>} - The deleted mood record.
 */
const deleteMoodRecord = async (id) => {
    return await MoodRecordModel.findByIdAndDelete(id);
};

/**
 * Update a Mood Record by ID.
 * @param {String} id - The mood record ID.
 * @param {Object} data - The mood record data to update.
 * @returns {Promise<Object>} - The updated mood record.
 */
const updateMoodRecord = async (id, data) => {
    return await MoodRecordModel.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
    createMoodRecord,
    getAllByUserNameAndDate,
    deleteMoodRecord,
    updateMoodRecord,
    getAll
};
