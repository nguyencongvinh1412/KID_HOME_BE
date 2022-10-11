const centerStaffModel = require("../models/centerStaff.model");
const centreStaffModel = require("../models/centerStaff.model");

const centreStaffService = {
    createOne: async(data) => {
        try {
            const centreStaff = new centerStaffModel(data);
            return centreStaff.save();
        } catch (error) {
            return error;
        }
    }
}

module.exports = centreStaffService;