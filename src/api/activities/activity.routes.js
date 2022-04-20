const ActivityRoutes = require("express").Router();

const {
  getAll,
  getOne,
  postOne,
  deleteOne,
  getAllByType,
  getOneByActivityId,
} = require("./activity.controller");

ActivityRoutes.get("/", getAll);
ActivityRoutes.get("/:_id", getOne);
ActivityRoutes.get("/type/:type", getAllByType);
ActivityRoutes.get("/id/:id", getOneByActivityId);
ActivityRoutes.post("/", postOne);
ActivityRoutes.delete("/:_id", deleteOne);

module.exports = ActivityRoutes;
