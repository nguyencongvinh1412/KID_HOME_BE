const wardModel = require("../models/ward.model");
const addressService = require("../services/address.service");

const addressController = {
    getAllCities: async (req, res) => {
        try {
            const address = await addressService.getAllCities();
            return res.json({message: "Successfully", result: address});
        } catch (error) {
            return res.status(500).json({message: error.message, result: error});
        }
    },
    getDistrictByCity: async (req, res) => {
        try {
            const cityCode = req.query.code;
            if (!cityCode) {
                const districts = await addressService.getAllDistricts();
                return res.json({message: "Successfully", result: districts});    
            }
            const districts = await addressService.getDistrictByCity(cityCode);
            return res.json({message: "Successfully", result: districts});
        } catch (error) {
            return res.status(500).json({message: error.message, result: error});
        }
    },
    getWardByDistrict: async(req, res) => {
        try {
            const districtCode = req.query.code;
            if (!districtCode) {
                const wards = await addressService.getAllWards();
                return res.json({message: "Successfully", result: wards});
            }
            const wards = await addressService.getWardByDistrict(districtCode);
            return res.json({message: "Successfully", result: wards});
        } catch (error) {
            return res.status(500).json({message: error.message, result: error});
        }
    }
}

module.exports = addressController;