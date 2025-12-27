const express = require('express');
const router = express.Router();
const { getServices, getServiceById, createService } = require('../controllers/serviceController');

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', createService);

module.exports = router;
