const express = require("express");
const route = express.Router();
const controller = require("../../app/controllers/centre.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.delete("/", controller.deleteMany);

route.post("/", controller.createManyFromFile);

route.get(
  "/centre-admin",
  authMiddleware.isCentreAdmin,
  controller.getManyByCentreAdmin
);

route.get(
  "/centre-admin/getAll",
  authMiddleware.isCentreAdmin,
  controller.getAllByCentreAdmin
);

route.put(
  "/centre-admin/active/:centreId",
  authMiddleware.isCentreAdmin,
  controller.activeCentre
);

route.put(
  "/centre-admin/deactive/:centreId",
  authMiddleware.isCentreAdmin,
  controller.deActiveCentre
);

route.delete(
  "/centre-admin/delete/:centreId",
  authMiddleware.isCentreAdmin,
  controller.deleteCentre
);

route.get(
  "/centre-admin/:id",
  authMiddleware.isCentreAdmin,
  controller.getDetailByCentreAdmin
);

route.post("/create", authMiddleware.isCentreAdmin, controller.createNewCentre);

route.get(
  "/super-admin/",
  authMiddleware.isSuperAdmin,
  controller.getManyBySuperAdmin
);

route.put(
  "/super-admin/active/:centreId",
  authMiddleware.isSuperAdmin,
  controller.activeCentre
);

route.put(
  "/super-admin/deactive/:centreId",
  authMiddleware.isSuperAdmin,
  controller.deActiveCentre
);

route.get(
  "/super-admin/:id",
  authMiddleware.isSuperAdmin,
  controller.getDetailBySuperAdmin
);

route.get("/parent-by-filter", controller.getManyCentresByFilter);

route.get("/parent", controller.getManyCentreByParent);

route.get("/parent/nearby-centre", controller.getCentresNearbyCentre);

route.get("/parent/:id", controller.getDetailByParent);

route.get("/parent/recommend/:userId", controller.getCentresRecommend);

module.exports = route;
