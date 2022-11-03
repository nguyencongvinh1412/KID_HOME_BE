const roleService = require('../services/role.service');

const roleController = {
    getAll: async (req, res) => {
        try {
            const roles = await roleService.getAll();
            return res.status(200).json({message: "Successfully", result: roles});
        } catch (error) {
            return res.status(400).json({ message: error.message, result: error });
        }
    }
}

module.exports = roleController;