const cityModel = require("../models/city.model");
const districtModel = require("../models/district.model");
const wardModel = require("../models/ward.model");

const addressService = {
    getAllCities: async () => {
        try {
            return cityModel.find({});
        } catch (error) {
            return error;
        }
    },
    getDistrictByCity: async (parentCode) => {
        try {
            return districtModel.find({parent_code: parentCode});
        } catch (error) {
            return error;
        }
    },
    getWardByDistrict: async (parentCode) => {
        try {
            return wardModel.find({parent_code: parentCode});
        } catch (error) {
            return error;
        }
    },

    getAllDistricts: async() => {
        try {
            return districtModel.find({});
        } catch (error) {
            return error;
        }
    },
    getAllWards: async () => {
        try {
            return wardModel.find({});
        } catch (error) {
            return error;
        }
    }
}

module.exports = addressService;