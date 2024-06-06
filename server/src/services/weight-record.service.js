const WeightRecordDatabase = require('../database/weight-record.database');

const create = async (userId, weight) => {
    return await WeightRecordDatabase.create(userId, weight);
}

const getAllByUserId = async (userId) => {
    return await WeightRecordDatabase.getAllByUserId(userId);
}

const getLastByUserId = async (userId) => {
    return await WeightRecordDatabase.getLastByUserId(userId);
}

module.exports = {
    create,
    getAllByUserId,
    getLastByUserId,
};
