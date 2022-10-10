const roleModel = require('../models/role.model');
const centreUserModel = require('../models/centreUser.model');
const accountModel = require('../models/account.model');

const AuthController = {
    registerCentreUser: async (req, res) => {
        // get roleId (centre admin)
        // create account object
        // create centreuser
        // create centre
        const {accountInfo, centreInfo} = req.body;
        const role = await roleModel.findOne({name: 'centre-admin'});
        accountInfo.roleId = role.id;
        let account = new accountModel(accountInfo);
        account = await account.save();
        centreInfo
        return res.json(account);
    }
}

module.exports = AuthController;