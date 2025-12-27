const express = require('express');
const router = express.Router();
const { createPaymentIntent, confirmPayment } = require('../controllers/paymentController');
const { protect: authProtect } = require('../middleware/authMiddleware');

router.post('/create-payment-intent', authProtect, createPaymentIntent);
router.post('/confirm', authProtect, confirmPayment);

module.exports = router;
