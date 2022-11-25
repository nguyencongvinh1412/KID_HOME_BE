const serviceTypeService = require("../services/serviceType.service");

const serviceTypeController = {
    addAllServiceType: async (req, res) => {
        try {
            const result = await serviceTypeService.addAll();
            return res.status(201).json({message: "Successfully", result: result});
        } catch (error) {
            return res.status(400).json({message: error.message, data: error});
        }
    },

    findAll: async (req, res) => {
        try {
            const services = await serviceTypeService.findAll();
            return res.status(200).json({message: "Successfully", result: services});
        } catch (error) {
            return res.status(400).json({message: error.message, data: error});
        }
    }
}

module.exports = serviceTypeController;