const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/address.controller");

route.get('/cities', controller.getAllCities);
route.get('/districts/', controller.getDistrictByCity);
route.get('/wards/', controller.getWardByDistrict);

module.exports = route;