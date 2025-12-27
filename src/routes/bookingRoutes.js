const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getBookings, cancelBooking } = require('../controllers/bookingController');
const { protect: authProtect } = require('../middleware/authMiddleware');

router.post('/', authProtect, createBooking);
router.get('/my-bookings', authProtect, getMyBookings);
router.get('/', authProtect, getBookings); // Add admin check later
router.patch('/:id/cancel', authProtect, cancelBooking);

module.exports = router;
