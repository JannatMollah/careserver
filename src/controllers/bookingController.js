const Booking = require('../models/Booking');

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    const { service, duration, location, totalCost } = req.body;

    try {
        const booking = new Booking({
            user: req.user._id,
            service,
            duration,
            location,
            totalCost,
        });

        const createdBooking = await booking.save();

        // Mock Email Notification
        console.log(`[Email Service] Sending invoice to user ${req.user.email} for booking ${createdBooking._id}... Sent!`);

        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('service', 'name image');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user', 'name email').populate('service', 'name');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    getBookings,
};
