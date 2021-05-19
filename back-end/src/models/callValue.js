const mongoose = require('../database');

const CallValueSchema = new mongoose.Schema({
    origin: {
        type: String,
        require: true
    },
    destiny: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('callvalues', CallValueSchema);