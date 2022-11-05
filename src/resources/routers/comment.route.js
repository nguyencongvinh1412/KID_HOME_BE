const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/comment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.get('/getAll/:blogId', controller.getAllComment);
route.post('/addComment', authMiddleware.verifyToken, controller.addComment);

module.exports = route;