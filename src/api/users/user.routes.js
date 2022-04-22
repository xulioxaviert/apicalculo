const UserRoutes = require("express").Router();
const { register, login, logout, getCompletedActivities, addActivity, getOne } = require("./user.controller");
const { isAuth } = require("../../middlewares/auth.middleware");

UserRoutes.get("/:_id", getOne)
UserRoutes.post("/register", register);
UserRoutes.post("/login", login);
UserRoutes.post("/logout", [isAuth], logout);
UserRoutes.get("/completed-activities", [isAuth], getCompletedActivities);
UserRoutes.post("/add-activity", [isAuth], addActivity);

module.exports = UserRoutes;
