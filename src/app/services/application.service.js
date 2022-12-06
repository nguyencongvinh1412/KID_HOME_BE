const applicationModel = require("../models/application.model");
const childrenModel = require("../models/child.model");
const applicationState = require("../models/applicationState.model");
const { options } = require("../../resources/routers/application.route");
const { isNil } = require("lodash");
const applicationHelper = require("../../helpers/application.helper");
const stateModel = require("../models/applicationState.model");

const applicationService = {
  apply: async (data) => {
    try {
      let child = new childrenModel(data);
      child = await child.save();
      const state = await applicationState.findOne({ name: "submit" });

      let application = new applicationModel({
        children: child._id,
        state,
        ...data,
      });
      return application.save();
    } catch (error) {
      throw new Error(error);
    }
  },

  getAllApplicationBelongUser: async ({
    userId,
    page = 1,
    limit = 5,
    filter = {},
  }) => {
    try {
      page = Number.parseInt(page);
      limit = Number.parseInt(limit);
      const skip = (page - 1) * limit;
      let query = applicationModel.find({ parent: userId });
      if (filter?.centreName) {
        const centreName = new RegExp(filter?.centreName, "i");
        query.populate({
          path: "centre",
          match: { name: centreName },
        });
      }

      if (filter?.centreFee) {
        query.populate({
          path: "centre",
          match: { fee: filter?.centreFee },
        });
      }

      if (!filter?.centreName && !filter?.centreFee) {
        query.populate("centre");
      }

      if (filter?.studentName) {
        const studentName = new RegExp(filter?.studentName, "i");
        query.populate({ path: "children", match: {name: studentName}, options: {}});
      } else {
        query.populate("children");
      }


      const queryApplications = query.clone();
      const applications = await queryApplications
        .populate("parent")
        .populate("state")
        .skip(skip)
        .limit(limit);
      const totalApplications = await query;
      const applicationsWithoutNull = applicationHelper.getApplicationsWithoutNull(applications);
      const totalWithoutNull = applicationHelper.getApplicationsWithoutNull(totalApplications);

      return [applicationsWithoutNull, totalWithoutNull.length];
    } catch (error) {
      throw new Error(error);
    }
  },

  changeState: async ({applicationId, state, userId}) => {
    try {
      const stateId = await stateModel.findOne({name: state}).select("_id");
      console.log(stateId);
      if (isNil(stateId)) {
        throw new Error(error);
      }

      await applicationModel.updateOne({_id: applicationId, parent: userId}, {state: stateId._id});
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = applicationService;
