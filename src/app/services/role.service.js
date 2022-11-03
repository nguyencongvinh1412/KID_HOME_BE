const roleModel = require("../models/role.model");

const RoleService = {
    createOne: async (data) => {
        try {
            const role = new roleModel(data);
            return role.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    findOne: async (options) => {
        try {
            return roleModel.findOne(options);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAll: async () => {
        try {
            return roleModel.find({name: {$ne: 'superadmin'}});
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = RoleService;