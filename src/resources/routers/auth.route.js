const express = require('express');
const route = express.Router();
const controller = require('../../app/controllers/auth.controller');

route.post('/register/centre-admin', controller.registerCentreUser);
route.post('/register/centre-staff', controller.registerCentreStaff);
route.post('/register/parent', controller.registerParent);
route.post('/login', controller.login);

module.exports = route;