const express = require('express');
const route = express.Router();
const controller = require('../../app/controllers/auth.controller');
const authMiddleware = require("../middlewares/auth.middleware");

route.post('/register/parent', controller.registerParent);
route.post('/login', controller.login);
route.put('/update/profile', authMiddleware.verifyToken, controller.updateProfile);
route.put('/change-password', authMiddleware.verifyToken, controller.changePassword);

module.exports = route;