const centreModel = require("../models/centre.model");

const centreService = {
    createOne: async (data) => {
        try {
            const centre = new centreModel(data);
            return centre.save();
        } catch (error) {
            return error;
        }
    }
}

module.exports = centreService;