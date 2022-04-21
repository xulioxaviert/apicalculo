const UserRoutes = require("express").Router();
const { register, login, logout, getCompletedActivities, addActivity } = require("./user.controller");

const { isAuth } = require("../../middlewares/auth.middleware");

//UserRoutes.post("/register",  register);
UserRoutes.post("/register", async (req, res) => {
    console.log(req.body);
    res.json(register)
});
UserRoutes.post("/login", login);
UserRoutes.post("/logout", [isAuth], logout);
UserRoutes.get("/completed-activities", [isAuth], getCompletedActivities);
UserRoutes.post("/add-activity", [isAuth], addActivity);

module.exports = UserRoutes;