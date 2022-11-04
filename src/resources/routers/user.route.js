const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.post('/', authMiddleware.isSuperAdmin, controller.createNewUser);
route.get('/findAll', authMiddleware.isSuperAdmin, controller.findAll);
route.put('/active/:userId', authMiddleware.isSuperAdmin, controller.activeUser);
route.put('/deactive/:userId', authMiddleware.isSuperAdmin, controller.deActiveUser);
route.get('/detail/:userId', authMiddleware.isSuperAdmin, controller.detailUser);
route.put('/update/:userId', authMiddleware.isSuperAdmin, controller.updateUser);

module.exports = route;