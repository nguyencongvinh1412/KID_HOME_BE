const serviceTypeModel = require("../models/serviceType.model");

const serviceTypeService = {
    findAll: async () => {
        try {
            const services = await serviceTypeModel.find({});
            return services;
        } catch (error) {
            return error;
        }
    },

    addAll: async () => {
        try {
            const services = [
                new serviceTypeModel({name: 'Anh văn'}),
                new serviceTypeModel({name: 'Hội họa'}),
                new serviceTypeModel({name: 'Aerobic'}),
                new serviceTypeModel({name: 'Lớp cơm nát (13 - 24 tháng)'}),
                new serviceTypeModel({name: 'Lớp mầm (3 - 4 tuổi)'}),
                new serviceTypeModel({name: 'Lớp chồi (4 - 5 tuổi)'}),
                new serviceTypeModel({name: 'Lớp lá (5 - 6 tuổi)'}),
            ];

            return serviceTypeModel.bulkSave(services);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = serviceTypeService;