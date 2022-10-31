const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/cloudinary.controller");

route.post('/upload', controller.upload);
module.exports = route;