const accountService = require("../services/account.service");
const roleService = require("../services/role.service");
const centreUserService = require("../services/centreUser.service");
const centreService = require("../services/centre.service");
const authHelper = require("../../helpers/auth.helper");
const centreStaffService = require("../services/centreStaff.service");
const { ROLE } = require("../../constants/role.constant");
const parentService = require("../services/parent.service");

const AuthController = {
  registerCentreUser: async (req, res) => {
    try {
      const { accountInfo, centreInfo } = req.body;
      if (!accountInfo || !centreInfo) {
        throw new Error("Invalid Input value");
      }

      const role = await roleService.findOne({ name: ROLE.CENTRE_ADMIN });
      accountInfo.roleId = role._id;
      accountInfo.password = authHelper.hashedPassword(accountInfo.password);
      const account = await accountService.createOne(accountInfo);
      const centre = await centreService.createOne(centreInfo);

      if (centreInfo.images) {

      }

      const centreUser = await centreUserService.createOne({
        centreId: centre._id,
        accountId: account._id,
      });
      
      const {password, ...result} = account._doc;
      return res.json({message: "Successfully", data: result});
    } catch (error) {
      return res.status(400).json({message: error.message, data: error});
    }
  },

  login: async (req, res) => {
    try {
        const loginResult = await authHelper.login(req, res);
        if (!loginResult) {
            throw new Error('Login failed');
        }

        return res.json({message: "Successfully", data: loginResult});
    } catch (error) {
        return res.status(403).json({message: error.message, data: error});
    }
  },

  registerCentreStaff: async (req, res) => {
    try {
        if (!req.body) {
            throw new Error("Invalid Input value");
        }

        const role = await roleService.findOne({name: ROLE.CENTRE_STAFF });
        req.body.password = authHelper.hashedPassword(req.body.password);
        const account = await accountService.createOne({...req.body, roleId: role._id});
        const centreStaff = await centreStaffService.createOne({...req.body, accountId: account._id});
        return res.json({message: "Successfully", data: centreStaff});
    } catch (error) {
        return res.status(400).json({message: error.message, data: error});
    }
  },

  registerParent: async (req, res) => {
    try {
        if (!req.body) {
            throw new Error("Invalid Input value");
        }

        const role = await roleService.findOne({name: ROLE.PARENT});
        req.body.roleId = role._id;
        req.body.password = authHelper.hashedPassword(req.body.password);
        const account = await accountService.createOne({...req.body, isActive: true});
        const parent = await parentService.createOne({accountId: account._id});
        return res.json({message: "Successfully", data: parent});
    } catch (error) {
        return res.status(400).json({message: error.message, data: error});
    }
  }
};

module.exports = AuthController;
