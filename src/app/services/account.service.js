const AccountModel = require("../models/account.model");

const accountService = {
    createOne: async (data) => {
        try {
            const account = new AccountModel(data);
            return account.save();
        } catch (error) {
            return error;
        }
    }
}

module.exports = accountService;