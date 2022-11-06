const centreService = require("../services/centre.service");
const formidable = require("formidable");
const dateFns = require("date-fns");
const imageService = require("../services/image.service");
const centerStaffModel = require("../models/centerStaff.model");

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

  getManyByCentreAdmin: async (req, res) => {
    try {
      const data = req.query;
      const { limit, page, name } = data;
      const skip = (page - 1) * limit;
      const [centres, total] = await centreService.getManyByCentreAdmin({
        name,
        skip,
        limit,
        authorId: req.user._id,
      });
      return res.status(200).json({
        message: "Successfully",
        result: { centres, paging: { total, limit, page } },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, result: error });
    }
  },

  getAllByCentreAdmin: async (req, res) => {
    try {
      const centres = await centreService.getAllByCentreAdmin({
        authorId: req.user._id,
      });
      return res.status(200).json({
        message: "Successfully",
        result: centres,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, data: error });
    }
  },

  getDetailByCentreAdmin: async (req, res) => {
    try {
      const id = req.params.id;
      const centre = await centreService.getDetailByCentreAdmin(id);
      return res.status(200).json({ message: "Successfully", result: centre });
    } catch (error) {
      return res.status(500).json({ message: error.message, result: error });
    }
  },

  createNewCentre: async (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
        next(err);
        return;
      }

      try {
        const centreObject = {
          ...fields,
          openHours: {
            startTime: dateFns.format(new Date(fields.startTime), "HH:mm"),
            endTime: dateFns.format(new Date(fields.endTime), "HH:mm"),
          },
          geolocation: {
            type: "Point",
            coordinates: [
              Number(fields.geolocation[0]),
              Number(fields.geolocation[1]),
            ],
          },
          author: req.user._id,
        };

        const centre = await centreService.createOne(centreObject);
        if (typeof fields.images === "string") {
          const image = await imageService.addOneImageToCentre({
            url: fields.images,
            targetId: centre._id,
          });
        } else {
          fields.images.forEach(async (item) => {
            await imageService.addOneImageToCentre({
              url: item,
              targetId: centre._id,
            });
          });
        }
        return res.status(201).json({ message: "Successfully", result: {} });
      } catch (error) {
        return res.status(400).json({ message: error.message, data: error });
      }
    });
  },

  activeCentre: async (req, res) => {
    try {
      const response = await centreService.activeCentre(req.params.centreId);
      return res
        .status(200)
        .json({ message: "Successfully", result: response });
    } catch (error) {
      return res.status(400).json({ message: error.message, data: error });
    }
  },

  deActiveCentre: async (req, res) => {
    try {
      const response = await centreService.deActiveCentre(req.params.centreId);
      return res
        .status(200)
        .json({ message: "Successfully", result: response });
    } catch (error) {
      return res.status(400).json({ message: error.message, data: error });
    }
  },

  deleteCentre: async (req, res) => {
    try {
      const response = await centreService.deleteCentre(req.params.centreId);
      return res
        .status(200)
        .json({ message: "Successfully", result: response });
    } catch (error) {
      return res.status(400).json({ message: error.message, data: error });
    }
  },

  getManyBySuperAdmin: async (req, res) => {
    try {
      const data = req.query;
      const { limit, page } = data;
      const skip = (page - 1) * limit;
      const [centres, total] = await centreService.getManyCentreBySuperAdmin({
        skip,
        limit,
      });
      return res.status(200).json({
        message: "Successfully",
        result: { centres, paging: { total, limit, page } },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, result: error });
    }
  },

  getDetailBySuperAdmin: async (req, res) => {
    try {
      const id = req.params.id;
      const centre = await centreService.getDetailBySuperAdmin(id);
      return res.status(200).json({ message: "Successfully", result: centre });
    } catch (error) {
      return res.status(500).json({ message: error.message, result: error });
    }
  },

  getManyCentreByParent: async (req, res) => {
    try {
      const { page = 1, limit = 9 } = req.query;
      const [centres, total] = await centreService.getManyCentreByParent({
        page,
        limit,
      });
      return res
        .status(200)
        .json({
          message: "Successfully",
          result: { centres, paging: { total, page, limit } },
        });
    } catch (error) {
      return res.status(400).json({ message: error.message, data: error });
    }
  },

  getDetailByParent: async (req, res) => {
    try {
      const id = req.params.id;
      const centre = await centreService.getDetailByParent(id);
      return res.status(200).json({ message: "Successfully", result: centre });
    } catch (error) {
      return res.status(500).json({ message: error.message, result: error });
    }
  },
};

module.exports = centreController;
