const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const {
  validationPassword,
  validationEmail,
} = require("../../utils/validators/validators");

const userSchema = new mongoose.Schema({
  email: { type: String, trim: true, required: true },
  name: { type: String, trim: true, required: true },
  role: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  completedActivities: [{ type: String, trim: true }],


});


userSchema.pre("save", function (next) {
  if (!validationPassword(this.password)) {
    return next(new Error());
  }
  if (!validationEmail(this.email)) {
    return next(new Error());
  }

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
