const dateFns = require("date-fns");
const lodash = require("lodash");

const centreHelper = {
  calculateDurationOpen: (centre) => {
    const dateDefault = "01/01/1999";
    const startTime = new Date(`${dateDefault} ${centre.openHours.startTime}`);
    const endTime = new Date(`${dateDefault} ${centre.openHours.endTime}`);
    const durationOpen = dateFns.differenceInHours(endTime, startTime);
    return durationOpen;
  },

  distinctRatingHistory: (ratingHistory) => {
    let ratings = [];
    ratingHistory.forEach((ratingHistory) => {
      const item = ratings.find(
        (rating) =>
          ratingHistory.author._id === rating.author._id &&
          ratingHistory.centre._id === rating.centre._id
      );
      if (lodash.isNil(item)) {
        ratings.push(ratingHistory._doc);
      }
    });

    return ratings;
  },

  formatCentres: (centres) => {
    let centresFormat = [];
    centres.forEach((centre) => {
      const centreFormat = [
        centre._id.valueOf(),
        centre.fee,
        centre.yearEstablished,
        centreHelper.calculateDurationOpen(centre),
        centre.rating,
      ];
      centresFormat.push(centreFormat);
    });

    return centresFormat;
  },

  formatRatingHistory: (ratingsHistory) => {
    let ratingsFormat = [];
    ratingsHistory.forEach((ratingHistory) => {
      const ratingFormat = [
        ratingHistory.author._id.valueOf(),
        ratingHistory.centre._id.valueOf(),
        ratingHistory.rating,
      ];

      ratingsFormat.push(ratingFormat);
    });

    return ratingsFormat;
  },

  convertRatingPredToNumber: (centresRecommend) => {
    return centresRecommend.map((centre) => {
      const rating = Number.parseFloat(centre[centre.length - 1]);
      centre[centre.length - 1] = rating;
      return centre;
    });
  },

  sortRatingDesc: (centresRecommend) => {
    return lodash.sortBy(centresRecommend, (centre) => centre[centre.length - 1]);
  },

  getNumberCentresRecommend: (centres, number) => {
    let centreIds = [];
    centres = centreHelper.convertRatingPredToNumber(centres);
    centres = centreHelper.sortRatingDesc(centres);
    centres = lodash.slice(centres, 0, number);
    for (const centre of centres) {
        centreIds.push(centre[0]);
    }

    return centreIds;
  },
};

module.exports = centreHelper;
