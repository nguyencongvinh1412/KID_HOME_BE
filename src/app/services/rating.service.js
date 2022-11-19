const ratingModel = require("../models/rating.model");
const ObjectId = require("mongoose").Types.ObjectId;
const centreModel = require("../models/centre.model");
const lodash = require('lodash');

const ratingService = {
  addRating: async (data) => {
    try {
      let rating = new ratingModel(data);
      rating = await rating.save();
      const ratings = await ratingModel.find({centre: data.centre});
      let calRating = ratings.reduce((prev, rating) => prev + Number(rating.rating), 0);
      calRating = Math.round(calRating / ratings.length);
      const centre = await centreModel.updateOne({_id: data.centre}, {rating: calRating}, {new: true});
      return [rating, calRating];
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

  isUserRated: async (userId) => {
    try {
      const rating = await ratingModel.findOne({author: ObjectId(userId)});
      return !lodash.isNil(rating);

    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = ratingService;
