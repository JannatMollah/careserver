const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.send('Care.xyz API is running');
});

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Database Connection Check
app.get('/api/db-check', async (req, res) => {
    const mongoose = require('mongoose');
    const status = mongoose.connection.readyState;
    // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    const statusText = {
        0: 'Disconnected',
        1: 'Connected',
        2: 'Connecting',
        3: 'Disconnecting'
    };

    try {
        res.status(200).json({
            connectionState: status,
            statusText: statusText[status] || 'Unknown',
            host: mongoose.connection.host
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
