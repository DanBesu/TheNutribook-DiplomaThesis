const moodRecordService = require('../services/mood-record.service');

const create = async (req, res) => {
    try {
        const moodRecord = await moodRecordService.create(req.body);
        res.json({ status: 'success', data: moodRecord });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: `Create MoodRecord Server error: ${error.message}` });
    }
};

const getAllByUserNameAndDate = async (req, res) => {
    try {
        const { userName, day, month, year } = req.params;
        const moodRecords = await moodRecordService.getAllByUserNameAndDate(userName, { day, month, year });
        res.json({ status: 'success', data: moodRecords });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: `Get MoodRecords Server error: ${error.message}` });
    }
};

const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        await moodRecordService.deleteById(id);
        res.json({ status: 'success', message: 'MoodRecord deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: `Delete MoodRecord Server error: ${error.message}` });
    }
};

const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const moodRecord = await moodRecordService.updateById(id, req.body);
        res.json({ status: 'success', data: moodRecord });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: `Update MoodRecord Server error: ${error.message}` });
    }
};

const getAll = async (req, res) => {
    try {
        const moodRecords = await moodRecordService.getAll();
        res.json({ status: 'success', data: moodRecords });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: `Get Mood Records Server error: ${error.message}` });
    }
};

module.exports = {
    create,
    getAllByUserNameAndDate,
    deleteById,
    updateById,
    getAll
};
