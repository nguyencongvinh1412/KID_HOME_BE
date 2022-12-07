const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/application.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.post('/apply',authMiddleware.isParent, controller.apply);

route.get('/parent', authMiddleware.isParent, controller.getAllBelongUser);

route.put('/parent/change-state', authMiddleware.verifyToken, controller.changeState);

route.get("/parent/details/:applicationId", authMiddleware.verifyToken, controller.getDetailById);

route.get("/centre-admin", authMiddleware.isCentreAdmin, controller.getApplicationsByCentreAdmin);


module.exports = route;