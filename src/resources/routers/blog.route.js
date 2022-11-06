const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/blog.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.post('/centre-admin/create',authMiddleware.isCentreAdmin, controller.createByCentreAdmin);

route.get('/centre-admin', authMiddleware.isCentreAdmin, controller.getManyBlogByCentreAdmin);

route.get('/centre-admin/detail/:blogId', authMiddleware.isCentreAdmin, controller.getDetailByCentreAdmin);

route.get('/parent/belong-centre', controller.getManyBlogBelongCentre);

route.get('/parent/detail/:blogId', controller.getDetailByParent);

route.get('/parent/belong-blog/:blogId', controller.getManyBlogBelongBlog);

route.get('/parent', controller.getManyBlogByParent);
module.exports = route;