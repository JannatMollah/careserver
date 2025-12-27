const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Public (should be Admin)
const createService = async (req, res) => {
    const { name, slug, description, image, pricePerHour } = req.body;

    try {
        const service = new Service({
            name,
            slug,
            description,
            image,
            pricePerHour,
        });

        const createdService = await service.save();
        res.status(201).json(createdService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getServices,
    getServiceById,
    createService,
};
