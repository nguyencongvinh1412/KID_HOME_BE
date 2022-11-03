const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/mock_data.controller");

route.get('/mock-db', controller.createDBApp);
route.get('/mock-address', controller.createAddressDB);
module.exports = route;