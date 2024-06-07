const jwt = require('jsonwebtoken');
const weightRecordService = require('../services/weight-record.service');

const create = async (req, res) => {
    try {
        const { userToken, weight } = req.body;
        
        const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const weightRecord = await weightRecordService.create(userId, weight);

        res.json({ status: 'success', data: weightRecord });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Create Weight Record Server Error' });
    }
};

const getAllByUser = async (req, res) => {
    try {
        const token = req.params.token;

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const weightRecords = await weightRecordService.getAllByUserId(userId);
        res.json({ status: 'success', data: weightRecords });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Get Weight Records Server Error' });
    }
};

const getLastByUser = async (req, res) => {
    try {
        const token = req.params.token;

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        
        const weightRecord = await weightRecordService.getLastByUserId(userId);
        res.json({ status: 'success', data: weightRecord });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Get Last Weight Record Server Error' });
    }
};

module.exports = {
    create,
    getAllByUser,
    getLastByUser,
};
