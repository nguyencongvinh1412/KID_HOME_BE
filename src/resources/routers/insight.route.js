const express = require('express');
const route = express.Router();
const controller = require("../../app/controllers/insight.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.get('/total-value',authMiddleware.isAdmin, controller.getTotalValue);

route.get("/applications", authMiddleware.isCentreAdmin, controller.getInsightApplications);

route.get("/centres", authMiddleware.isCentreAdmin, controller.getInsightCentre);


module.exports = route;