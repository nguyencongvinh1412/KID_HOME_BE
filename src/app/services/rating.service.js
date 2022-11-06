const ratingModel = require("../models/rating.model");
const ObjectId = require("mongoose").Types.ObjectId;

const ratingService = {
  addRating: async (data) => {
    try {
      const rating = new ratingModel(data);
      return rating.save();
    } catch (error) {
      throw new Error(error);
    }
  },

  getAllRatingBelongCentre: async (centreId) => {
    try {
      const ratings = await ratingModel
        .find({ centre: ObjectId(centreId) })
        .populate("author");
        
      return ratings;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = ratingService;
