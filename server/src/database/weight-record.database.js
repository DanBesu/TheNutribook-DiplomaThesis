const WeightRecordModel = require('../models/weight-record.model');

const create = async (userId, weight) => {
    const weightRecord = new WeightRecordModel({
        userId,
        weight,
    });

    await weightRecord.save();
    return weightRecord.toObject();
};

const getAllByUserId = async (userId) => {
    return await WeightRecordModel.find({ userId }).sort({ date: 1 }).lean().exec();
};

const getLastByUserId = async (userId) => {
    return await WeightRecordModel.findOne({ userId }).sort({ date: -1 }).lean().exec();
};

module.exports = {
    create,
    getAllByUserId,
    getLastByUserId,
};
