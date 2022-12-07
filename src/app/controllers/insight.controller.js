const insightService = require("../services/insight.service");

const insightController = {
    getTotalValue: async (req, res) => {
        try {
            const userId = req.user._id;
            const [totalCentres, totalApplications, totalBlogs] = await insightService.getTotalValue({userId});
            return res.status(200).json({message: "Successfully", result: {totalCentres, totalApplications, totalBlogs}});
        } catch (error) {
            return res.status(400).json({ message: error.message, data: error });
        }
    },

    getInsightApplications: async (req, res) => {
        try {
            const userId = req.user._id;
            const [applications, state] = await insightService.getInsightApplications({userId});
            return res.status(200).json({message: "Successfully", result: {applications, state}});
        } catch (error) {
            return res.status(400).json({ message: error.message, data: error });
        }
    },

    getInsightCentre: async (req, res) => {
        try {
            const userId = req.user._id;
            const centres = await insightService.getInsightCentres({userId});
            return res.status(200).json({message: "Successfully", result: centres});
        } catch (error) {
            return res.status(400).json({ message: error.message, data: error });
        }
    }
}

module.exports = insightController;