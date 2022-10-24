const imageModel = require("../models/image.model");

const imageService = {
    addOneImageToCentre: async (data) => {
        try {
            const image = new imageModel(data);
            return image.save();
        } catch (error) {
            return error;
        }
    },
    addMultiImagesToCentre: async (data) => {
        try {
            if (Array.isArray(data)) {
                return imageModel.create(data);
            }
        } catch (error) {
            return errr;
        }
    }
}

module.exports = imageService;