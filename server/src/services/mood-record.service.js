const MoodRecordDatabase = require('../database/mood-record.database');

const create = async (data) => {
    return await MoodRecordDatabase.createMoodRecord(data);
};

const getAllByUserNameAndDate = async (userName, date) => {
    return await MoodRecordDatabase.getAllByUserNameAndDate(userName, date);
};

const deleteById = async (id) => {
    return await MoodRecordDatabase.deleteMoodRecord(id);
};

const updateById = async (id, data) => {
    return await MoodRecordDatabase.updateMoodRecord(id, data);
};

const getAll = async () => {
    return await MoodRecordDatabase.getAll();
};

module.exports = {
    create,
    getAllByUserNameAndDate,
    deleteById,
    updateById,
    getAll
};
