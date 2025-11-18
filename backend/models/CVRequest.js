const mongoose = require('mongoose');

const CVRequestSchema = new mongoose.Schema({
    email: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CVRequest', CVRequestSchema);