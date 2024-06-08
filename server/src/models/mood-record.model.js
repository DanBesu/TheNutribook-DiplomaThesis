const mongoose = require('mongoose');

const moodRecordSchema = new mongoose.Schema({
    userName: { 
        type: String, 
        required: true 
    },
    moodLevel: { 
        type: Number, 
        required: true,
        min: 1,
        max: 5
    },
    timestamp: { 
        type: Number, 
        default: Date.now 
    }
});

const MoodRecordModel = mongoose.model('MoodRecord', moodRecordSchema);

module.exports = MoodRecordModel;
