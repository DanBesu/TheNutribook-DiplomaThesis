const express = require('express');
const router = express.Router();
const moodRecordController = require('../controllers/mood-record.controller');

router.post('/', moodRecordController.create);
router.get('/:userName/:day/:month/:year', moodRecordController.getAllByUserNameAndDate);
router.delete('/:id', moodRecordController.deleteById);
router.put('/:id', moodRecordController.updateById);

module.exports = router;
