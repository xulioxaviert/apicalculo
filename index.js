const express = require("express");

const cors = require("cors");
const ActivityRoutes = require("./src/api/activities/activity.routes");

//const bodyParser = require("body-parser");

const { connect } = require("./src/utils/database/db");

connect();

const app = express();

//app.use(bodyParser.json());

/* 
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
 */

app.use(cors());
app.use("/api/activities", ActivityRoutes);



const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port 🙈: ${PORT}`);
});

app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error("Something went wrong"));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
