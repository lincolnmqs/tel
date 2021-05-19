const mongoose = require('../database');

const FlatSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    time: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Flat', FlatSchema);