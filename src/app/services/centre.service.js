const centreModel = require("../models/centre.model");
const fs = require("fs");
const path = require("path");
const imageModel = require("../models/image.model");
const ObjectId = require('mongoose').Types.ObjectId;

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
  getMany: async (data) => {
    try {
      let { name, limit, skip } = data;
      limit = Number.parseInt(limit);
      skip = Number.parseInt(skip);
      let centreQuery = centreModel.aggregate().lookup({
        from: "images",
        localField: "_id",
        foreignField: "centreId",
        as: "images",
      });
      if (name !== undefined) {
        const [centres, total] = await Promise.all([
          centreQuery.skip(skip).limit(limit).match({ name: name }),
          centreModel.count(),
        ]);
        return { centres, total };
      }

      const [centres, total] = await Promise.all([
        centreQuery.skip(skip).limit(limit),
        centreModel.count(),
      ]);
      return { centres, total };
    } catch (error) {
      throw new Error(error);
    }
  },
  getDetail: async (data) => {
    try {
      const centre = await centreModel
        .aggregate()
        .lookup({
            from: 'images',
            localField: '_id',
            foreignField: 'centreId',
            as: 'images'
        })
        .match({_id: ObjectId(data)});
      return centre;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = centreService;
