const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', require('../middleware/authMiddleware').protect, require('../controllers/authController').updateUserProfile);

module.exports = router;
