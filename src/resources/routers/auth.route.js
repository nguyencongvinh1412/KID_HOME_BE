const express = require('express');
const route = express.Router();
const controller = require('../../app/controllers/auth.controller');

route.post('/login', controller.registerCentreUser);

module.exports = route;