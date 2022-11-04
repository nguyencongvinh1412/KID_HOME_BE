const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/centre.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.delete('/', controller.deleteMany);
route.post('/', controller.createManyFromFile);
route.get('/', controller.getMany);
route.get('/:id', controller.getDetail);
route.post('/create',authMiddleware.isCentreAdmin, controller.createNewCentre);

module.exports = route;