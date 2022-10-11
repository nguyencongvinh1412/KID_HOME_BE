const parentModel = require("../models/parent.model");

const parentService = {
    createOne: async (data) => {
        try {
            const parent = new parentModel(data);
            return parent.save();
        } catch (error) {
            return error;
        }
    }
}
module.exports = parentService; 