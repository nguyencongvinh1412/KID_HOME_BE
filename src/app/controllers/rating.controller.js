const ratingService = require("../services/rating.service");

const ratingController = {
    addRating: async (req, res) => {
        try {
            const userId = req.user._id;
            const ratingObject = {
                ...req.body,
                author: userId
            }
            const [ratingDoc, rating] = await ratingService.addRating(ratingObject);
            return res.status(201).json({message: "Successfully", result: {rating}});
        } catch (error) {
            return res.status(400).json({message: error.message, data: error});
        }
    },

    getAllRatingBelongCentre: async (req, res) => {
        try {
            const centreId = req.query.centreId;
            const ratings = await ratingService.getAllRatingBelongCentre(centreId);
            return res.status(200).json({message: "Successfully", result: {ratings}});
        } catch (error) {
            return res.status(400).json({message: error.message, data: error});
        }
    }
}

module.exports = ratingController;