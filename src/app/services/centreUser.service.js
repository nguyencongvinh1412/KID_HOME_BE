const centreUserModel = require("../models/centreUser.model");

const centreUserService = {
    createOne: async (data) => {
        try {
            const centreUser = new centreUserModel(data);
            return centreUser.save();
        } catch (error) {
            return error;
        }
    }
}

module.exports = centreUserService;