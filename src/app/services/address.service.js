const cityModel = require("../models/city.model");
const districtModel = require("../models/district.model");
const wardModel = require("../models/ward.model");

const addressService = {
    getAllCities: async () => {
        try {
            return cityModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getDistrictByCity: async (parentCode) => {
        try {
            return districtModel.find({city_code: parentCode});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getWardByDistrict: async (parentCode) => {
        try {
            return wardModel.find({district_code: parentCode});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getAllDistricts: async() => {
        try {
            return districtModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllWards: async () => {
        try {
            return wardModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getCityByCode: async (code) => {
        try {
            return cityModel.findOne({code: code});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getDistrictByCode: async (code) => {
        try {
            return districtModel.findOne({code: code});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getWardByCode: async (code) => {
        try {
            return wardModel.findOne({code: code});
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = addressService;