const User = require("./user.model");
const bcrypt = require("bcrypt");
const JwtUtils = require("../../utils/jwt/jwt");
const { setError } = require("../../utils/error/error");

const getOne = async (req, res, next) => {
  try {
    console.log(req.params);
    const { _id } = req.params;
    const user = await User.findById(_id);
    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const register = async (req, res, next) => {
  try {
    console.log("dentro de register", req.body);
    const user = new User(req.body);

    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      // TODO: Errores
      return next(new Error());
    }
    const userDB = await user.save();
    return res.status(201).json(userDB.name);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(setError(404, "This user is not registered"));
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = JwtUtils.generateToken(user._id, user.email);

      return res.status(200).json(token);
    }
  } catch (error) {}
};

const logout = (req, res, next) => {
  try {
    const token = null;
    return res.status(201).json(token);
  } catch (error) {
    return next(error);
  }
};

const getCompletedActivities = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    res.status(200).json(user.completedActivities);
  } catch (error) {
    return next(error);
  }
};

const addActivity = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { id } = req.params;
    const user = await User.updateOne({ _id: _id }, { $push: { completedActivities: id } });

    res.status(200).json(user.completedActivities);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getOne,
  register,
  login,
  logout,
  getCompletedActivities,
  addActivity,
};
