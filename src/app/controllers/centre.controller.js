const centreService = require("../services/centre.service");

const centreController = {
  deleteMany: async (req, res) => {
    try {
      const filter = req.query.filter;
      const deletedCount = await centreService.deleteMany(filter);
      return res
        .status(201)
        .json({ message: "Successfully", result: deletedCount });
    } catch (error) {
      return res.status(500).json({ message: error.message, result: error });
    }
  },
  createManyFromFile: async (req, res) => {
    try {
      const centreLength = await centreService.createManyFromFile();
      return res
        .status(201)
        .json({ message: "Successfully", result: centreLength });
    } catch (error) {
      return res.status(500).json({ message: error.message, result: error });
    }
  },
  getMany: async (req, res) => {
    try {
      const data = req.query;
      const { limit, page, filter } = data;
      const skip = (page - 1) * limit;
      const { centres, total } = await centreService.getMany({
        filter,
        skip,
        limit,
      });
      return res
        .status(200)
        .json({
          message: "Successfully",
          results: { centres, paginging: { total, limit, page } },
        });
    } catch (error) {
      return res.status(500).json({ message: error.message, result: error });
    }
  },
};

module.exports = centreController;
