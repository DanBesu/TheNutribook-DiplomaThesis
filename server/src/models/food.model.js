const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    calories: { 
        type: Number, 
        required: true 
    },
    protein: { 
        type: Number, 
        required: true 
    },
    carbs: { 
        type: Number, 
        required: true 
    },
    fat: { 
        type: Number, 
        required: true 
    },
    timestamp: { 
        type: Number, 
        default: Date.now
    }
});

const FoodModel = mongoose.model('Food', foodSchema);

module.exports = FoodModel;
