const applicationModel = require("../models/application.model");
const applicationStateModel = require("../models/applicationState.model");
const accountModel = require("../models/account.model");
const blogModel = require("../models/blog.model");
const centreModel = require("../models/centre.model");
const insightHelper = require("../../helpers/insight.helper");
const ratingModel = require("../models/rating.model");

const insightService = {
    getTotalValue: async ({userId}) => {
        try {
            const centres = await centreModel.find({author: userId}).select("_id");
            const totalCentres = centres.length;
            const totalApplications = await applicationModel.find({centre: {$in: centres}}).count();
            const totalBlogs = await blogModel.find({centre: {$in: centres}}).count();

            return [totalCentres, totalApplications, totalBlogs];
        } catch (error) {
            throw new Error(error);
        }
    },

    getInsightApplications: async ({userId}) => {
        try {
            const centres = await centreModel.find({author: userId}).select("_id");
            const applications = await applicationModel.find({centre: {$in: centres}}).populate("state");
            const applicationState = await applicationStateModel.find();
            const insightApplication = insightHelper.groupByApplicationState(applications);
            return [insightApplication, applicationState];
        } catch (error) {
            throw new Error(error);
        }
    },

    getInsightCentres: async ({userId}) => {
        try {
            const centres = await centreModel.find({author: userId}).select("_id rating name").lean();
            for (const centre of centres) {
                const ratingCount = await ratingModel.find({centre: centre._id}).count();
                const blogCount = await blogModel.find({centre: centre._id}).count();
                centre.reviewCount = ratingCount;
                centre.blogCount = blogCount;
            }
            return centres;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = insightService;