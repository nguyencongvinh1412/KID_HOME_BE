const centreService = require("../services/centre.service");
const formidable = require('formidable');

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
      const { limit, page, name } = data;
      const skip = (page - 1) * limit;
      const { centres, total } = await centreService.getMany({
        name,
        skip,
        limit,
      });
      return res
        .status(200)
        .json({
          message: "Successfully",
          result: { centres, paging: { total, limit, page } },
        });
    } catch (error) {
      return res.status(500).json({ message: error.message, result: error });
    }
  },
  getDetail: async (req, res) => {
    try {
        const id = req.params.id;
        const centre = await centreService.getDetail(id);
        return res.status(200).json({message: 'Successfully', result: centre[0]});
    } catch (error) {
        return res.status(500).json({ message: error.message, result: error });
    }
  },
  createNewCentre: async (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      try {
        return res.status(201).json({message: 'Successfully', result: {fields, files}});
      } catch (error) {
        return res.status(400).json({message: error.message, data: error});
      }

    })
  }
};

module.exports = centreController;
