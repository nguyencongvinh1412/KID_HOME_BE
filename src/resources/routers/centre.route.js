const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/centre.controller");

route.delete('/', controller.deleteMany);
route.post('/', controller.createManyFromFile);
route.get('/', controller.getMany);
route.get('/:id', controller.getDetail);

module.exports = route;