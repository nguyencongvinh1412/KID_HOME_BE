const centreModel = require("../models/centre.model");
const imageModel = require("../models/image.model");
const userModel = require("../models/account.model");
const roleModel = require("../models/role.model");
const ratingModel = require("../models/rating.model");
const serviceTypeModel = require("../models/serviceType.model");
const fs = require("fs");
const path = require("path");
const { ROLE } = require("../../constants/role.constant");
const ObjectId = require("mongoose").Types.ObjectId;
const lodash = require("lodash");
const { PythonShell } = require("python-shell");
const centreHelper = require("../../helpers/centre.helper");
const { error } = require("console");
const interateCentreModel = require("../models/interateCentre.model");
const { MAX_COUNT_VIEW } = require("../../constants/comment.constant");

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

      total = await centreModel.find({ author: ObjectId(authorId) }).count();
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
        .find({ author: ObjectId(authorId), isActive: true })
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

      const services = await serviceTypeModel.find({
        _id: { $in: centre.serviceType },
      });
      const images = await imageModel.find({ targetId: centre._id });
      openTime = centre._doc.openHours;
      return {
        ...centre._doc,
        images,
        openTime: `${openTime.startTime} - ${openTime.endTime}`,
        serviceType: services,
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
      let centreShow = [];
      const [total, centres] = await Promise.all([
        centreModel.find({}).count(),
        centreModel
          .find({})
          .skip(skip)
          .limit(limit)
          .populate("cityCode")
          .populate("districtCode")
          .populate("wardCode")
          .populate("author"),
      ]);

      for (let centre of centres) {
        const images = await imageModel.find({ targetId: centre._id });
        const openHours = centre._doc.openHours;
        centreShow.push({
          ...centre._doc,
          images,
          openTime: `${openHours.startTime} - ${openHours.endTime}`,
        });
      }

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

      const services = await serviceTypeModel.find({
        _id: { $in: centre.serviceType },
      });
      const images = await imageModel.find({ targetId: centre._id });
      openTime = centre._doc.openHours;
      return {
        ...centre._doc,
        images,
        openTime: `${openTime.startTime} - ${openTime.endTime}`,
        serviceType: services,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  getManyCentreByParent: async (data) => {
    try {
      let { page = 1, limit = 9 } = data;
      page = Number.parseInt(page);
      limit = Number.parseInt(limit);
      const skip = (page - 1) * limit;
      const [total, centres] = await Promise.all([
        centreModel.find({ isActive: true }).count(),
        centreModel
          .find({ isActive: true })
          .skip(skip)
          .limit(limit)
          .populate("author")
          .populate("cityCode")
          .populate("districtCode")
          .populate("wardCode")
          .sort({ rating: -1 }),
      ]);

      let centresShow = [];
      for (const centre of centres) {
        const images = await imageModel.find({ targetId: centre._id });
        const openHours = centre._doc.openHours;
        centresShow.push({
          ...centre._doc,
          images,
          openTime: `${openHours.startTime} - ${openHours.endTime}`,
        });
      }
      // const total = centresShow.length;
      return [centresShow, total];
    } catch (error) {
      throw new Error(error);
    }
  },

  getDetailByParent: async (centreId, userId) => {
    try {
      let centre;
      let interateCentre = undefined;
      if (userId) {
        [centre, interateCentre] = await Promise.all([
          centreModel
            .findOne({ _id: centreId, isActive: true })
            .populate("author")
            .populate("cityCode")
            .populate("districtCode")
            .populate("wardCode"),
          interateCentreModel.findOne({ centre: centreId, user: userId }).lean(),
        ]);
      } else {
        centre = await centreModel
        .findOne({ _id: centreId, isActive: true })
        .populate("author")
        .populate("cityCode")
        .populate("districtCode")
        .populate("wardCode")
      }

      if (!interateCentre && userId) {
        interateCentre = {
          centre: centreId,
          user: userId,
          countView: 1,
          rating: 0,
        };
        interateCentre = new interateCentreModel(interateCentre);
        await interateCentre.save();
      } else if (userId) {
        let countView = interateCentre.countView + 1
        countView = Math.min(countView, MAX_COUNT_VIEW);
        await interateCentreModel.updateOne(
          { centre: centreId, user: userId },
          { countView: countView }
        );
      }

      const services = await serviceTypeModel.find({
        _id: { $in: centre.serviceType },
      });
      const images = await imageModel.find({ targetId: centre._id });
      openTime = centre._doc.openHours;
      return {
        ...centre._doc,
        images,
        openTime: `${openTime.startTime} - ${openTime.endTime}`,
        serviceType: services,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  getCentresRecommend: async (res, userId) => {
    try {
      // TODO: get data
      // historyRating of this user
      // all centres

      let [ratingHistory, centres, serviceTypes] = await Promise.all([
        interateCentreModel
          .find({ user: ObjectId(userId) })
          .sort({ createdAt: -1 }),
        centreModel
          .find({})
          .populate("wardCode")
          .select("fee yearEstablished openHours serviceType wardCode"),
        serviceTypeModel.find({}).select("_id"),
      ]);

      // ratingHistory = centreHelper.distinctRatingHistory(ratingHistory);
      console.log("ratingHistory", ratingHistory);
      ratingHistory = centreHelper.formatRatingHistory(ratingHistory);
      centres = centreHelper.formatCentres(centres);
      serviceTypes = centreHelper.formatServiceType(serviceTypes);

      PythonShell.run(
        "src/helpers/Recommends/recommendSys.py",
        {
          args: [
            JSON.stringify(ratingHistory),
            JSON.stringify(centres),
            JSON.stringify(serviceTypes),
          ],
          mode: "text",
        },
        async (err, results) => {
          if (err) throw err;
          response = results;
          const centreRecommend = JSON.parse(response[0]);
          // console.log("result for recommend:", centreRecommend);
          const centreIdsRecommend = centreHelper.getNumberCentresRecommend(
            centreRecommend,
            9
          );

          const centres = await centreModel
            .find({ _id: { $in: centreIdsRecommend } })
            .populate("author")
            .populate("cityCode")
            .populate("districtCode")
            .populate("wardCode");

          let centresShow = [];
          for (const centre of centres) {
            const images = await imageModel.find({ targetId: centre._id });
            const openHours = centre._doc.openHours;
            centresShow.push({
              ...centre._doc,
              images,
              openTime: `${openHours.startTime} - ${openHours.endTime}`,
            });
          }

          return res
            .status(200)
            .json({ message: "Successfully", result: centresShow });
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  },

  getCentresNearbyCentre: async (centreId, lat, lng) => {
    try {
      lat = Number(lat);
      lng = Number(lng);
      const centres = await centreModel
        .where("geolocation")
        .within({
          center: [lng, lat],
          radius: 0.02,
          unique: true,
          spherical: true,
        })
        .populate("author")
        .populate("cityCode")
        .populate("districtCode")
        .populate("wardCode")
        .where({ _id: { $ne: ObjectId(centreId) } });

      let centresShow = [];
      for (const centre of centres) {
        const images = await imageModel.find({ targetId: centre._id });
        const openHours = centre._doc.openHours;
        centresShow.push({
          ...centre._doc,
          images,
          openTime: `${openHours.startTime} - ${openHours.endTime}`,
        });
      }
      return centresShow;
    } catch (error) {
      throw new Error(error);
    }
  },

  getManyCentresbyFilter: async ({ filter, limit, page, location, name }) => {
    try {
      const limitNumber = Number.parseInt(limit);
      const pageNumber = Number.parseInt(page);
      const skip = (pageNumber - 1) * limitNumber;
      const query = centreModel.find(filter).sort({ rating: -1 });

      if (
        !lodash.isNil(location) &&
        !lodash.isEmpty(location) &&
        !lodash.isNil(location.radius)
      ) {
        const { lng, lat, radius } = location;
        const radiusNumber = (Number(radius) ?? 2) / 111.12;

        query.where("geolocation").within({
          center: [lng, lat],
          radius: radiusNumber,
          unique: true,
          spherical: true,
        });
      }

      if (!lodash.isNil(name)) {
        name = new RegExp(name, "i");
        query.where({ name: { $in: name } });
      }

      const queryCentre = query.clone();
      const [centres, total] = await Promise.all([
        queryCentre
          .populate("author")
          .populate("cityCode")
          .populate("districtCode")
          .populate("wardCode")
          .skip(skip)
          .limit(limitNumber),
        query.count(),
      ]);
      const centresShow = [];
      for (const centre of centres) {
        const images = await imageModel.find({ targetId: centre._id });
        const openHours = centre._doc.openHours;
        centresShow.push({
          ...centre._doc,
          images,
          openTime: `${openHours.startTime} - ${openHours.endTime}`,
        });
      }

      return [centresShow, total];
    } catch (error) {
      throw new Error(error);
    }
  },

  updateGenerateInfoByAdmin: async ({data, centreId}) => {
    try {
      await centreModel.updateOne({_id: centreId}, data);
    } catch (error) {
      throw new Error(error);
    }
  },

  updateDescriptionByAdmin: async ({data, centreId}) => {
    try {
      await centreModel.updateOne({_id: centreId}, data);
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = centreService;
