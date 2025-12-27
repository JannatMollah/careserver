const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
