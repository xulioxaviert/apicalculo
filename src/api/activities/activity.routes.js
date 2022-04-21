const ActivityRoutes = require("express").Router();
const { isAuth } = require("../../middlewares/auth.middleware");


const {
  getAll,
  getOne,
  postOne,
  deleteOne,
  getAllByType,
  getOneByActivityId,
} = require("./activity.controller");

ActivityRoutes.get("/", getAll);
ActivityRoutes.get("/:_id", [isAuth], getOne);
ActivityRoutes.get("/type/:type", [isAuth], getAllByType);
ActivityRoutes.get("/id/:id", [isAuth], getOneByActivityId);
ActivityRoutes.post("/", [isAuth], postOne);
ActivityRoutes.delete("/:_id", [isAuth], deleteOne);

module.exports = ActivityRoutes;
