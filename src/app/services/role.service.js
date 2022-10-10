const roleModel = require("../models/role.model");

const RoleService = {
    createOne: async (data) => {
        try {
            const role = new roleModel(data);
            return role.save();
        } catch (error) {
            return error;
        }
    },

    findOne: async (options) => {
        try {
            return roleModel.findOne(options);
        } catch (error) {
            return error;
        }
    }
}

module.exports = RoleService;