const Activity = require("./activity.model");

const getAll = async (req, res, next) => {
  //logger
  try {
    const activities = await Activity.find();

    res.status(200).json(activities);
  } catch (error) {
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const activity = await Activity.findById(_id);
    res.status(200).json(activity);
  } catch (error) {
    return next(error);
  }
};

const getOneByActivityId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await Activity.find({ id: id });
    res.status(200).json(activity);
  } catch (error) {
    return next(error);
  }
};

const getAllByType = async (req, res, next) => {
  //logger
  try {
    const { type } = req.params;
    const activities = await Activity.find({ type: type });

    res.status(200).json(activities);
  } catch (error) {
    return next(error);
  }
};

const postOne = async (req, res, next) => {
  try {
    const activity = new Activity();
    activity.id = req.body.id;
    activity.level = req.body.level;
    activity.type = req.body.type;
    activity.questions = req.body.questions;
    const activityDB = await activity.save();
    return res.status(201).json(activityDB);
  } catch (error) {
    return next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const Activity = await Activity.findByIdAndDelete(_id);
    return res.status(200).json(Activity);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  postOne,
  deleteOne,
  getAllByType,
  getOneByActivityId,
};
