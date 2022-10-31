const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/mock_data.controller");

route.get('/', controller);
module.exports = route;