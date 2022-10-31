const cloudinaryService = require('../services/cloudinary.service');

const cloudinaryController = {
    upload: (req, res) => {
        try {
            const image = cloudinaryService.upload(req.body.centreInfo.centreImage);
            return res.json(req.body);
        } catch (error) {
            return res.status(500).json({message: error.message, result: error});
        }
    }
}

module.exports = cloudinaryController;