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
      console.log(req.body);
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
      return res.json({message: "Successfully", result});
    } catch (error) {
      return res.status(400).json({message: error.message, result: error});
    }
  },

  login: async (req, res) => {
    try {
        const loginResult = await authHelper.login(req, res);
        if (!loginResult) {
            throw new Error('Login failed');
        }

        return res.json({message: "Successfully", result: loginResult});
    } catch (error) {
        return res.status(401).json({message: error.message, result: error});
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
        return res.json({message: "Successfully", result: centreStaff});
    } catch (error) {
        return res.status(400).json({message: error.message, result: error});
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
        return res.json({message: "Successfully", result: parent});
    } catch (error) {
        return res.status(400).json({message: error.message, result: error});
    }
  }
};

module.exports = AuthController;
