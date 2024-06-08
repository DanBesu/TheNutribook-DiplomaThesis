const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const loginRouter = require('./login.routes');
const weightRecordRouter = require('./weight-record.routes');
const foodRouter = require('./food.routes');
const moodRecordRouter = require('./mood-record.routes');

router.use('/api/user', userRouter);
router.use('/api/login', loginRouter);
router.use('/api/weight-record', weightRecordRouter);
router.use('/api/food', foodRouter);
router.use('/api/mood-record', moodRecordRouter);

module.exports = router;
