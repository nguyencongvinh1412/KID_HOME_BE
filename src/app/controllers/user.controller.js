const roleService = require("../services/role.service");
const accountService = require("../services/account.service");
const authHelper = require("../../helpers/auth.helper");

const UserController = {
  createNewUser: async (req, res) => {
    try {
      const accountInfo = req.body;
      if (!accountInfo.role) {
        throw new Error('Please provide a role');
      }
      const role = await roleService.findOne({ name: accountInfo.role });

      if (!role) {
        throw new Error('Can not find role');
      }

      accountInfo.roleId = role._id;
      accountInfo.password = authHelper.hashedPassword(accountInfo.password);
      accountInfo.isActive = true;
      const account = await accountService.createOne(accountInfo);

      const { password, ...result } = account._doc;
      return res.status(201).json({ message: "Successfully", result });
    } catch (error) {
      return res.status(400).json({ message: error.message, result: error });
    }
  },
  findAll: async (req, res) => {
    try {
        const page = Number.parseInt(req.query.page);
        const limit = Number.parseInt(req.query.limit);
        const authorId = req.user._id;
        const skip = (page - 1) * limit;
        const [accounts, total] = await accountService.findAll(skip, limit, authorId);
        return res.status(200).json({message: "Successfully", result: {users: accounts, paging: {page, total, limit }}});
    } catch (error) {
        return res.status(400).json({message: error.message, result: error});
    }
  },
  activeUser: async(req, res) => {
    try {
        const account = await accountService.activeUser(req.params.userId);
        return res.status(200).json({message: "Successfully", result: account});
    } catch (error) {
        return res.status(400).json({message: error.message, result: error});
    }
  },
  deActiveUser: async(req, res) => {
    try {
        const account = await accountService.deActiveUser(req.params.userId);
        return res.status(200).json({message: "Successfully", result: account});
    } catch (error) {
        return res.status(400).json({message: error.message, result: error});
    }
  },
  detailUser: async (req, res) => {
    try {
      const account = await accountService.detailUser(req.params.userId);
      return res.status(200).json({message: "Successfully", result: account});
    } catch (error) {
      return res.status(400).json({message: error.message, result: error});
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const data = req.body;
      const role = await roleService.findOne({name: data.role});
      if (!role) {
        throw new Error("Can not find role");
      }
      data.roleId = role._id;
      const accountUpdate = await accountService.updateUser(userId, data);
      return res.status(200).json({message: "Successfully", result: accountUpdate});
    } catch (error) {
      return res.status(400).json({message: error.message, data: error});
    }
  },
};

module.exports = UserController;
