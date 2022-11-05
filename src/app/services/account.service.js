const accountModel = require("../models/account.model");
const cityMode = require("../models/city.model");
const districtModel = require("../models/district.model");
const wardMoel = require("../models/ward.model");
const ObjectId = require("mongoose").Types.ObjectId;

const accountService = {
  createOne: async (data) => {
    try {
      const account = new accountModel(data);
      return account.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  findAll: async (skip, limit, authorId) => {
    try {
      skip = Number.parseInt(skip);
      limit = Number.parseInt(limit);
      return Promise.all([
        accountModel
          .find({ _id: { $ne: ObjectId(authorId) } })
          .skip(skip)
          .limit(limit)
          .populate("roleId"),
        accountModel
          .find({ _id: { $ne: ObjectId(authorId) } })
          .populate()
          .count(),
      ]);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  activeUser: async (userId) => {
    try {
      return accountModel.updateOne(
        { _id: userId },
        { isActive: true },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deActiveUser: async (userId) => {
    try {
      return accountModel.updateOne(
        { _id: userId },
        { isActive: false },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },
  detailUser: async (userId) => {
    try {
      return accountModel
        .findOne({ _id: userId })
        .populate("cityCode")
        .populate("districtCode")
        .populate("wardCode")
        .populate("roleId");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  updateUser: async (userId, data) => {
    try {
      return accountModel.updateOne({ _id: userId }, data, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = accountService;
