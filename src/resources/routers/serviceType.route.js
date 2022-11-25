const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/serviceType.controller");

route.get('/add-all', controller.addAllServiceType);
route.get('/find-all', controller.findAll);

module.exports = route;