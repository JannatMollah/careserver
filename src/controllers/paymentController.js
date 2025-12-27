const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');

// @desc    Create Payment Intent
// @route   POST /api/payment/create-payment-intent
// @access  Private
const createPaymentIntent = async (req, res) => {
    const { bookingId } = req.body;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: booking.totalCost * 100, // Stripe expects amount in cents
            currency: 'bdt',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                bookingId: booking._id.toString(),
                userEmail: req.user.email,
            }
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Booking Payment Status
// @route   POST /api/payment/confirm
// @access  Private
const confirmPayment = async (req, res) => {
    const { bookingId, transactionId } = req.body;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.paymentStatus = 'Paid';
        booking.status = 'Confirmed'; // Auto-confirm on payment?
        booking.transactionId = transactionId;
        await booking.save();

        res.json({ message: 'Payment Confirmed', booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPaymentIntent,
    confirmPayment
};
