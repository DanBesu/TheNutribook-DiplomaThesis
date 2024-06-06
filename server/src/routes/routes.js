const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const loginRouter = require('./login.routes');
const weightRecordRouter = require('./weight-record.routes');

// // Add a root route
// router.get('/', (req, res) => {
//     res.send('Welcome to the API');
// });

router.use('/api/user', userRouter);
router.use('/api/login', loginRouter);
router.use('/api/weight-record', weightRecordRouter);

module.exports = router;
