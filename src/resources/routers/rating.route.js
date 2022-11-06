const express = require('express');
const route = express.Router();
const controller = require('../../app/controllers/rating.controller');
const authMiddleware = require("../middlewares/auth.middleware");

route.post('/add-rating', authMiddleware.verifyToken, controller.addRating);

route.get('/get-all-belong-centre', controller.getAllRatingBelongCentre);

module.exports = route;