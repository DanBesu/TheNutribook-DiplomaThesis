const mongoose = require('mongoose');

const weightRecordSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    weight: { 
        type: Number, 
        required: true 
    },
    date: { 
        type: Number,
        default: Date.now
    }
});

const WeightRecordModel = mongoose.model('WeightRecord', weightRecordSchema);

module.exports = WeightRecordModel;
