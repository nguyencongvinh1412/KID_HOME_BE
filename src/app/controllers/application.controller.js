const applicationService = require("../services/application.service");
const queryString = require('query-string');
const { STATE } = require("../../constants/applicationState.constant");

const applicationController = {
  apply: async (req, res) => {
    try {
      const data = req.body;
      const application = await applicationService.apply(data);
      return res
        .status(201)
        .json({ message: "Successfully", result: application });
    } catch (error) {
      return res.status(500).json({ message: error.message, data: error });
    }
  },

  getAllBelongUser: async (req, res) => {
    try {
      const userId = req.user._id;
      let { filter, page = 1, limit = 5 } = req.query;
      if (filter) {
          filter = queryString.parseUrl(filter);
          filter = JSON.parse(filter.url);
      }
      const [applications, total] =
        await applicationService.getAllApplicationBelongUser({
          userId,
          filter,
          page,
          limit,
        });
      return res.status(200).json({
        message: "Successfully",
        result: { applications, paging: { total, page, limit } },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, data: error });
    }
  },

  changeState: async (req, res) => {
    try {
      const {applicationId} = req.query;
      const userId = req.user._id;
      await applicationService.changeState({applicationId, userId, state: STATE.CANCEL});
      return res.status(200).json({message: "Successfully", result: {}});
    } catch (error) {
      return res.status(400).json({ message: error.message, data: error });
    }
  }
};

module.exports = applicationController;
