#!/usr/bin/env node

var mongoose = require("mongoose");
const User = require("../models/User.js");
require("dotenv").config({ path: "variables.env" });
var mongoDBURI = process.env.DATABASE;

console.log(mongoDBURI);

var options = {
  keepAlive: 300000,
  connectTimeoutMS: 30000
};
mongoose.connect(mongoDBURI, options);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

mongoose.connection.once("open", function() {
  console.log("Connected to mongo at: ", mongoDBURI);
});

User.find({}).exec((err, users) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`***** Found ${users.length} users *****`);
    mongoose.connection.close(function() {
      console.log("Mongoose connection disconnected");
    });
  }
});
