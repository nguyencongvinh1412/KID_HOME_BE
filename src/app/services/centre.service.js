const centreModel = require("../models/centre.model");
const imageModel = require("../models/image.model");
const fs = require("fs");
const path = require("path");
const ObjectId = require("mongoose").Types.ObjectId;

const centreService = {
  createOne: async (data) => {
    try {
      const centre = new centreModel(data);
      return centre.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteMany: async (data) => {
    try {
      const centresDeleted = await centreModel.deleteMany(data);
      return centresDeleted.deletedCount;
    } catch (error) {
      return error;
    }
  },

  createManyFromFile: async () => {
    fs.readFile(
      path.join(__dirname, "../../../db_mock/centres.json"),
      (err, data) => {
        centres = JSON.parse(data);
        centres = centres.map(async (centre) => {
          centre = await centreService.createOne(centre);
        });
        return centres.length;
      }
    );
  },

  getManyByCentreAdmin: async (data) => {
    try {
      let { name, limit, skip, authorId } = data;
      limit = Number.parseInt(limit);
      skip = Number.parseInt(skip);
      let centres = [];
      let centreShow = [];
      let total = 0;
      if (name) {
        centres = await centreModel
          .find({ name: name, author: ObjectId(authorId) })
          .skip(skip)
          .limit(limit)
          .populate("cityCode")
          .populate("districtCode")
          .populate("wardCode");
      } else {
        centres = await centreModel
          .find({ author: ObjectId(authorId) })
          .skip(skip)
          .limit(limit)
          .populate("cityCode")
          .populate("districtCode")
          .populate("wardCode")
          .populate("author");
      }

      for (let centre of centres) {
        const images = await imageModel.find({ targetId: centre._id });
        const openHours = centre._doc.openHours;
        centreShow.push({
          ...centre._doc,
          images,
          openTime: `${openHours.startTime} - ${openHours.endTime}`,
        });
      }

      total = centreShow.length;
      return [centreShow, total];
    } catch (error) {
      throw new Error(error);
    }
  },

  getAllByCentreAdmin: async (data) => {
    try {
      let { authorId } = data;
      let centres = [];
      let centreShow = [];
      centres = await centreModel
        .find({ author: ObjectId(authorId) })
        .populate("cityCode")
        .populate("districtCode")
        .populate("wardCode")
        .populate("author");

      for (let centre of centres) {
        const images = await imageModel.find({ targetId: centre._id });
        const openHours = centre._doc.openHours;
        centreShow.push({
          ...centre._doc,
          images,
          openTime: `${openHours.startTime} - ${openHours.endTime}`,
        });
      }
      return centreShow;
    } catch (error) {
      throw new Error(error);
    }
  },

  getDetailByCentreAdmin: async (data) => {
    try {
      let centre = await centreModel
        .findOne({ _id: data })
        .populate("author")
        .populate("cityCode")
        .populate("districtCode")
        .populate("wardCode");
      const images = await imageModel.find({ targetId: centre._id });
      openTime = centre._doc.openHours;
      return {
        ...centre._doc,
        images,
        openTime: `${openTime.startTime} - ${openTime.endTime}`,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  activeCentre: async (centreId) => {
    try {
      return centreModel.updateOne({ _id: centreId }, { isActive: true });
    } catch (error) {
      throw new Error(error);
    }
  },

  deActiveCentre: async (centreId) => {
    try {
      return centreModel.updateOne({ _id: centreId }, { isActive: false });
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteCentre: async (centreId) => {
    try {
      await imageModel.deleteMany({ targetId: centreId });
      return centreModel.deleteOne({ _id: centreId });
    } catch (error) {
      throw new Error(error);
    }
  },

  getManyCentreBySuperAdmin: async (data) => {
    try {
      let { limit, skip } = data;
      limit = Number.parseInt(limit);
      skip = Number.parseInt(skip);
      let centres = [];
      let centreShow = [];
      let total = 0;
      centres = await centreModel
          .find({})
          .skip(skip)
          .limit(limit)
          .populate("cityCode")
          .populate("districtCode")
          .populate("wardCode")
          .populate("author");

      for (let centre of centres) {
        const images = await imageModel.find({ targetId: centre._id });
        const openHours = centre._doc.openHours;
        centreShow.push({
          ...centre._doc,
          images,
          openTime: `${openHours.startTime} - ${openHours.endTime}`,
        });
      }

      total = centreShow.length;
      return [centreShow, total];
    } catch (error) {
      throw new Error(error);
    }
  },

  getDetailBySuperAdmin: async (data) => {
    try {
      let centre = await centreModel
        .findOne({ _id: data })
        .populate("author")
        .populate("cityCode")
        .populate("districtCode")
        .populate("wardCode");
      const images = await imageModel.find({ targetId: centre._id });
      openTime = centre._doc.openHours;
      return {
        ...centre._doc,
        images,
        openTime: `${openTime.startTime} - ${openTime.endTime}`,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = centreService;
