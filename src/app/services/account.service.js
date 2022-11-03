const accountModel = require("../models/account.model");

const accountService = {
    createOne: async (data) => {
        try {
            const account = new accountModel(data);
            return account.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    findAll: async (skip, limit) => {
        try {
            skip = Number.parseInt(skip);
            limit = Number.parseInt(limit);
            return Promise.all([
                accountModel.find({}).skip(skip).limit(limit).populate("roleId"),
                accountModel.find({}).populate().count()
            ]);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    activeUser: async (userId) => {
        try {
            return accountModel.updateOne({_id: userId}, {isActive: true}, {new: true});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    deActiveUser: async (userId) => {
        try {
            return accountModel.updateOne({_id: userId}, {isActive: false}, {new: true});
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = accountService;