const weightRecordService = require('../services/weight-record.service');

const create = async (req, res) => {
    try {
        const { userId, weight } = req.body;
        const weightRecord = await weightRecordService.create(userId, weight);
        res.json({ status: 'success', data: weightRecord });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Create Weight Record Server Error' });
    }
};

const getAllByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const weightRecords = await weightRecordService.getAllByUserId(userId);
        res.json({ status: 'success', data: weightRecords });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Get Weight Records Server Error' });
    }
};

const getLastByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const weightRecord = await weightRecordService.getLastByUserId(userId);
        res.json({ status: 'success', data: weightRecord });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Get Last Weight Record Server Error' });
    }
};

module.exports = {
    create,
    getAllByUserId,
    getLastByUserId,
};
