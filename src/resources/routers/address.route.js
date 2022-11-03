const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/address.controller");

route.get('/cities', controller.getAllCities);
route.get('/districts/', controller.getDistrictByCity);
route.get('/wards/', controller.getWardByDistrict);
route.get('/cities/findOne', controller.getCityByCode);
route.get('/districts/findOne', controller.getDistrictByCode);
route.get('/wards/findOne', controller.getWardByCode);

module.exports = route;