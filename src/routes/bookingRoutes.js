const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getBookings } = require('../controllers/bookingController');
// const { protect, admin } = require('../middleware/authMiddleware'); // Middleware needed

// Placeholder middleware until created
const protect = (req, res, next) => {
    // For now, pass through or fail. We need to implement authMiddleware.
    // Assuming authMiddleware will add req.user
    if (!req.user) {
        // return res.status(401).json({message: 'Not authorized'});
        // For dev speed before middleware implementation:
        // console.log("Warning: Auth middleware not fully linked yet");
    }
    next();
};

// Re-implementing correctly: I need to create authMiddleware first to make these routes work properly.
// But for file creation order, I'll reference it and create it next.

const { protect: authProtect } = require('../middleware/authMiddleware');

router.post('/', authProtect, createBooking);
router.get('/my-bookings', authProtect, getMyBookings);
router.get('/', authProtect, getBookings); // Add admin check later

module.exports = router;
