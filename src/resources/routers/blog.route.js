const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/blog.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.post('/centre-admin/create',authMiddleware.isCentreAdmin, controller.createByCentreAdmin);

route.get('/centre-admin', authMiddleware.isCentreAdmin, controller.getManyBlogByCentreAdmin);

route.get('/centre-admin/detail/:blogId', authMiddleware.isCentreAdmin, controller.getDetailByCentreAdmin);

module.exports = route;