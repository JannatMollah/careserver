const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    service: {
        type: String, // Storing service ID/Slug from client (e.g., 'baby-care')
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
    paymentStatus: {
        type: String,
        default: 'Pending', // Pending, Paid, Failed
    },
    transactionId: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
