require("newrelic");
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
require("dotenv").config({ path: "variables.env" });
const mongoose = require("mongoose");
const User = require("./models/User.js");
const DailyEntry = require("./models/DailyEntry.js");
const Gym = require("./models/Gym.js");
const Team = require("./models/Team.js");
//Auth middleware from Auth0 guide
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");
const apiV1Routes = require("./routes/apiV1Routes");
var app = express();

// Setting up Sentry from https://sentry.io/karl-morand/broccoli-backend/getting-started/node-express/
var Raven = require("raven");
Raven.config(
  "https://d1331ccb33024ac4ac930fe61ab1155e:28a1a344767949aeaa04e16f5f072e85@sentry.io/289793"
).install();
app.use(Raven.requestHandler());
app.use(Raven.errorHandler());
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.use(cors());

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw "Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file";
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));
app.use("/api/v1", apiV1Routes);
app.use("/api", apiRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // TODO: fix this since i don't have a view engine server side
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
