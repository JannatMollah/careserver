const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    duration: {
        type: Number, // in hours
        required: true,
    },
    location: {
        division: { type: String, required: true },
        district: { type: String, required: true },
        city: { type: String, required: true },
        area: { type: String, required: true },
        address: { type: String, required: true },
    },
    totalCost: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
