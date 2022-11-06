const accountService = require("../services/account.service");
const roleService = require("../services/role.service");
const centreUserService = require("../services/centreUser.service");
const centreService = require("../services/centre.service");
const authHelper = require("../../helpers/auth.helper");
const centreStaffService = require("../services/centreStaff.service");
const { ROLE } = require("../../constants/role.constant");
const parentService = require("../services/parent.service");
const uploader = require("../../config/cloudinary/cloudinary");
const formidable = require("formidable");

const AuthController = {
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
  },

  updateProfile: async (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      try {
        const userId = req.user._id;
        if (files.avatar) {
          const {url} = await uploader(files.avatar.filepath);
          fields.avatar = url;
        }
        const account = await accountService.updateProfile(userId, fields);
        const {password, ...other} = account._doc;
        return res.status(200).json({message: "Successfully", result: other});

      } catch (error) {
        return res.status(400).json({message: error.message, data: error});
      }
    });
  },

  changePassword: async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await accountService.changePassword(userId, req.body);
      return res.status(200).json({message: "Successfully", result: user});
    } catch (error) {
      return res.status(400).json({message: error.message, data: error});
    }
  }
};

module.exports = AuthController;
