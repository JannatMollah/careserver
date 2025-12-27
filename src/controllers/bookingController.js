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
        const bookings = await Booking.find({ user: req.user._id });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
// @desc    Cancel a booking
// @route   PATCH /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if user owns the booking
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        booking.status = 'Cancelled';
        await booking.save();

        res.json({ message: 'Booking Cancelled', booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user', 'name email');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    getBookings,
    cancelBooking,
};
