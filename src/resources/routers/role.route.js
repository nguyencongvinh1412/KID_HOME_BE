const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/role.controller");

route.get('/', controller.getAll);

module.exports = route;